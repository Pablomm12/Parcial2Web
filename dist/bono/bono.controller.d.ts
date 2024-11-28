import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
export declare class BonoController {
    private readonly bonoService;
    constructor(bonoService: BonoService);
    crearBono(bono: BonoEntity): Promise<BonoEntity>;
    findBonoByClaseCodigo(codigo: string): Promise<BonoEntity[]>;
    findAllBonosByUsuario(id: number): Promise<BonoEntity[]>;
    deleteBonoById(id: number): Promise<void>;
}
