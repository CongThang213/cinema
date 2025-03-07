import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Địa chỉ frontend
    credentials: true, // Cho phép gửi cookies nếu có
  });

  await app.listen(process.env.PORT ?? 4000);

  app.enableCors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
  });
  
  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription('API for Cinema Booking System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();


