import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { MathService } from './math.service';

@Controller()
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @MessagePattern('calculate')
  calculate(@Payload() data: number) {
    const n = data; 

    return {
      isPair: this.mathService.isEven(n),
      isPrime: this.mathService.isPrime(n),
      factorial: this.mathService.factorial(n),
      sumN: this.mathService.sumN(n),
      factors: this.mathService.factors(n),
      fibonacci: this.mathService.fibonacci(n),
    };
  }
}