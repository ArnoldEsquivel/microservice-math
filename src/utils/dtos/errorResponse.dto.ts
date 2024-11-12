import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ErrorResponseDto {
  @ApiProperty({ description: 'Mensaje de error', example: 'El número debe ser un entero positivo menor o igual a 100' })
  @IsString({ message: 'El mensaje de error debe ser una cadena de texto' })
  error: string;
}
