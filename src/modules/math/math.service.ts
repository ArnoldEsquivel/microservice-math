import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
    // * Corrobora si un número es par
    isEven(n: number): boolean {
        return n % 2 === 0;
    }

    // * Determina si un número es primo
    isPrime(n: number): boolean {
        // ! Retorna falso para números menores o iguales a 1
        if (n <= 1) return false;
        
        // ! Si se encuentra un divisor, no es primo
        for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false
        
        // * Si no encontramos divisores, es primo y retornamos true
        return true;
    }

    // * Calcula el factorial de un número
    factorial(n: number): string {
        let result = BigInt(1);

        for (let i = 2; i <= n; i++) result *= BigInt(i);

        // * Convertimos el resultado a string para evitar errores y mantener precisión
        return result.toString();
    }

    // * Calcula la suma de los primeros n números naturales
    sumN(n: number): number {
        return (n * (n + 1)) / 2; // * Usamos la fórmula de Gauss
    }

    // * Calcula los factores de un número
    factors(n: number): number[] {
        const result = [];

        // * Si es divisor, lo agregamos al resultado
        for (let i = 1; i <= n; i++) if (n % i === 0) result.push(i);

        return result;
    }

    // * Calcula la serie de Fibonacci hasta el n-ésimo término
    fibonacci(n: number): string {
        if (n === 0) return '0';
        if (n === 1) return '1';

        let a = BigInt(0), b = BigInt(1);

        for (let i = 2; i <= n; i++) {
            const temp = a + b;
            a = b;
            b = temp;
        }

        // * Convertimos el resultado a string para evitar errores y mantener precisión
        return b.toString();
    }
}
