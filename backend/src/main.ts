import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AllConfigType } from './config/config.type';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get<ConfigService<AllConfigType>>(ConfigService);
  app.enableShutdownHooks();
  const apiPrefix = config.getOrThrow('app.apiPrefix', { infer: true });
  const apiVersion = config.getOrThrow('app.apiVersion', { infer: true });
  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: `${apiVersion}`,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(config.getOrThrow('app.port', { infer: true }));
}
void bootstrap();
