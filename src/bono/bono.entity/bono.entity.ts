/* eslint-disable prettier/prettier */
import { Column, Double, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';

@Entity()
export class BonoEntity  {
    @PrimaryGeneratedColumn('uuid')
    id: number;
   
    @Column()
    monto: number;
    
    @Column()
    calificacion : number;
   
    @Column()
    palabra_clave: string; 

    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos)
    usuario: UsuarioEntity;

    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;


}