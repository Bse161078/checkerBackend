import { MulterFile } from 'src/common/types/public';
import { RoomIdDto } from '../company/room/dto/room.dto';
import { CleanerService } from './cleaner.service';
import { CreateCleanerDto } from './dto/create-cleaner.dto';
import { UpdateCleanerDto } from './dto/update-cleaner.dto';
import { CleanerIdDto, CompanyIdDto, HotelIdDto } from './dto/cleaner.dto';
export declare class CleanerController {
    private readonly cleanerService;
    constructor(cleanerService: CleanerService);
    create(avatar: MulterFile, createCleanerDto: CreateCleanerDto): Promise<{
        cleaner: import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    findAll(): Promise<{
        cleaners: Omit<import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>, never>[];
    }>;
    startCleaning(param: RoomIdDto, user: Express.User): Promise<{
        message: string;
    }>;
    finishCleaning(param: RoomIdDto, user: Express.User): Promise<{
        message: string;
    }>;
    getCleanerCompany(param: CompanyIdDto, user: Express.User): Promise<{
        cleaners: (import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getCleanerCompanyById(param: CleanerIdDto, user: Express.User): Promise<{
        cleaner: import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getCleanerHotel(param: HotelIdDto, user: Express.User): Promise<{
        cleaners: (import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    getCleanerHotelById(param: CleanerIdDto, user: Express.User): Promise<{
        cleaner: import("mongoose").Document<unknown, any, import("../user/entities/user.entity").UserDocument> & import("../user/entities/user.entity").User & Document & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    findOne(cleanerIdDto: CleanerIdDto): Promise<{
        cleaner: any;
    }>;
    update(cleanerIdDto: CleanerIdDto, updateCleanerDto: UpdateCleanerDto): Promise<{
        message: string;
    }>;
    remove(cleanerIdDto: CleanerIdDto): Promise<{
        message: string;
    }>;
}
