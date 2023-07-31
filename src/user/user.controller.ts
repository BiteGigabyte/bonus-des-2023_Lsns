import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../common/pagination/response';
import { PublicUserInfoDto } from '../common/query/user.query.dto';
import {
  UserCreateDto,
  UserloginDto,
  UserloginSocialDto,
} from './dto/user.dto';
import { PublicUserData } from './interface/user.interface';
import { UserService } from './user.service';

@ApiTags('User')
@ApiExtraModels(PublicUserData, PaginatedDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @ApiPaginatedResponse('entities', PublicUserData)
  @Get('list')
  async getUserList(@Query() query: PublicUserInfoDto) {
    return this.userService.getAllUsers(query);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: UserCreateDto })
  @Post(':userId/create')
  async createUserAccount(@Req() req: any, @Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Post('account/:userId/animal')
  async addAnimalToUser() {
    return 'New User';
  }

  @Post('login')
  async loginUser(@Body() body: UserloginDto) {
    return this.userService.login(body);
  }

  @Post('social/login')
  async loginSocialUser(@Body() body: UserloginSocialDto) {
    return this.userService.loginSocail(body);
  }

  @Delete(':userId')
  async deleteUserAccount() {}

  @Patch(':userId')
  async updateUserProfile() {}

  @Get(':userId')
  async getUserProfile(@Param('userId') id: string) {
    return this.userService.getOneUserAccount(id);
  }
}
