/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity/estudiante.entity';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';
import { BonoEntity } from './bono/bono.entity/bono.entity';
import { ClaseEntity } from './clase/clase.entity/clase.entity';
import { EstudianteModule } from './estudiante/estudiante.module';
import { UsuarioModule } from './usuario/usuario.module';
import { BonoModule } from './bono/bono.module';
import { ClaseModule } from './clase/clase.module';

@Module({
  imports: [EstudianteModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'pablo123',
    database: 'Parcial2',
    entities: [UsuarioEntity, BonoEntity, ClaseEntity, EstudianteEntity],   
    dropSchema: true,
    synchronize: true,
    keepConnectionAlive: true
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
