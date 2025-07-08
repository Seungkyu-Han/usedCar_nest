import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Users} from "./users.entity";
import {Serialize} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dto/user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.usersService.create(createUserDto);
    }

    @Get("/:id")
    @Serialize(UserDto)
    findUser(@Param('id') id: number): Promise<Users> {
        return this.usersService.findOne(id)
    }

    @Get()
    @Serialize(UserDto)
    findAllUsers(@Query() name: string): Promise<Users[]> {
        return this.usersService.findAll(name);
    }

    @Patch("/:id")
    updateUser(@Param() id: number, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
        return this.usersService.update(id,  updateUserDto);
    }

    @Delete("/:id")
    deleteUser(@Param('id') id: number): Promise<Users> {
        return this.usersService.delete(id)
    }
}
