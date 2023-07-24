import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';

@Module({
  providers: [AnimalService],
  exports: [AnimalService],
})
export class AnimalModule {}
