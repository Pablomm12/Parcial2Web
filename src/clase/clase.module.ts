import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseService } from './clase.service';

import { ClaseEntity } from 'src/clase/clase.entity/clase.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([ClaseEntity]),
  ],
  providers: [ClaseService],
  controllers: [], 
})
export class ClaseModule {}
