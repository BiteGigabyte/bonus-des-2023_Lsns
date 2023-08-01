import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { CarController } from './car.controller';
import { Car } from './car.entity';
import { CarService } from './car.service';

@Module({
  imports: [TypeOrmModule.forFeature([Car, User])],
  controllers: [CarController],
  providers: [CarService],
  exports: [],
})
export class CarModule {}
