import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseService } from './clase.service';

import { ClaseEntity } from '../clase/clase.entity/clase.entity'; 
import { ClaseController } from './clase.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClaseEntity]),
  ],
  providers: [ClaseService],
  controllers: [ClaseController], 
})
export class ClaseModule {}
