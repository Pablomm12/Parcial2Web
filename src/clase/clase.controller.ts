import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseEntity } from './clase.entity/clase.entity';

@Controller('clase')
export class ClaseController {
    constructor(private readonly claseService: ClaseService) {}

    @Post()
    async crearClase(@Body() clase: ClaseEntity): Promise<ClaseEntity> {
        return this.claseService.crearClase(clase);
    }

    @Get(':id')
    async findClaseById(@Param('id') id: number): Promise<ClaseEntity> {
        const clase = await this.claseService.findClaseById(id);
        if (!clase) {
            throw new NotFoundException('Clase not found');
        }
        return clase;
    }
}
