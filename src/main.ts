/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();*/



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const port = 3000;
//   const globalPrefix = '';

//   const config = new DocumentBuilder()
//     .setTitle('My Project API')
//     .setDescription('API documentation')
//     .setVersion('1.0')
//     .build();

//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api', app, document);

//   await app.listen(3000);
//   console.log(`🚀 Application is running on: http://localhost:${port}${globalPrefix ? '/' + globalPrefix : ''}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 3000;
  const globalPrefix = ''; // change this to 'api' if you use app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('My Project API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}${globalPrefix ? '/' + globalPrefix : ''}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api`);
}
bootstrap();
