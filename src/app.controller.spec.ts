import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ConfigService],
    }).compile();

    appController = module.get<AppController>(AppController);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('calculate', () => {
    it('should return a BadRequestException if number is not provided', async () => {
      await expect(appController.calculate(undefined)).rejects.toThrow(BadRequestException);
    });

    it('should return a BadRequestException if number is not a positive integer', async () => {
      await expect(appController.calculate('-1')).rejects.toThrow(BadRequestException);
    });

    it('should return a BadRequestException if number is greater than 100', async () => {
      await expect(appController.calculate('101')).rejects.toThrow(BadRequestException);
    });

    it('should call client.send when a valid number is provided', async () => {
      const sendMock = jest.fn();
      jest.spyOn(appController['client'], 'send').mockImplementation(sendMock);
      const validNumber = '5';

      await appController.calculate(validNumber);

      expect(sendMock).toHaveBeenCalledWith('calculate', parseInt(validNumber, 10));
    });
  });
});
