import {ConflictException, Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {randomBytes, scrypt as _scrypt} from 'crypto';
import {promisify} from 'util';
import {LoginUserDto} from "./dto/login-user.dto";
import {Users} from "./users.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async signUp(createUserDto: CreateUserDto) {
        let {email, password, name} = createUserDto;

        //해당 이메일의 중복 확인
        const existedUser = await this.usersService.findByEmail(email);

        if(existedUser){
            throw new ConflictException('Email already exists');
        }

        //사용자 비밀번호 암호화
        //SALT값 생성
        //8바이트로 16자리의 16진수 랜덤 문자열을 생성
        const salt = randomBytes(8).toString('hex');

        //SALT와 합쳐서 암호화
        //32자로 암호화된 값을 버퍼로
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        //암호화된 값(16진수로 변환)과 SALT를 결합
        //사용자 정보 저장
        password = salt + '.' + hash.toString('hex');

        //사용자에게 응답
        return await this.usersService.create({email, password, name});
    }

    async signIn(loginUserDto: LoginUserDto): Promise<Users>{
        const {email, password} = loginUserDto;

        const user = await this.usersService.findByEmail(email);

        if(!user)
            throw new UnauthorizedException();

        const [salt, hashedPassword] = user.password.split('.');

        const hashed = (await scrypt(password, salt, 32)) as Buffer;

        if(hashedPassword != hashed.toString('hex'))
            throw new UnauthorizedException();

        return user;
    }
}