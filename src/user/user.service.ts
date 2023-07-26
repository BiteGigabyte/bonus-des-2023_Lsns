import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  // private users = [];
  private salt = 5;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    console.log('12');
    return this.userRepository.find();
  }

  async createUser(data: UserCreateDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (findUser) {
      throw new HttpException(
        'User with this email alredy exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    data.password = await this.getHash(data.password);
    const newUser = this.userRepository.create(data);
    // newUser.lastLogin = '12-07-2023';
    // await newUser.save();
    await this.userRepository.save(newUser);

    const token = await this.singIn(newUser);

    return { token };
  }

  async getOneUserAccount(userId: string) {
    // const user = this.users.find((item) => item.id === userId);
    return 'user';
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async singIn(user) {
    return await this.authService.signIn({
      id: user.id.toString(),
    });
  }
}
