import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { UserCreateDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @Get('list')
  async getUserList() {
    return this.userService.getAllUsers();
  }

  @Post('account/create')
  async createUserAccount(@Req() req: any, @Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Post('account/:userId/animal')
  async addAnimalToUser() {
    return 'New User';
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
