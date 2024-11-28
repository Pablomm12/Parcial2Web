/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { ClaseEntity } from './clase.entity/clase.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ClaseService {

    constructor(
        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>
    ) {}

    async crearClase(clase: ClaseEntity): Promise<ClaseEntity> {
        if (!clase.codigo || clase.codigo.length !== 10) {
            throw new BadRequestException('El código debe tener 10 caracteres'); 
        }
        return await this.claseRepository.save(clase);
    }

    async findClaseById(id: number): Promise<ClaseEntity> {
        return this.claseRepository.findOne({ where: { id } });
    }
}