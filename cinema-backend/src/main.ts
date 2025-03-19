import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Đăng ký Exception Filter toàn cục
  app.useGlobalFilters(new HttpExceptionFilter());

  // Cấu hình CORS cho frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4000', // Đọc từ biến môi trường
    credentials: true, // Hỗ trợ cookies và headers bảo mật
  });

  // Khởi động server
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`🚀 Backend đang chạy tại: http://localhost:${PORT}`);

  // Cấu hình Swagger API
  const config = new DocumentBuilder()
    .setTitle('Cinema API')
    .setDescription('API for Cinema Booking System')
    .setVersion('1.0')
    .addBearerAuth() // Bổ sung xác thực token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
bootstrap();
