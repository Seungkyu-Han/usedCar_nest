import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {Users} from "./users.entity";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.usersService.create(createUserDto);
    }

    @Get("/:id")
    findUser(@Param('id') id: number): Promise<Users> {
        return this.usersService.findOne(id)
    }

    @Get()
    findAllUsers(@Query() name: string): Promise<Users[]> {
        return this.usersService.findAll(name);
    }
}
