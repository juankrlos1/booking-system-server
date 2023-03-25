import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user, USER_SERVICE_NAME } from './proto/user';
import { GrpcMethod } from '@nestjs/microservices';
import GetUsersRequest = user.GetUsersRequest;
import GetUsersResponse = user.GetUsersResponse;
import UserMessage = user.UserMessage;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @GrpcMethod(USER_SERVICE_NAME, 'GetUsers')
  async getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
    console.log('request:' + { request });
    const users = await this.userService.findAll();
    const userMessages: UserMessage[] = users.map(
      this.userService.userToUserMessage,
    );

    const getUsersResponse = new GetUsersResponse();
    getUsersResponse.users = userMessages;
    return getUsersResponse;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
