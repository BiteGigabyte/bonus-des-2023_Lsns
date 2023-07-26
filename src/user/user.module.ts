import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AnimalModule } from '../animal/animal.module';
import { AnimalService } from '../animal/animal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    AnimalModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, AnimalService],
  exports: [UserModule],
})
export class UserModule {}
