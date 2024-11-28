import { Repository } from 'typeorm';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
export declare class BonoService {
    private readonly bonoRepository;
    constructor(bonoRepository: Repository<BonoEntity>);
    crearBono(bono: BonoEntity): Promise<BonoEntity>;
    findBonosByClaseCodigo(codigo: string): Promise<BonoEntity[]>;
    findAllBonosByUsuario(id: number): Promise<BonoEntity[]>;
    deleteBono(id: number): Promise<void>;
}
