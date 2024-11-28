/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';

@Controller('estudiante')
export class EstudianteController {

    constructor(private readonly estudianteService: EstudianteService) {}

    @Post()
    async crearEstudiante(@Body() estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        return this.estudianteService.crearEstudiante(estudiante);
    }

    @Get(':id')
    async findeEstudianteById(@Param('id') id: number): Promise<EstudianteEntity> {
        return await this.estudianteService.findeEstudianteById(id);
    }
}
