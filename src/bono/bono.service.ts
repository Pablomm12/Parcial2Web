/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonoEntity } from '../bono/bono.entity/bono.entity';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BonoService {

    constructor(
        @InjectRepository(BonoEntity)
        private readonly bonoRepository: Repository<BonoEntity>,

        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>,

        @InjectRepository(ClaseEntity)
        private readonly claseRepository: Repository<ClaseEntity>


    ) {}

    async crearBono(bono: BonoEntity): Promise<BonoEntity> {
        const usuario = await this.usuarioRepository.findOne({ where: { id: bono.usuario.id } });
        if (!bono.monto || bono.monto <= 0) {
            throw new BadRequestException('El monto debe ser positivo y no vacío');
        }
        if (!usuario || usuario.rol !== 'Profesor') {
            throw new BadRequestException('El usuario debe tener rol de profesor');
        }


        return await this.bonoRepository.save(bono);
    }

    async findBonosByClaseCodigo(codigo: string): Promise<BonoEntity[]> {
        const clase = await this.claseRepository.findOne({ where: { codigo }, relations: ['bonos'] });
        if (!clase) {
            throw new NotFoundError('Clase no encontrada');
        }

        return clase.bonos;
    }

    async findAllBonosByUsuario(id: number): Promise<BonoEntity[]> {
        return this.bonoRepository.find({
            where: { usuario: { id: id } },
            relations: ['usuario']
        });
    }

    async deleteBono(id: number): Promise<void> {
        const bono = await this.bonoRepository.findOne({ where: { id } });
        if (!bono) {
            throw new NotFoundError('Bono no encontrado');
        }
        if (bono.calificacion > 4) {
            throw new BadRequestException('No se puede eliminar un bono con calificación mayor a 4');
        }
        await this.bonoRepository.remove(bono);
    }
}