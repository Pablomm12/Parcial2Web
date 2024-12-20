"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bono_entity_1 = require("./bono.entity/bono.entity");
const rxjs_1 = require("rxjs");
let BonoService = class BonoService {
    constructor(bonoRepository) {
        this.bonoRepository = bonoRepository;
    }
    async crearBono(bono) {
        const usuario = bono.usuario;
        if (!bono.monto || bono.monto <= 0) {
            throw new common_1.BadRequestException('El monto debe ser positivo y no vacío');
        }
        if (!usuario.rol.includes("Profesor")) {
            throw new common_1.BadRequestException('El usuario debe tener rol de profesor');
        }
        return await this.bonoRepository.save(bono);
    }
    async findBonosByClaseCodigo(codigo) {
        return this.bonoRepository.find({
            where: { clase: { codigo } },
            relations: ['clase']
        });
    }
    async findAllBonosByUsuario(id) {
        return this.bonoRepository.find({
            where: { usuario: { id: id } },
            relations: ['usuario']
        });
    }
    async deleteBono(id) {
        const bono = await this.bonoRepository.findOne({ where: { id } });
        if (!bono) {
            throw new rxjs_1.NotFoundError('Bono no encontrado');
        }
        if (Number(bono.calificacion) > 4) {
            throw new common_1.BadRequestException('No se puede eliminar un bono con calificación mayor a 4');
        }
        await this.bonoRepository.remove(bono);
    }
};
exports.BonoService = BonoService;
exports.BonoService = BonoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bono_entity_1.BonoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BonoService);
//# sourceMappingURL=bono.service.js.map