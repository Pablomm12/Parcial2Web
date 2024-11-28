import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
export declare class ClaseService {
    private readonly claseRepository;
    constructor(claseRepository: Repository<ClaseEntity>);
    crearClase(clase: ClaseEntity): Promise<ClaseEntity>;
    findClaseById(id: number): Promise<ClaseEntity>;
}
