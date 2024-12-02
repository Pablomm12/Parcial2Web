import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {}

    @Post()
    async crearUsuario(@Body() usuario: UsuarioEntity): Promise<UsuarioEntity> {
        return this.usuarioService.crearUsuario(usuario);
    }

    @Get(':id')
    async findeUsuarioById(@Param('id') id: number): Promise<UsuarioEntity> {
        return this.usuarioService.findUsuarioById(id);
    }

    @Delete(':id')
    async eliminarUsuarioById(@Param('id') id: number): Promise<void> {
        return this.usuarioService.eliminarUsuarioById(id);
    }
}
