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
exports.BathroomController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const enums_1 = require("../../common/enums");
const role_enum_1 = require("../../common/enums/role.enum");
const room_dto_1 = require("../room/dto/room.dto");
const bathroom_service_1 = require("./bathroom.service");
const create_bathroom_dto_1 = require("./dto/create-bathroom.dto");
const upload_file_bathroom_interceptor_1 = require("./interceptors/upload-file-bathroom.interceptor");
let BathroomController = class BathroomController {
    constructor(bathroomService) {
        this.bathroomService = bathroomService;
    }
    async saveBathRoomData(files, createBathroomDto, param) {
        createBathroomDto.room = new mongoose_1.Types.ObjectId(param.roomID);
        const result = await this.bathroomService.create(createBathroomDto, files);
        return { message: "save bath-room data successfully" };
    }
    async getBathRoomDetail(param) {
        const roomId = new mongoose_1.Types.ObjectId(param.roomID);
        const bathroom = await this.bathroomService.getBathRoomStatus(roomId);
        return { bathroom };
    }
};
__decorate([
    (0, common_1.Post)("/:roomID"),
    (0, swagger_1.ApiConsumes)(enums_1.SwaggerConsumes.MULTIPART),
    (0, common_1.UseInterceptors)(upload_file_bathroom_interceptor_1.BathRoomFileUpload),
    (0, swagger_1.ApiParam)({ name: "roomID", type: "string", required: true }),
    (0, swagger_1.ApiOperation)({ summary: "checker role access" }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_bathroom_dto_1.CreateBathroomDto,
        room_dto_1.RoomIdDto]),
    __metadata("design:returntype", Promise)
], BathroomController.prototype, "saveBathRoomData", null);
__decorate([
    (0, common_1.Get)("/:roomID"),
    (0, swagger_1.ApiParam)({ name: "roomID", type: "string", required: true }),
    (0, swagger_1.ApiOperation)({ summary: "checker role access" }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [room_dto_1.RoomIdDto]),
    __metadata("design:returntype", Promise)
], BathroomController.prototype, "getBathRoomDetail", null);
BathroomController = __decorate([
    (0, common_1.Controller)('bathroom'),
    (0, swagger_1.ApiTags)("BathRoom"),
    (0, auth_decorator_1.AuthDecorator)(role_enum_1.ROLES.CHECKER, role_enum_1.ROLES.SUPERADMIN),
    __metadata("design:paramtypes", [bathroom_service_1.BathroomService])
], BathroomController);
exports.BathroomController = BathroomController;
//# sourceMappingURL=bathroom.controller.js.map