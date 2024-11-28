/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ) {}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if (estudiante.codigo_estudiante.length !== 10) {
            throw new BadRequestException('El código del estudiante debe tener 10 caracteres');
        }
        return await this.estudianteRepository.save(estudiante);
    }

    async findeEstudianteById(id: number): Promise<EstudianteEntity> {
        return this.estudianteRepository.findOne({ where: { id } });
    }



}
