import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AnimalModule } from '../animal/animal.module';
import { AnimalService } from '../animal/animal.service';

@Module({
  imports: [AnimalModule],
  providers: [UserService, AnimalService],
})
export class UserModule {}
