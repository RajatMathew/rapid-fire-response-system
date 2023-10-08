import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class AuthenticationGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()

        return request.isAuthenticated()
    }
}