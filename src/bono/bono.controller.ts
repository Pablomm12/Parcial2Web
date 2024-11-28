/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';

@Controller('bono')
export class BonoController {
    constructor(private readonly bonoService: BonoService) {}

    @Post()
    async crearBono(@Body() bono: BonoEntity): Promise<BonoEntity> {
        return this.bonoService.crearBono(bono);
    }

    @Get('codigo/:codigo')
    async findBonoByClaseCodigo(@Param('codigo') codigo: string): Promise<BonoEntity[]> {
        return this.bonoService.findBonosByClaseCodigo(codigo);
    }

    @Get('usuario/:id')
    async findAllBonosByUsuario(@Param('id') id: number): Promise<BonoEntity[]> {
        return this.bonoService.findAllBonosByUsuario(id);
    }

    @Delete(':id')
    async deleteBonoById(@Param('id') id: number) {
        return this.bonoService.deleteBono(id);
    }

}