import { Injectable } from '@nestjs/common';
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


}
