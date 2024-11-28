import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';
export declare class BonoEntity {
    id: number;
    monto: number;
    calificacion: number;
    palabra_clave: string;
    usuario: UsuarioEntity;
    clase: ClaseEntity;
}
