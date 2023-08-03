import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CarService } from './car.service';
import { CreateCarRequestDto } from './model/dto/request/create-car.request.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async createCar(@Body() body: CreateCarRequestDto) {
    return this.carService.createCar(body);
  }

  @Get(':carId')
  async getCarWithDrivers(@Param('carId') carId: string) {
    return this.carService.getCarWithDrivers(+carId);
  }

  @Delete(':carId')
  async deleteCar() {}

  @Patch(':carId')
  async updateCarProfile() {}
}
