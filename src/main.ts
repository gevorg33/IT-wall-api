import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(111);
  console.log(process.env.PG_USER, 'sasasasasaas');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, (): void => {
    console.log('Server has been run on port 3000');
  });
}
void bootstrap();
