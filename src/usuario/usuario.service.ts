/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const validGroups = ['TICSW', 'IMAGINE', 'COMIT'];
        if (usuario.rol.includes("Profesor") && !validGroups.includes(usuario.grupo_investigacion) ) {
            throw new BadRequestException('Grupo de investigación para profesor inválido');
        }
        if (usuario.rol.includes("Decana") && usuario.numero_extension.toString().length !== 8) {
            throw new BadRequestException('Número de extensión para decana inválido');
        }
        return await this.usuarioRepository.save(usuario);
    }

    async findeUsuarioById(id: number): Promise<UsuarioEntity> {
        return this.usuarioRepository.findOne({ where: { id } });
    }

   async eliminarUsuarioById(id: number) {
        const usuario: UsuarioEntity = await this.usuarioRepository.findOne({where: {id}, relations: ['bonos']});
        if (!usuario) {
            throw new NotFoundError('Usuario no encontrado');
        }

        if (usuario.rol.includes("Decana")) {
            throw new BadRequestException('No se puede eliminar a la decana');
        }

        const tiene = usuario.bonos.length > 0;

        if (tiene) {
            throw new BadRequestException('No se puede eliminar el usuario porque tiene bonos asociados');
        }
        await this.usuarioRepository.remove(usuario);
    }

}