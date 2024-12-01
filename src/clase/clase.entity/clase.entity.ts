/* eslint-disable prettier/prettier */
import { Column, Double, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../..//usuario/usuario.entity/usuario.entity';
import { BonoEntity } from '../..//bono/bono.entity/bono.entity';

@Entity()
export class ClaseEntity  {
    @PrimaryGeneratedColumn('uuid')
    id: number;
   
    @Column()
    nombre: string;
    
    @Column()
    codigo : string;
   
    @Column()
    numero_creditos: number; 

    @ManyToOne(() => UsuarioEntity, usuario => usuario.clases)
    usuario: UsuarioEntity;

    @OneToMany(() => BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];


}