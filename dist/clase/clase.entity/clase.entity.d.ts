import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
export declare class ClaseEntity {
    id: number;
    nombre: string;
    codigo: string;
    numero_creditos: number;
    usuario: UsuarioEntity;
    bonos: BonoEntity[];
}
