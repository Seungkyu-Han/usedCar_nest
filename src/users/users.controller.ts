import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Session
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
    async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
        return this.authService.signUp(createUserDto);
    }

    @Post("/signIn")
    async signIn(@Body() loginUserDto: LoginUserDto, @Session() session: any): Promise<Users>{
        const user = await this.authService.signIn(loginUserDto)

        session.userId = user.id;

        return user;
    }

    @Get("/check")
    async checkLogin(@Session() session: any): Promise<string>{
        console.log(`userId: ${session.userId}`);
        return ""
    }

    @Post("/signOut")
    async signOut(@Session() session: any): Promise<void>{
        session.userId = null;
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
