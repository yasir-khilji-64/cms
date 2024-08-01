import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // throw new Error('Method not implemented.');
    const { user } = context.switchToHttp().getRequest<RequestWithUser>();
    if (user['roles'][0]['name'] === 'ADMIN') {
      return true;
    }
    return false;
  }
}
