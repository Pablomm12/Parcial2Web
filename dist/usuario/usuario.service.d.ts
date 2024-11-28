import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
export declare class UsuarioService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<UsuarioEntity>);
    crearUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>;
    findeUsuarioById(id: number): Promise<UsuarioEntity>;
    eliminarUsuarioById(id: number): Promise<void>;
}
