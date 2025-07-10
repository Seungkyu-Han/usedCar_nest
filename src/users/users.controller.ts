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
import {AuthService} from "./auth.service";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('users')
@Serialize(UserDto)
export class UsersController {

    constructor(private readonly usersService: UsersService,
                private readonly authService: AuthService){}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.authService.signUp(createUserDto);
    }

    @Post("/signIn")
    signIn(@Body() loginUserDto: LoginUserDto): Promise<Users>{
        return this.authService.signIn(loginUserDto)
    }

    @Get("/:id")
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
