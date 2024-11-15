import { Module } from '@nestjs/common';
import { MathController } from './math.controller';
import { MathService } from './math.service';

@Module({
  providers: [MathService],
  controllers: [MathController]
})
export class MathModule { }
