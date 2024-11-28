import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BonoService } from './bono.service';
import { BonoController } from './bono.controller';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([BonoEntity]), 
  ],
  providers: [BonoService],
  controllers: [BonoController],
})
export class BonoModule {}
