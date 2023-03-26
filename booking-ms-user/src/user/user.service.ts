import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
}
