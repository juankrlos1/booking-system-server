import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { user, USER_SERVICE_NAME } from './proto/user';
import UserServiceClient = user.UserServiceClient;
import { ClientGrpc } from '@nestjs/microservices';
import GetUsersRequest = user.GetUsersRequest;
import GetUsersResponse = user.GetUsersResponse;

@Controller('users')
export class UsersController implements OnModuleInit {
  private svc: UserServiceClient;

  @Inject(USER_SERVICE_NAME)
  private readonly client: ClientGrpc;
  constructor(private readonly usersService: UsersService) {}

  onModuleInit(): void {
    this.svc = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Get()
  async findAllUsers() {
    const getUsersRequest = new GetUsersRequest();
    const response: GetUsersResponse = await new Promise((resolve, reject) => {
      this.svc.GetUsers(getUsersRequest, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });

    return response.users.map((userMessage) => {
      // Convierte el objeto `userMessage` en un objeto `user` para que se pueda serializar en la respuesta JSON
    });
  }
}
