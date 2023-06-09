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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateBedDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false, type: "boolean", }),
    __metadata("design:type", Boolean)
], CreateBedDto.prototype, "topQuestionStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "array", items: { type: "string", format: "binary" } }),
    __metadata("design:type", Array)
], CreateBedDto.prototype, "samplePhotoTopQuestion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], CreateBedDto.prototype, "bedDoesNotLookFreshStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "array", items: { type: "string", format: "binary" } }),
    __metadata("design:type", Array)
], CreateBedDto.prototype, "bedDoesNotLookFreshPhotos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], CreateBedDto.prototype, "isMadeUpStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "array", items: { type: "string", format: "binary" } }),
    __metadata("design:type", Array)
], CreateBedDto.prototype, "isMadeUpPhotos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], CreateBedDto.prototype, "bedSheetInNotProperlyTightenedStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "array", items: { type: "string", format: "binary" } }),
    __metadata("design:type", Array)
], CreateBedDto.prototype, "bedSheetInNotProperlyTightenedPhotos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "boolean" }),
    __metadata("design:type", Boolean)
], CreateBedDto.prototype, "extraBedStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "array", items: { type: "string", format: "binary" } }),
    __metadata("design:type", Array)
], CreateBedDto.prototype, "extraBedPhotos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CreateBedDto.prototype, "DamageReportText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: "array", items: { type: "string", format: "binary" } }),
    __metadata("design:type", Array)
], CreateBedDto.prototype, "DamageReportPhotos", void 0);
exports.CreateBedDto = CreateBedDto;
//# sourceMappingURL=create-bed.dto.js.map