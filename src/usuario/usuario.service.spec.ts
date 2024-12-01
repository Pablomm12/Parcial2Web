import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { faker } from '@faker-js/faker';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuariosList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    await seedDataBase();
  });

  const seedDataBase = async () => {
    repository.clear();
    usuariosList = [];
    for (let i = 0; i < 5; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.person.firstName(),
        grupo_investigacion: 'TICSW',
        cedula: faker.number.int(),
        rol: 'Profesor',
        numero_extension: 12345678,
      });
      usuariosList.push(usuario);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearUsuario debería crear un usuario válido', async () => {
    const usuario: UsuarioEntity = {
      id: undefined,
      nombre: faker.person.firstName(),
      grupo_investigacion: 'IMAGINE',
      cedula: faker.number.int(),
      rol: 'Profesor',
      numero_extension: 12345678,
      usuario: null,
      bonos: [],
      clases: [],
    };
    const result = await service.crearUsuario(usuario);
    expect(result).toHaveProperty('id');
    expect(result.nombre).toEqual(usuario.nombre);
  });

  it('crearUsuario debería lanzar un error para grupo de investigación inválido', async () => {
    const usuario: UsuarioEntity = {
      id: undefined,
      nombre: faker.person.firstName(),
      grupo_investigacion: 'INVALIDO',
      cedula: faker.number.int(),
      rol: 'Profesor',
      numero_extension: 12345678,
      usuario: null,
      bonos: [],
      clases: [],
    };
    await expect(service.crearUsuario(usuario)).rejects.toThrow(BadRequestException);
  });

  it('findeUsuarioById debería retornar un usuario por su id', async () => {
    const usuario = usuariosList[0];
    const result = await service.findeUsuarioById(usuario.id);
    expect(result).toBeDefined();
    expect(result.id).toEqual(usuario.id);
  });

  it('findeUsuarioById debería lanzar un error si el usuario no existe', async () => {
    await expect(service.findeUsuarioById(12345678)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('eliminarUsuarioById debería eliminar un usuario sin bonos asociados', async () => {
    const usuario = usuariosList[1];
    await service.eliminarUsuarioById(usuario.id);
    const result = await repository.findOne({ where: { id: usuario.id } });
    expect(result).toBeNull();
  });

  it('eliminarUsuarioById debería lanzar un error si el usuario tiene bonos asociados', async () => {
    const usuario = usuariosList[2];
    await repository.save({
      ...usuario,
      bonos: [{ id: undefined, usuario, descripcion: 'Bono de prueba' }],
    });

    await expect(service.eliminarUsuarioById(usuario.id)).rejects.toThrow(BadRequestException);
  });

  it('eliminarUsuarioById debería lanzar un error si el usuario es Decana', async () => {
    const usuario = await repository.save({
      nombre: faker.person.firstName(),
      grupo_investigacion: 'TICSW',
      cedula: faker.number.int(),
      rol: 'Decana',
      numero_extension: 12345678,
    });

    await expect(service.eliminarUsuarioById(usuario.id)).rejects.toThrow(BadRequestException);
  });
});
