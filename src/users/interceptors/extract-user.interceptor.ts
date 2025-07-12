import {CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users.service";
import {Observable} from "rxjs";

@Injectable()
export class ExtractUserInterceptor implements NestInterceptor {

    constructor(private readonly usersService: UsersService) {}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {

        //HTTP Context를 가져온다
        const request = context.switchToHttp().getRequest();

        //session에서 userId를 가져온다.
        const {userId}: {userId: number} = request.session || {};

        //userId가 있으면 정보를 가져온다.
        if(userId) {
            //User 정보를 데코레이터에서 가져올 수 있도록 context에 넣기
            request.curUser = await this.usersService.findOne(userId);
        }

        return next.handle()
    }
}