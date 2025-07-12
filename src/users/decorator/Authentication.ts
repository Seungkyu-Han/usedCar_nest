import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export const Authentication = createParamDecorator(
    (data: never, context: ExecutionContext) => {

        const httpRequest = context.switchToHttp().getRequest();

        return httpRequest.curUser;
    }
)