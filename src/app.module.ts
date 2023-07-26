import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AnimalController } from './animal/animal.controller';
import { AnimalModule } from './animal/animal.module';
import { UserService } from './user/user.service';
import { TypeOrmConfiguration } from './config/database/type-orm-configuration';
import {AuthModule} from "./auth/auth.module";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    UserModule,
    AnimalModule,
    AuthModule,
  ],
  controllers: [AppController, AnimalController],
  providers: [AppService],
})
export class AppModule {}
