import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
export declare class EstudianteService {
    private readonly estudianteRepository;
    constructor(estudianteRepository: Repository<EstudianteEntity>);
    crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity>;
    findeEstudianteById(id: number): Promise<EstudianteEntity>;
}
