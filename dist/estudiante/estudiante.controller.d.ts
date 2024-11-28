import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
export declare class EstudianteController {
    private readonly estudianteService;
    constructor(estudianteService: EstudianteService);
    crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity>;
    findeEstudianteById(id: number): Promise<EstudianteEntity>;
}
