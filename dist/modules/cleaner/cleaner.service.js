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
exports.CleanerService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const role_enum_1 = require("../../common/enums/role.enum");
const room_status_enum_1 = require("../../common/enums/room-status.enum");
const functions_1 = require("../../common/utils/functions");
const auth_service_1 = require("../auth/services/auth.service");
const cleaning_history_entity_1 = require("../room/entities/cleaning-history.entity");
const user_entity_1 = require("../user/entities/user.entity");
const room_entity_1 = require("../room/entities/room.entity");
const bill_entity_1 = require("../bills/entities/bill.entity");
let CleanerService = class CleanerService {
    constructor(userRepository, cleaningHistoryRepository, billRepository, roomRepository, request, authService) {
        this.userRepository = userRepository;
        this.cleaningHistoryRepository = cleaningHistoryRepository;
        this.billRepository = billRepository;
        this.roomRepository = roomRepository;
        this.request = request;
        this.authService = authService;
    }
    async create(createCleanerDto) {
        const user = this.request.user;
        if (user.role == role_enum_1.ADMIN_ROLES.COMPANYADMIN) {
            createCleanerDto.company = user._id;
            const { hotelID } = createCleanerDto;
            if (hotelID)
                createCleanerDto.hotel = new mongoose_2.Types.ObjectId(hotelID);
        }
        if (user.role == role_enum_1.ADMIN_ROLES.HOTELADMIN)
            createCleanerDto.hotel = user._id;
        createCleanerDto.password = this.authService.hashPassword(createCleanerDto.password);
        createCleanerDto.role = role_enum_1.ROLES.CLEANER;
        const cleaner = await this.userRepository.create(createCleanerDto);
        return cleaner;
    }
    async findAll() {
        const user = this.request.user;
        let filter = { role: role_enum_1.ROLES.CLEANER };
        if (user.role == role_enum_1.ROLES.COMPANYADMIN) {
            filter['company'] = user._id;
        }
        else if (user.role == role_enum_1.ROLES.HOTELADMIN) {
            filter = { hotel: user._id, role: role_enum_1.ROLES.CLEANER };
        }
        else if (user.role === role_enum_1.ROLES.CHECKER) {
            filter = { hotel: user.hotel._id, role: role_enum_1.ROLES.CLEANER };
        }
        else if (user.role == role_enum_1.ROLES.SUPERADMIN || user.role === role_enum_1.ROLES.CHECKER) {
            filter = { role: role_enum_1.ROLES.CLEANER };
        }
        else if (user.role == role_enum_1.ROLES.HOTELRECEPTION) {
            filter['hotel'] = user.hotel;
        }
        else {
            return [];
        }
        if ((user.role != role_enum_1.ROLES.SUPERADMIN) && Object.values(filter).length == 0)
            return [];
        const cleaners = await this.userRepository.find(filter).populate('hotel');
        return cleaners;
    }
    async findOne(id) {
        var _a, _b, _c;
        const cleanerID = new mongoose_2.Types.ObjectId(id);
        const cleaner = await this.userRepository.findOne({ _id: cleanerID, role: role_enum_1.ROLES.CLEANER });
        const bill = await this.billRepository.findOne({
            cleaner: cleanerID,
            checkout: false
        });
        const notCleanedHistory = await this.cleaningHistoryRepository.find({
            cleaner: cleanerID,
            status: room_status_enum_1.ROOM_STATUS.FINISH,
            checkerStatus: room_status_enum_1.ROOM_STATUS.NOT_CLEANED
        });
        const cleanedHistory = await this.cleaningHistoryRepository.find({
            cleaner: cleanerID,
            status: room_status_enum_1.ROOM_STATUS.FINISH,
            checkerStatus: room_status_enum_1.ROOM_STATUS.CLEANED
        });
        if (cleaner)
            return Object.assign(Object.assign({}, cleaner._doc), { billAmount: (_a = bill === null || bill === void 0 ? void 0 : bill.checkoutAmount) !== null && _a !== void 0 ? _a : 0, roomNotCleanedCount: (_b = notCleanedHistory === null || notCleanedHistory === void 0 ? void 0 : notCleanedHistory.length) !== null && _b !== void 0 ? _b : 0, roomCleanedCount: (_c = cleanedHistory === null || cleanedHistory === void 0 ? void 0 : cleanedHistory.length) !== null && _c !== void 0 ? _c : 0 });
        throw new common_1.NotFoundException("cleaner not found");
    }
    async update(id, updateCleanerDto) {
        const cleaner = await this.findOne(id);
        const newCleanerDto = (0, functions_1.removeEmptyFieldsObject)(updateCleanerDto);
        const updatedResult = await this.userRepository.updateOne({ _id: cleaner._id }, {
            $set: newCleanerDto
        });
        if (!!updatedResult.modifiedCount)
            return true;
        throw new common_1.BadRequestException("updated cleaner failed");
    }
    async remove(id) {
        const cleaner = await this.findOne(id);
        const deletedResult = await this.userRepository.deleteOne({ _id: cleaner._id });
        if (!!deletedResult.deletedCount)
            return true;
        throw new common_1.BadRequestException("deleted cleaner failed");
    }
    async startCleaningRoom(roomID) {
        const date = new Date();
        const room = new mongoose_2.Types.ObjectId(roomID);
        const cleaner = this.request.user._id;
        const cleaningStartAt = new Date().toUTCString();
        const roomData = await this.cleaningHistoryRepository.findOne({ room, status: room_status_enum_1.ROOM_STATUS.START });
        if (roomData)
            throw new common_1.BadRequestException("Room cleaning not finished. Please finish cleaning first.");
        const createResult = await this.cleaningHistoryRepository.create({
            cleaner,
            cleaningStartAt,
            room,
            status: room_status_enum_1.ROOM_STATUS.START,
            checkerStatus: "no-status"
        });
        await this.roomRepository.updateOne({ _id: room }, {
            $set: { cleaner }
        });
        return createResult;
    }
    async endCleaningRoom(roomID) {
        const date = new Date();
        const room = new mongoose_2.Types.ObjectId(roomID);
        const cleaner = this.request.user._id;
        const cleaningEndAt = new Date().toUTCString();
        const roomData = await this.cleaningHistoryRepository.findOne({ room, status: room_status_enum_1.ROOM_STATUS.START, cleaner });
        if (!roomData)
            throw new common_1.BadRequestException("not found any room being cleaned");
        const updatedResult = await this.cleaningHistoryRepository.updateOne({ _id: roomData._id }, {
            $set: {
                status: room_status_enum_1.ROOM_STATUS.FINISH,
                cleaningEndAt
            }
        });
        await this.roomRepository.updateOne({ _id: room }, {
            $set: { cleaner }
        });
        return { updatedResult, cleaningEndAt };
    }
    async getCompanyCleaners(companyID) {
        const cleaners = await this.userRepository.find({ company: companyID, role: role_enum_1.ROLES.CLEANER });
        return cleaners;
    }
    async getCompanyCleanerById(cleanerId) {
        const cleaner = await this.userRepository.findOne({ _id: cleanerId, role: role_enum_1.ROLES.CLEANER });
        if (!cleaner)
            throw new common_1.NotFoundException("not found any cleaner");
        return cleaner;
    }
    async getHotelCleaners(hotelID) {
        const cleaners = await this.userRepository.find({ hotel: hotelID, role: role_enum_1.ROLES.CLEANER });
        return cleaners;
    }
    async getHotelCleanerById(cleanerId) {
        const cleaner = await this.userRepository.findOne({ _id: cleanerId, role: role_enum_1.ROLES.CLEANER });
        if (!cleaner)
            throw new common_1.NotFoundException("not found any cleaner");
        return cleaner;
    }
};
CleanerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(cleaning_history_entity_1.CleaningHistory.name)),
    __param(2, (0, mongoose_1.InjectModel)(bill_entity_1.Bill.name)),
    __param(3, (0, mongoose_1.InjectModel)(room_entity_1.Room.name)),
    __param(4, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, Object, auth_service_1.AuthService])
], CleanerService);
exports.CleanerService = CleanerService;
//# sourceMappingURL=cleaner.service.js.map