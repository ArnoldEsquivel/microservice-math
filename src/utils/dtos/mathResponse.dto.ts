import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MathResponseDto {
    @ApiProperty({ description: 'Indica si el número es par', example: false })
    @IsBoolean({ message: 'isPair debe ser un booleano' })
    isPair: boolean;

    @ApiProperty({ description: 'Indica si el número es primo', example: true })
    @IsBoolean({ message: 'isPrime debe ser un booleano' })
    isPrime: boolean;

    @ApiProperty({ description: 'Factorial del número como una cadena', example: '120' })
    @IsString({ message: 'factorial debe ser una cadena' })
    factorial: string;

    @ApiProperty({ description: 'Suma de todos los enteros desde 1 hasta n', example: 15 })
    @IsNumber({}, { message: 'sumN debe ser un número' })
    sumN: number;

    @ApiProperty({ description: 'Lista de factores del número', example: [1, 5] })
    @IsArray({ message: 'factors debe ser un arreglo de números' })
    @IsNumber({}, { each: true, message: 'Cada elemento de factors debe ser un número' })
    factors: number[];

    @ApiProperty({ description: 'El enésimo número en la secuencia de Fibonacci como cadena', example: '5' })
    @IsString({ message: 'fibonacci debe ser una cadena de texto' })
    fibonacci: string;
}
