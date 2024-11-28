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
exports.EstudianteController = void 0;
const common_1 = require("@nestjs/common");
const estudiante_service_1 = require("./estudiante.service");
const estudiante_entity_1 = require("./estudiante.entity/estudiante.entity");
let EstudianteController = class EstudianteController {
    constructor(estudianteService) {
        this.estudianteService = estudianteService;
    }
    async crearEstudiante(estudiante) {
        return this.estudianteService.crearEstudiante(estudiante);
    }
    async findeEstudianteById(id) {
        return await this.estudianteService.findeEstudianteById(id);
    }
};
exports.EstudianteController = EstudianteController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [estudiante_entity_1.EstudianteEntity]),
    __metadata("design:returntype", Promise)
], EstudianteController.prototype, "crearEstudiante", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EstudianteController.prototype, "findeEstudianteById", null);
exports.EstudianteController = EstudianteController = __decorate([
    (0, common_1.Controller)('estudiante'),
    __metadata("design:paramtypes", [estudiante_service_1.EstudianteService])
], EstudianteController);
//# sourceMappingURL=estudiante.controller.js.map