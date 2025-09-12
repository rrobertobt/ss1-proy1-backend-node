import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // app.use((req, res, next) => {
  //   res.header('Content-Type', 'application/json');
  //   res.header('Accept', 'application/json');
  //   next();
  // });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: (errors) => {
      const firstError = errors[0];
      const constraint = firstError.constraints ? 
        Object.values(firstError.constraints)[0] : 
        'Validation failed';
      return {
        status: 400,
        error: 'BAD_REQUEST',
        message: 'Validation failed',
        details: constraint,
        field: firstError.property
      };
    }
  }));
  
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Vinyl Store API')
    .setDescription('API Documentation for Vinyl Store Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the server
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation available at: http://localhost:${port}/api`);
}
bootstrap();
