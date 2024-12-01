import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

describe('BonoService', () => {
  let service: BonoService;
  let repository: Repository<BonoEntity>;
  let bonosList: BonoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BonoService],
    }).compile();

    service = module.get<BonoService>(BonoService);
    repository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
    await seedDataBase();
  });

  const seedDataBase = async () => {
    repository.clear();
    bonosList = [];
    for (let i = 0; i < 5; i++) {
      const bono: BonoEntity = await repository.save({
        monto: faker.number.int({ min: 100, max: 1000 }),
        calificacion: faker.number.int({ min: 0, max: 3 }), // Ensure valid calificacion
        palabra_clave: faker.lorem.word(),
      });
      bonosList.push(bono);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearBono debería crear un bono válido', async () => {
    const bono: BonoEntity = {
      id: undefined,
      monto: 500,
      calificacion: 2,
      palabra_clave: 'nuevo',
      usuario: null,
      clase: null,
    };

    const result = await service.crearBono(bono);
    expect(result).toHaveProperty('id');
    expect(result.monto).toEqual(bono.monto);
    expect(result.palabra_clave).toEqual(bono.palabra_clave);
  });

  it('crearBono debería lanzar un error si la calificación es mayor a 4', async () => {
    const bono: BonoEntity = {
      id: undefined,
      monto: 500,
      calificacion: 5, // Invalid calificacion
      palabra_clave: 'nuevo',
      usuario: null,
      clase: null,
    };

    await expect(service.crearBono(bono)).rejects.toThrow(BadRequestException);
  });

  it('findBonosByClaseCodigo debería retornar bonos por el código de clase', async () => {
    const bono = bonosList[0];
    bono.clase = { id: 1, codigo: 'CL123' } as any;
    await repository.save(bono);

    const result = await service.findBonosByClaseCodigo('CL123');
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toEqual(bono.id);
  });

  it('findBonosByClaseCodigo debería retornar un array vacío si no hay bonos', async () => {
    const result = await service.findBonosByClaseCodigo('NO_EXISTE');
    expect(result).toBeDefined();
    expect(result.length).toEqual(0);
  });

  it('findAllBonosByUsuario debería retornar bonos por el ID de usuario', async () => {
    const usuario = { id: 1, nombre: 'Usuario Prueba' } as any;
    const bono = bonosList[0];
    bono.usuario = usuario;
    await repository.save(bono);

    const result = await service.findAllBonosByUsuario(1);
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].usuario.id).toEqual(1);
  });

  it('findAllBonosByUsuario debería retornar un array vacío si no hay bonos para el usuario', async () => {
    const result = await service.findAllBonosByUsuario(999); // Usuario no existente
    expect(result).toBeDefined();
    expect(result.length).toEqual(0);
  });

  it('deleteBono debería eliminar un bono', async () => {
    const bono = bonosList[0];
    await service.deleteBono(bono.id);

    const result = await repository.findOne({ where: { id: bono.id } });
    expect(result).toBeNull();
  });

  it('deleteBono debería lanzar un error si el bono tiene calificación mayor a 4', async () => {
    const bono = await repository.save({
      monto: 400,
      calificacion: 5, // Invalid calificacion
      palabra_clave: 'calificación alta',
    });

    await expect(service.deleteBono(bono.id)).rejects.toThrow(BadRequestException);
  });

  it('deleteBono debería lanzar un error si el bono no existe', async () => {
    await expect(service.deleteBono(999)).rejects.toThrow(NotFoundException);
  });
});
