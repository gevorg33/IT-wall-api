import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/http-exception-filter';
import { patchSelectQueryBuilder } from 'typeorm-scope';

async function bootstrap() {
  patchSelectQueryBuilder();

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const PORT = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
      dismissDefaultMessages: false,
      validationError: {
        target: false,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  setupSwagger(app);

  await app.listen(PORT, (): void => {
    console.log(`Server has been run on port ${PORT}`);
  });
}
void bootstrap();
