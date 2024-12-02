import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { BonoService } from './bono.service';
import { BonoEntity } from './bono.entity/bono.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker, tr } from '@faker-js/faker';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';
import { ClaseEntity } from '../clase/clase.entity/clase.entity';
import exp from 'constants';
import { error } from 'console';
import { NotFoundError } from 'rxjs';

describe('BonoService', () => {
  let service: BonoService;
  let bonorepository: Repository<BonoEntity>;
  let usuarioRepository: Repository<UsuarioEntity>;
  let claseRepository: Repository<ClaseEntity>;
  let bonosList: BonoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [BonoService],
    }).compile();

    service = module.get<BonoService>(BonoService);
    bonorepository = module.get<Repository<BonoEntity>>(getRepositoryToken(BonoEntity));
    usuarioRepository = module.get<Repository<UsuarioEntity>>(getRepositoryToken(UsuarioEntity));
    claseRepository = module.get<Repository<ClaseEntity>>(getRepositoryToken(ClaseEntity));
    await seedDataBase();
  });

  const seedDataBase = async () => {
    await bonorepository.clear();
    await usuarioRepository.clear();
    await claseRepository.clear();
    
    const usuario = await usuarioRepository.save({
      nombre: faker.name.firstName(),
      grupo_investigacion: 'TICSW',
      cedula: faker.number.int(),
      rol: 'Profesor',
      numero_extension: faker.number.int(),
    });

    const clase = await claseRepository.save({
      codigo: 'CL123',
      nombre: faker.lorem.words(5),
      numero_creditos: 3,
    });

    await bonorepository.save({
      monto: 100,
      calificacion: 3,
      palabra_clave: faker.lorem.words(5),
      usuario,
      clase,
    });

    for (let i = 0; i < 2; i++) {
      await bonorepository.save({
        monto: faker.number.int(),
        calificacion: faker.number.int(),
        palabra_clave: faker.lorem.words(5),
        usuario : usuario,
        clase: clase,
      });
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearBono debería crear un bono válido', async () => {
    const usuario = await usuarioRepository.findOneBy({ rol: 'Profesor' });
    const clase = await claseRepository.findOneBy({ codigo: 'CL123' });
    const bono: BonoEntity = {
      id:1,
      monto: 500,
      calificacion: 4,
      palabra_clave: 'nuevo',
      usuario,
      clase,
    }


    const result = await service.crearBono(bono);
    expect(result).toHaveProperty('id');
    expect(result.monto).toEqual(bono.monto);
    expect(result.palabra_clave).toEqual(bono.palabra_clave);
  });

  it('crearBono debería lanzar un error si el monto es menor o igual a 0', async () => {
    const bono: BonoEntity = {
      id: undefined,
      monto: 0, // Invalid monto
      calificacion: 3,
      palabra_clave: 'nuevo',
      usuario: null,
      clase: null,
    };

    await expect(service.crearBono(bono)).rejects.toThrow(TypeError);
  });

  it('findBonosByClaseCodigo debería retornar bonos por el código de clase', async () => {
    const bonos = await service.findBonosByClaseCodigo('CL123');
    expect(bonos.length).toBeGreaterThan(0);}
  );

  it('findBonosByClaseCodigo pero la clase no existe', async () => {
    try {
      await service.findBonosByClaseCodigo('CL9999');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toEqual('Clase no encontrada');
    }
    
  });

  it('todos los bonos de un usuario', async () => {
    const usuario = await usuarioRepository.findOneBy({ rol: 'Profesor' });
    const bonos = await service.findAllBonosByUsuario(usuario.id);
    expect(bonos).toHaveLength(3);
  });

  it('deleteBono debería eliminar un bono', async () => {
    const bono = await bonorepository.findOneBy({ calificacion: 3});  // Asegúrate de que el bono exista
    await service.deleteBono(bono.id);
    const result = await bonorepository.findOneBy({ id: bono.id });
    expect(result).toBeNull();
  });

  it('deleteBono debería lanzar un error si el bono tiene calificación mayor a 4', async () => {
    const bono = await bonorepository.save({
      monto: 400,
      calificacion: 5, // Invalid calificacion
      palabra_clave: 'calificación alta',
      usuario: await usuarioRepository.findOneBy({ rol: 'Profesor' }),
      clase: await claseRepository.findOneBy({ codigo: 'CL123' }),
    });

    try {
      await service.deleteBono(bono.id);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toEqual('No se puede eliminar un bono con calificación mayor a 4');}
  });

});
