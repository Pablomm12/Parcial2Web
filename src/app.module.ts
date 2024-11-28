/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { EstudianteModule } from './estudiante/estudiante.module';

@Module({
  imports: [EstudianteModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'pablo123',
    database: 'Parcial2',
    entities: [EstudianteEntity],   
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
