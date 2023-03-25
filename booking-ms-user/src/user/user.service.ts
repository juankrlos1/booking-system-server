import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './proto/user';
import UserMessage = user.UserMessage;
import RoleMessage = user.RoleMessage;
import DepartmentMessage = user.DepartmentMessage;
import AreaMessage = user.AreaMessage;
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    console.log('Find all users');
    return await this.userRepository.find({ relations: ['role', 'area'] });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['role', 'area'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOneOrFail({
      where: { id },
      relations: ['role', 'area'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  userToUserMessage = (user: User): UserMessage => {
    const role = {
      id: user.role.id,
      name: user.role.name,
      description: user.role.description,
      created_at: Timestamp.fromDate(user.role.createdAt),
      created_by: user.role.createdBy,
      updated_at: Timestamp.fromDate(user.role.updatedAt),
      updated_by: user.role.updatedBy,
    } as RoleMessage;

    const department = {
      id: user.area.department.id,
      name: user.area.department.name,
      description: user.area.department.description,
      created_at: Timestamp.fromDate(user.area.department.createdAt),
      created_by: user.area.department.createdBy,
      updated_at: Timestamp.fromDate(user.area.department.updatedAt),
      updated_by: user.area.department.updatedBy,
    } as DepartmentMessage;

    const area = {
      id: user.area.id,
      name: user.area.name,
      description: user.area.description,
      department: department,
      created_at: Timestamp.fromDate(user.area.createdAt),
      created_by: user.area.createdBy,
      updated_at: Timestamp.fromDate(user.area.updatedAt),
      updated_by: user.area.updatedBy,
    } as AreaMessage;

    return {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      role: role,
      area: area,
      created_at: Timestamp.fromDate(user.createdAt),
      created_by: user.createdBy,
      updated_at: Timestamp.fromDate(user.updatedAt),
      updated_by: user.updatedBy,
    } as UserMessage;
  };
}
