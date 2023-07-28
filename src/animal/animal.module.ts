import { Module } from '@nestjs/common';

import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
  providers: [AnimalService],
  controllers: [AnimalController],
  exports: [],
})
export class AnimalModule {}
