/* eslint-disable prettier/prettier */
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class EstudianteEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 nombre: string;
 
 @Column()
 codigo_estudiante: string;
 
 @Column()
 creditos_aprovados: number; 


}