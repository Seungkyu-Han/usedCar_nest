import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {Users} from "./users.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) {}

    async create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password
        });

        return await this.userRepository.save(user);
    }

    async findOne(id: number): Promise<Users> {
        const user = await this.userRepository.findOne({where: {id: id}});
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findAll(name: string): Promise<Users[]> {
        return await this.userRepository.find({where: {name}});
    }

    async update(id: number, userAttrs: Partial<Users>): Promise<Users> {
        const user = await this.findOne(id);
        Object.assign(user, userAttrs);
        return await this.userRepository.save(user);
    }


}
