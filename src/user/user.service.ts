import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

import { AuthService } from '../auth/auth.service';
import { CarClassEnum } from '../car/model/enum/car-class.enum';
import { PaginatedDto } from '../common/pagination/response';
import { PublicUserInfoDto } from '../common/query/user.query.dto';
import {
  UserCreateDto,
  UserloginDto,
  UserloginSocialDto,
} from './dto/user.dto';
import { PublicUserData } from './interface/user.interface';
import { UserRepository } from './user.repository';

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';

@Injectable()
export class UserService {
  // private users = [];
  private salt = 5;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    @InjectRedisClient() private redisClient: RedisClient,
  ) {}

  async getAllUsers(
    query: PublicUserInfoDto,
  ): Promise<PaginatedDto<PublicUserData>> {
    return await this.userRepository.getAllUsers(query);
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

  async login(data: UserloginDto) {
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!findUser) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!(await this.compareHash(data.password, findUser.password))) {
      throw new HttpException(
        'Email or password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.singIn(findUser);
    await this.redisClient.setEx(token, 10000, token);

    return { token };
  }

  async loginSocail(data: UserloginSocialDto) {
    try {
      const oAuthClient = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
      );

      const result = await oAuthClient.verifyIdToken({
        idToken: data.accessToken,
      });

      const tokenPayload = result.getPayload();
      const token = await this.singIn({ id: tokenPayload.sub });
      return { token };
    } catch (e) {
      throw new HttpException('Google auth failed', HttpStatus.UNAUTHORIZED);
    }
  }

  async getOneUserAccount(userId: string) {
    return await this.userRepository.findOne({
      where: { id: +userId, cars: { class: CarClassEnum.SPORT } },
      relations: { cars: true, animals: true },
    });
  }
  // async getOneUserAccount(userId: string) {
  //   return await this.userRepository.findOne({
  //     where: { id: +userId },
  //     relations: { cars: true },
  //   });
  // }

  async getHash(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async singIn(user) {
    return await this.authService.signIn({
      id: user.id.toString(),
    });
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
