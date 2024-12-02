import { Test, TestingModule } from '@nestjs/testing';
import { ClaseService } from './clase.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseEntity } from './clase.entity/clase.entity';
import { BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BonoEntity } from '../bono/bono.entity/bono.entity';

describe('ClaseService', () => {
  let service: ClaseService;
  let claserepository: Repository<ClaseEntity>;
  let bonorepository: Repository<BonoEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ClaseService],
    }).compile();

    service = module.get<ClaseService>(ClaseService);
    bonorepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    claserepository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));
    await seedDataBase();
  });

  const seedDataBase = async () => {
    await claserepository.clear();
    await usuarioRepository.clear();
    await bonorepository.clear();

    const usuario = await usuarioRepository.save({
      nombre: faker.name.firstName(),
      grupo_investigacion: 'TICSW',
      cedula: faker.number.int(),
      rol: 'Profesor',
      numero_extension: faker.number.int(),
    }); 

    for (let i = 0; i < 5; i++) {
        await claserepository.save({
          codigo: 'CL12345678',
          nombre: faker.lorem.words(5),
          numero_creditos: 3,
          usuario,
          bonos: [],
        });
    }
  };


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearClase debería crear una clase con un código válido', async () => {
    const usuario = await usuarioRepository.findOneBy({ rol: 'Profesor' });
    const clase: ClaseEntity = {
      id: undefined,
      codigo: 'CL12345678',
      nombre: faker.lorem.word(),
      numero_creditos: 3,
      usuario: usuario,
      bonos: [],
    };
    const result = await service.crearClase(clase);
    expect(result).toHaveProperty('id');
    expect(result.nombre).toEqual(clase.nombre);
  });

  it('crearClase debería lanzar un error si el código tiene menos de 10 caracteres', async () => {
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
    const clase: ClaseEntity = {
      id: undefined,
      codigo: 'ABC', // Código válido de 10 caracteres
      nombre: faker.lorem.word(),
      numero_creditos: 3,
      usuario: usuario,
      bonos: [],
    };
    await expect(service.crearClase(clase)).rejects.toThrow(BadRequestException);
    await expect(service.crearClase(clase)).rejects.toThrow('El código debe tener 10 caracteres');
  });

  it('findClaseById debería retornar una clase por su id', async () => {
    const clase = await claserepository.findOneBy({ codigo: 'CL12345678' });
    expect(clase).toBeDefined();
  });
});
