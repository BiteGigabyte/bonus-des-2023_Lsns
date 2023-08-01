import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Car } from './car.entity';
import { CreateCarRequestDto } from './model/dto/request/create-car.request.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createCar(data: CreateCarRequestDto): Promise<Car> {
    const user = await this.userRepository.findOneBy({});
    const car = this.carRepository.create({ ...data, users: [user] });

    return await this.carRepository.save(car);
  }
}
