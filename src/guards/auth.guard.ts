import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    //for some reason im not getting the session.userId on client side, so this is a quick fix. (works fine for now) FIX: pending
    if (!request.session.userId && request.session.current) {
      request.session.userId = request.session.current.id;
    }

    // Return the current userId from cookie
    return request.session.userId || null;
  }
}
