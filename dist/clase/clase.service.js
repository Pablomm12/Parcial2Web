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
exports.ClaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const clase_entity_1 = require("./clase.entity/clase.entity");
let ClaseService = class ClaseService {
    constructor(claseRepository) {
        this.claseRepository = claseRepository;
    }
    async crearClase(clase) {
        if (!clase.codigo || clase.codigo.length !== 10) {
            throw new common_1.BadRequestException('El código debe tener 10 caracteres');
        }
        return await this.claseRepository.save(clase);
    }
    async findClaseById(id) {
        return this.claseRepository.findOne({ where: { id } });
    }
};
exports.ClaseService = ClaseService;
exports.ClaseService = ClaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clase_entity_1.ClaseEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClaseService);
//# sourceMappingURL=clase.service.js.map