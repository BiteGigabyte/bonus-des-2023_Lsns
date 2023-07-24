import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AnimalController } from './animal/animal.controller';
import { AnimalModule } from './animal/animal.module';
import {UserService} from "./user/user.service";

@Module({
  imports: [UserModule, AnimalModule],
  controllers: [AppController, UserController, AnimalController],
  providers: [AppService, UserService],
})
export class AppModule {}
