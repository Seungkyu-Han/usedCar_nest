import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
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

    @Patch("/:id")
    updateUser(@Param() id: number, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
        return this.usersService.update(id,  updateUserDto);
    }
}
