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
exports.AdminRoomService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const room_entity_1 = require("./entities/room.entity");
let AdminRoomService = class AdminRoomService {
    constructor(adminRoomRepository) {
        this.adminRoomRepository = adminRoomRepository;
    }
    async create(createRoomDto) {
        createRoomDto.level = new mongoose_2.Types.ObjectId(createRoomDto.level);
        const createdResult = await this.adminRoomRepository.create(createRoomDto);
        return createdResult;
    }
    async findAll(filter = {}) {
        const rooms = await this.adminRoomRepository.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "levels",
                    foreignField: "_id",
                    localField: "level",
                    as: "level"
                },
            },
            {
                $lookup: {
                    from: "bathrooms",
                    foreignField: "room",
                    localField: "_id",
                    as: "bathroom"
                },
            },
            {
                $lookup: {
                    from: "beds",
                    foreignField: "room",
                    localField: "_id",
                    as: "bed"
                },
            },
            {
                $lookup: {
                    from: "floors",
                    foreignField: "room",
                    localField: "_id",
                    as: "floor"
                },
            },
            {
                $lookup: {
                    from: "shelves",
                    foreignField: "room",
                    localField: "_id",
                    as: "floor"
                },
            },
            {
                $lookup: {
                    from: "curtains",
                    foreignField: "room",
                    localField: "_id",
                    as: "curtain"
                },
            },
            {
                $unwind: "$level"
            },
            {
                $unwind: {
                    path: "$bathroom",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$bed",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$floor",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$shelves",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$curtain",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    "level.__v": 0,
                    "level.hotel": 0,
                    __v: 0
                }
            }
        ]);
        return rooms;
    }
    async findOne(id) {
        var _a;
        const room = (_a = (await this.findAll({ _id: new mongoose_2.Types.ObjectId(id) }))) === null || _a === void 0 ? void 0 : _a[0];
        if (!room)
            throw new common_1.NotFoundException("Not found any room ");
        return room;
    }
    async update(id, updateRoomDto) {
        const room = await this.findOne(id);
        const updatedResult = await this.adminRoomRepository.updateOne({ _id: id }, {
            $set: updateRoomDto
        });
        if (updatedResult.modifiedCount == 0)
            throw new common_1.BadRequestException("updated failed");
        return updatedResult;
    }
    async remove(id) {
        const deletedResult = await this.adminRoomRepository.deleteOne({ _id: id });
        if (deletedResult.deletedCount == 0)
            throw new common_1.BadRequestException("deleted was failed");
        return deletedResult;
    }
};
AdminRoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(room_entity_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AdminRoomService);
exports.AdminRoomService = AdminRoomService;
//# sourceMappingURL=room.service.js.map