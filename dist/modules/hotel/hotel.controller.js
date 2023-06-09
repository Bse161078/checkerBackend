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
exports.HotelController = void 0;
const common_1 = require("@nestjs/common");
const hotel_service_1 = require("./hotel.service");
const create_hotel_dto_1 = require("./dto/create-hotel.dto");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../common/enums");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const role_enum_1 = require("../../common/enums/role.enum");
const hotel_dto_1 = require("./dto/hotel.dto");
const role_decorator_1 = require("../../common/decorators/role.decorator");
const upload_file_bathroom_interceptor_1 = require("./interceptors/upload-file-bathroom.interceptor");
const functions_1 = require("../../common/utils/functions");
const file_upload_interceptor_1 = require("../../common/interceptors/file-upload.interceptor");
let HotelController = class HotelController {
    constructor(hotelService) {
        this.hotelService = hotelService;
    }
    async create(avatar, createHotelDto) {
        if (avatar)
            createHotelDto.avatar = avatar.path.slice(7);
        const hotel = await this.hotelService.create(createHotelDto);
        return {
            message: "created hotel account successfully"
        };
    }
    async addCompanyToHotel(hotelID, addCompanyDto) {
        await this.hotelService.addCompanyToHotel(hotelID, addCompanyDto);
        return {
            message: "added company account to hotel successfully"
        };
    }
    async createHotelCleaner(avatar, createCleanerDto) {
        if (avatar)
            createCleanerDto.avatar = avatar.path.slice(7);
        const cleaner = await this.hotelService.createCleaner(createCleanerDto);
        return {
            message: "created hotel cleaner account successfully"
        };
    }
    async createHotelReception(createReceptionDto) {
        const reception = await this.hotelService.createReception(createReceptionDto);
        return {
            message: "created hotel reception account successfully"
        };
    }
    async createHotelChecker(avatar, createCheckerDto) {
        if (avatar)
            createCheckerDto.avatar = avatar.path.slice(7);
        const cleaner = await this.hotelService.createChecker(createCheckerDto);
        return {
            message: "created hotel checker account successfully"
        };
    }
    async findAll() {
        const hotels = await this.hotelService.findAll();
        return {
            hotels
        };
    }
    async receptions(hotelDto) {
        const receptions = await this.hotelService.receptions(hotelDto.hotelId);
        return {
            receptions
        };
    }
    async findOne(hotelDto) {
        const hotel = await this.hotelService.findOne(hotelDto.hotelId);
        return {
            hotel
        };
    }
    async remove(hotelDto) {
        const deletedResult = await this.hotelService.remove(hotelDto.hotelId);
        return {
            message: "deleted hotel successfully"
        };
    }
    async updateHotelLogo(logo, updateHotelLogoDto) {
        let hotelLogo = "";
        const newFile = (0, functions_1.getObjectFiles)(logo);
        const cleaner = await this.hotelService.updateHotelLogo(newFile.logo[0]);
        return {
            message: "logo updated"
        };
    }
    async findHotelLogo(hotelDto) {
        const hotel = await this.hotelService.findHotelLogo(hotelDto.hotelId);
        return {
            hotel
        };
    }
    async getHotelReport(hotelDto) {
        const cleaners = await this.hotelService.generateReport(hotelDto.hotelId);
        return {
            cleaners
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)(enums_1.SwaggerConsumes.URL_ENCODED, enums_1.SwaggerConsumes.JSON),
    (0, common_1.UseInterceptors)((0, file_upload_interceptor_1.UploadImageInterceptor)('avatar')),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin role access" }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_hotel_dto_1.CreateHotelDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/add-company-to-hotel/:hotelID"),
    (0, swagger_1.ApiConsumes)(enums_1.SwaggerConsumes.URL_ENCODED, enums_1.SwaggerConsumes.JSON),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin and hotel-admin role access" }),
    (0, role_decorator_1.Roles)(role_enum_1.ROLES.SUPERADMIN, role_enum_1.ROLES.HOTELADMIN),
    (0, swagger_1.ApiParam)({ name: "hotelID" }),
    __param(0, (0, common_1.Param)('hotelID')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_hotel_dto_1.AddCompanyToHotel]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "addCompanyToHotel", null);
__decorate([
    (0, common_1.Post)("/create-hotel-cleaner"),
    (0, swagger_1.ApiConsumes)(enums_1.SwaggerConsumes.MULTIPART),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin role access" }),
    (0, common_1.UseInterceptors)((0, file_upload_interceptor_1.UploadImageInterceptor)('avatar')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, hotel_dto_1.CreateHotelCleanerDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "createHotelCleaner", null);
__decorate([
    (0, common_1.Post)("/create-hotel-reception"),
    (0, common_1.UseInterceptors)((0, file_upload_interceptor_1.UploadImageInterceptor)('avatar')),
    (0, swagger_1.ApiConsumes)(enums_1.SwaggerConsumes.URL_ENCODED, enums_1.SwaggerConsumes.JSON),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin and hotel-admin role access" }),
    (0, role_decorator_1.Roles)(role_enum_1.ROLES.SUPERADMIN, role_enum_1.ROLES.HOTELADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_dto_1.CreateHotelReceptionDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "createHotelReception", null);
__decorate([
    (0, common_1.Post)("/create-hotel-checker"),
    (0, swagger_1.ApiConsumes)(enums_1.SwaggerConsumes.MULTIPART),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin role access" }),
    (0, common_1.UseInterceptors)((0, file_upload_interceptor_1.UploadImageInterceptor)('avatar')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, hotel_dto_1.CreateHotelCheckerDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "createHotelChecker", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin role access" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/receptions/:hotelId"),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin admin hotel-admin role access" }),
    (0, swagger_1.ApiParam)({ name: "hotelId", type: "string" }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_dto_1.HotelDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "receptions", null);
__decorate([
    (0, common_1.Get)(':hotelID'),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin role access" }),
    (0, swagger_1.ApiParam)({ name: "hotelID", type: "string" }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_dto_1.HotelDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':hotelId'),
    (0, swagger_1.ApiParam)({ name: "hotelId", type: "string" }),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin role access" }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_dto_1.HotelDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("/logo"),
    (0, swagger_1.ApiConsumes)(enums_1.SwaggerConsumes.MULTIPART),
    (0, common_1.UseInterceptors)(upload_file_bathroom_interceptor_1.HotelLogoUpload),
    (0, swagger_1.ApiOperation)({ summary: "update hotel logo" }),
    (0, role_decorator_1.Roles)(role_enum_1.ROLES.SUPERADMIN, role_enum_1.ROLES.HOTELADMIN, role_enum_1.ROLES.HOTELRECEPTION),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, hotel_dto_1.UpdateHotelLogoDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "updateHotelLogo", null);
__decorate([
    (0, common_1.Get)(':hotelId/logo'),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin role access" }),
    (0, swagger_1.ApiParam)({ name: "hotelID", type: "string" }),
    (0, role_decorator_1.Roles)(role_enum_1.ROLES.SUPERADMIN, role_enum_1.ROLES.HOTELADMIN, role_enum_1.ROLES.HOTELRECEPTION),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_dto_1.HotelDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "findHotelLogo", null);
__decorate([
    (0, common_1.Get)('/report'),
    (0, swagger_1.ApiOperation)({ summary: "supper-admin role access" }),
    (0, swagger_1.ApiParam)({ name: "hotelID", type: "string" }),
    (0, role_decorator_1.Roles)(role_enum_1.ROLES.SUPERADMIN, role_enum_1.ROLES.HOTELADMIN),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hotel_dto_1.HotelDto]),
    __metadata("design:returntype", Promise)
], HotelController.prototype, "getHotelReport", null);
HotelController = __decorate([
    (0, common_1.Controller)('hotel'),
    (0, swagger_1.ApiTags)("hotel-supperAdmin"),
    (0, auth_decorator_1.AuthDecorator)(role_enum_1.ROLES.SUPERADMIN, role_enum_1.ROLES.HOTELADMIN),
    __metadata("design:paramtypes", [hotel_service_1.HotelService])
], HotelController);
exports.HotelController = HotelController;
//# sourceMappingURL=hotel.controller.js.map