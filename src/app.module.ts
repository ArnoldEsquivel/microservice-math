import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { environments } from './core/config/environments';
import { validSchema } from './core/config/validSchema';
import config from './core/config/config';

import { MathService } from './modules/math/math.service';
import { MathModule } from './modules/math/math.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env.dev',
			isGlobal: true,
			load: [config],
			validationSchema: validSchema,
    }),
    MathModule
  ],
  controllers: [AppController],
  providers: [MathService],
})
export class AppModule { }
