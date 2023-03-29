import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      'roles',
      context.getHandler(),
    );

    if (!validRoles || validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();

    const user = req.user as User;

    console.log('user in guard: ', user);

    if (!user) throw new BadRequestException();

    if (validRoles.includes(user.role.name)) return true;

    console.log('Use guards: ', validRoles);
    console.log('User role: ', { user });

    throw new ForbiddenException('The user need a valid role');
  }
}
