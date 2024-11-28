"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const estudiante_entity_1 = require("./estudiante/estudiante.entity/estudiante.entity");
const usuario_entity_1 = require("./usuario/usuario.entity/usuario.entity");
const bono_entity_1 = require("./bono/bono.entity/bono.entity");
const clase_entity_1 = require("./clase/clase.entity/clase.entity");
const estudiante_module_1 = require("./estudiante/estudiante.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [estudiante_module_1.EstudianteModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'pablo123',
                database: 'Parcial2',
                entities: [usuario_entity_1.UsuarioEntity, bono_entity_1.BonoEntity, clase_entity_1.ClaseEntity, estudiante_entity_1.EstudianteEntity],
                dropSchema: true,
                synchronize: true,
                keepConnectionAlive: true
            }),],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map