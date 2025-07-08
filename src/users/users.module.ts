import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {Users} from "./users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthService} from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
