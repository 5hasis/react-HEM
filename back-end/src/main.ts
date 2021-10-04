import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(5000, function(){
    console.log('Connected 5000 port!')
  });
  

}
bootstrap();
