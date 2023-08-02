import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { CarClassEnum } from '../../enum/car-class.enum';

export class CarBaseRequestDto {
  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsNumber()
  @Min(1990)
  @Max(2023)
  age: number;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsEnum(CarClassEnum)
  @IsNotEmpty()
  class: CarClassEnum;
}
