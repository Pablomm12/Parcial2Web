/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BonoEntity } from 'src/bono/bono.entity/bono.entity';
import { ClaseEntity } from 'src/clase/clase.entity/clase.entity';

@Entity()
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;
   
    @Column()
    nombre: string;
    
    @Column()
    grupo_investigacion: string;
   
    @Column()
    cedula: number; 
    
    @Column()
    rol: string[];
    
    @Column()
    numero_extension : number; 

    @OneToOne(() => UsuarioEntity)
        usuario: UsuarioEntity;
    
    @OneToMany(() => BonoEntity, bono => bono.usuario)
    bonos: BonoEntity[];

    @OneToMany(() => ClaseEntity, clase => clase.usuario)
    clases: ClaseEntity[];



}