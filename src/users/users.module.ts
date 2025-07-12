import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {Users} from "./users.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthService} from "./auth.service";
import {ExtractUserInterceptor} from "./interceptors/extract-user.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [
      UsersService, AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ExtractUserInterceptor,
    }],
})
export class UsersModule {}
