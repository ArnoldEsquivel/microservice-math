<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"></p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# Microservice Math Application

This project is a NestJS-based microservice application that performs various mathematical operations, including determining the parity, primality, factorial, sum of integers, factors, and Fibonacci sequence value of a given integer. The application is structured as a microservice and communicates via RabbitMQ. It also uses Docker for containerization and Swagger for API documentation.

## Project Structure

The project follows a modular structure to maintain clean and organized code. The directory structure is as follows:

```
src
├── core
│   └── config
│       ├── config.ts
│       ├── environments.ts
│       └── validSchema.ts
├── modules
│   └── math
│       ├── math.controller.ts
│       ├── math.controller.spec.ts
│       ├── math.module.ts
│       ├── math.service.ts
│       └── math.service.spec.ts
├── utils
│   └── dtos
│       ├── errorResponse.dto.ts
│       └── mathResponse.dto.ts
└── test
    └── app.e2e-spec.ts
.env.dev
.env.prod
Dockerfile
docker-compose.yml
README.md
```



### Core Modules

- **`core/config`**: Contains all the environment configurations and validations, including environment-specific files (`environments.ts`), configuration schema validation (`validSchema.ts`), and main configuration (`config.ts`).
  
- **`modules/math`**: Houses the main logic for the mathematical operations. It includes:
  - **`math.controller.ts`**: The controller handles requests and calls the respective service methods.
  - **`math.service.ts`**: Implements the logic for mathematical operations such as determining if a number is even, prime, calculating factorial, etc.
  - **`math.module.ts`**: The module configuration file for the Math module.
  
- **`utils/dtos`**: Contains Data Transfer Objects (DTOs) for consistent data structures, such as `errorResponse.dto.ts` and `mathResponse.dto.ts`.

### Configuration and Import Order

To follow best practices, the project maintains a structured import order for readability and consistency. Imports are ordered as follows:

1. **NestJS core modules and dependencies** (e.g., `ConfigModule`, `Module`).
2. **Project-specific configurations** from the `core/config` folder.
3. **Modules and services** specific to the application.

This ordering maintains readability and separates external dependencies from internal modules.

Example of the import structure in `app.module.ts`:

```typescript
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { environments } from './core/config/environments';
import { validSchema } from './core/config/validSchema';
import config from './core/config/config';

import { MathService } from './modules/math/math.service';
import { MathModule } from './modules/math/math.module';
import { AppController } from './app.controller';
```

### Environment Variables

The project includes environment variable files such as `.env.dev` and `.env.prod.` For practical purposes, `.env.prod` is included in the repository to facilitate easy access to production variables, especially when setting up Docker containers. In a real-world scenario, sensitive data should not be included in the repository but managed securely via environment variable managers or secrets management solutions.

### Docker Configuration
This project is fully containerized using Docker. The Dockerfile builds the NestJS application, and the docker-compose.yml file orchestrates both the application and RabbitMQ container services.

To build and run the project with Docker, execute the following commands:

```bash
docker-compose up --build
```

- The docker-compose.yml file will set up the application on localhost:3000 and RabbitMQ with the management interface on localhost:15672.

### API Documentation with Swagger
The API is documented using Swagger. This allows for clear, interactive API documentation accessible through the /api/docs endpoint after running the application. Swagger enables easy testing and understanding of each endpoint’s input/output structure.

### Better Comments for Code Documentation
For additional inline documentation, Better Comments syntax is used. This allows for structured, color-coded comments within the codebase, making it easier for developers to understand the logic and any important notes.

### Running Tests
The project includes unit tests for services and controllers located in the spec.ts files within each module. End-to-end tests are also provided in the test folder, ensuring that the microservice’s functionality is reliable and meets expected outputs.

To run tests, use the following command:
```bash
npm run test
```