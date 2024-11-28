import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
export declare class UsuarioEntity {
    id: number;
    nombre: string;
    grupo_investigacion: string;
    cedula: number;
    rol: string[];
    numero_extension: number;
    usuario: UsuarioEntity;
    bonos: BonoEntity[];
    clases: ClaseEntity[];
}
