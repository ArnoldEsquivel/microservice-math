import { Test, TestingModule } from '@nestjs/testing';
import { MathController } from './math.controller';
import { MathService } from './math.service';
import { MathResponseDto } from '../../utils/dtos/mathResponse.dto';

describe('MathController', () => {
  let controller: MathController;
  let mathService: MathService;

  beforeEach(async () => {
    // Crear un mock del MathService
    const mockMathService = {
      isEven: jest.fn(),
      isPrime: jest.fn(),
      factorial: jest.fn(),
      sumN: jest.fn(),
      factors: jest.fn(),
      fibonacci: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MathController],
      providers: [
        {
          provide: MathService,
          useValue: mockMathService,
        },
      ],
    }).compile();

    controller = module.get<MathController>(MathController);
    mathService = module.get<MathService>(MathService);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('calculate', () => {
    it('debe retornar los cálculos correctos para un número válido', () => {
      const number = 5;
      const mockResponse: MathResponseDto = {
        isPair: false,
        isPrime: true,
        factorial: '120',
        sumN: 15,
        factors: [1, 5],
        fibonacci: '5',
      };

      // Configurar los mocks para MathService
      (mathService.isEven as jest.Mock).mockReturnValue(false);
      (mathService.isPrime as jest.Mock).mockReturnValue(true);
      (mathService.factorial as jest.Mock).mockReturnValue('120');
      (mathService.sumN as jest.Mock).mockReturnValue(15);
      (mathService.factors as jest.Mock).mockReturnValue([1, 5]);
      (mathService.fibonacci as jest.Mock).mockReturnValue('5');

      const result = controller.calculate(number);

      expect(mathService.isEven).toHaveBeenCalledWith(number);
      expect(mathService.isPrime).toHaveBeenCalledWith(number);
      expect(mathService.factorial).toHaveBeenCalledWith(number);
      expect(mathService.sumN).toHaveBeenCalledWith(number);
      expect(mathService.factors).toHaveBeenCalledWith(number);
      expect(mathService.fibonacci).toHaveBeenCalledWith(number);

      expect(result).toEqual(mockResponse);
    });

    it('debe manejar correctamente un número par', () => {
      const number = 4;
      const mockResponse: MathResponseDto = {
        isPair: true,
        isPrime: false,
        factorial: '24',
        sumN: 10,
        factors: [1, 2, 4],
        fibonacci: '3',
      };

      // Configurar los mocks para MathService
      (mathService.isEven as jest.Mock).mockReturnValue(true);
      (mathService.isPrime as jest.Mock).mockReturnValue(false);
      (mathService.factorial as jest.Mock).mockReturnValue('24');
      (mathService.sumN as jest.Mock).mockReturnValue(10);
      (mathService.factors as jest.Mock).mockReturnValue([1, 2, 4]);
      (mathService.fibonacci as jest.Mock).mockReturnValue('3');

      const result = controller.calculate(number);

      expect(mathService.isEven).toHaveBeenCalledWith(number);
      expect(mathService.isPrime).toHaveBeenCalledWith(number);
      expect(mathService.factorial).toHaveBeenCalledWith(number);
      expect(mathService.sumN).toHaveBeenCalledWith(number);
      expect(mathService.factors).toHaveBeenCalledWith(number);
      expect(mathService.fibonacci).toHaveBeenCalledWith(number);

      expect(result).toEqual(mockResponse);
    });

    it('debe manejar correctamente el factorial de 0', () => {
      const number = 0;
      const mockResponse: MathResponseDto = {
        isPair: true,
        isPrime: false,
        factorial: '1',
        sumN: 0,
        factors: [1],
        fibonacci: '0',
      };

      // Configurar los mocks para MathService
      (mathService.isEven as jest.Mock).mockReturnValue(true);
      (mathService.isPrime as jest.Mock).mockReturnValue(false);
      (mathService.factorial as jest.Mock).mockReturnValue('1');
      (mathService.sumN as jest.Mock).mockReturnValue(0);
      (mathService.factors as jest.Mock).mockReturnValue([1]);
      (mathService.fibonacci as jest.Mock).mockReturnValue('0');

      const result = controller.calculate(number);

      expect(mathService.isEven).toHaveBeenCalledWith(number);
      expect(mathService.isPrime).toHaveBeenCalledWith(number);
      expect(mathService.factorial).toHaveBeenCalledWith(number);
      expect(mathService.sumN).toHaveBeenCalledWith(number);
      expect(mathService.factors).toHaveBeenCalledWith(number);
      expect(mathService.fibonacci).toHaveBeenCalledWith(number);

      expect(result).toEqual(mockResponse);
    });

    it('debe manejar correctamente el factorial de un número grande', () => {
      const number = 33;
      const mockResponse: MathResponseDto = {
        isPair: false,
        isPrime: false,
        factorial: '8683317618811886495518194401280000000',
        sumN: 561,
        factors: [1, 3, 11, 33],
        fibonacci: '3524578',
      };

      // Configurar los mocks para MathService
      (mathService.isEven as jest.Mock).mockReturnValue(false);
      (mathService.isPrime as jest.Mock).mockReturnValue(false);
      (mathService.factorial as jest.Mock).mockReturnValue('8683317618811886495518194401280000000');
      (mathService.sumN as jest.Mock).mockReturnValue(561);
      (mathService.factors as jest.Mock).mockReturnValue([1, 3, 11, 33]);
      (mathService.fibonacci as jest.Mock).mockReturnValue('3524578');

      const result = controller.calculate(number);

      expect(mathService.isEven).toHaveBeenCalledWith(number);
      expect(mathService.isPrime).toHaveBeenCalledWith(number);
      expect(mathService.factorial).toHaveBeenCalledWith(number);
      expect(mathService.sumN).toHaveBeenCalledWith(number);
      expect(mathService.factors).toHaveBeenCalledWith(number);
      expect(mathService.fibonacci).toHaveBeenCalledWith(number);

      expect(result).toEqual(mockResponse);
    });
  });
});