import { MulterFile } from 'src/common/types/public';
import { RoomIdDto } from '../room/dto/room.dto';
import { CleanerService } from './cleaner.service';
import { CreateCleanerDto } from './dto/create-cleaner.dto';
import { UpdateCleanerDto } from './dto/update-cleaner.dto';
export declare class CleanerController {
    private readonly cleanerService;
    constructor(cleanerService: CleanerService);
    create(avatar: MulterFile, createCleanerDto: CreateCleanerDto): Promise<{
        cleaner: import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    findAll(): Promise<{
        cleaners: (import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    startCleaning(param: RoomIdDto, user: Express.User): Promise<{
        message: string;
    }>;
    finishCleaning(param: RoomIdDto, user: Express.User): Promise<{
        message: string;
    }>;
    findOne(id: string): {
        cleaner: Promise<import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>>;
    };
    update(id: string, updateCleanerDto: UpdateCleanerDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
