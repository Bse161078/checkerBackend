import {Body, Controller, Delete, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {HotelService} from './hotel.service';
import {AddCompanyToHotel, CreateHotelDto} from './dto/create-hotel.dto';
import {ApiConsumes, ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import {SwaggerConsumes} from 'src/common/enums';
import {AuthDecorator} from 'src/common/decorators/auth.decorator';
import {ROLES} from 'src/common/enums/role.enum';
import {
    CreateHotelCheckerDto,
    CreateHotelCleanerDto,
    CreateHotelReceptionDto,
    HotelDto,
    UpdateHotelLogoDto
} from './dto/hotel.dto';
import {MulterFile} from 'src/common/types/public';
import {Roles} from 'src/common/decorators/role.decorator';
import {HotelLogoUpload} from "./interceptors/upload-file-bathroom.interceptor";
import {LogoFileUploadDto} from "./interface/files.interface";
import {getObjectFiles} from "../../common/utils/functions";
import {UploadImageInterceptor} from "../../common/interceptors/file-upload.interceptor";

@Controller('hotel')
@ApiTags("hotel-supperAdmin")
@AuthDecorator(ROLES.SUPERADMIN,ROLES.HOTELADMIN)
export class HotelController {
    constructor(private readonly hotelService: HotelService) {
    }

    @Post()
    @ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
    @UseInterceptors(UploadImageInterceptor('avatar'))
    @ApiOperation({summary: "supper-admin role access"})
    async create(@UploadedFile() avatar: MulterFile,@Body() createHotelDto: CreateHotelDto) {
        if(avatar) createHotelDto.avatar = avatar.path.slice(7);

        const hotel = await this.hotelService.create(createHotelDto);
        return {
            message: "created hotel account successfully"
        }
    }

    @Post("/add-company-to-hotel/:hotelID")
    @ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
    @ApiOperation({summary: "supper-admin and hotel-admin role access"})
    @Roles(ROLES.SUPERADMIN, ROLES.HOTELADMIN)
    @ApiParam({name: "hotelID"})
    async addCompanyToHotel(@Param('hotelID') hotelID: string, @Body() addCompanyDto: AddCompanyToHotel) {
        await this.hotelService.addCompanyToHotel(hotelID, addCompanyDto);
        return {
            message: "added company account to hotel successfully"
        }
    }

    @Post("/create-hotel-cleaner")
    @ApiConsumes(SwaggerConsumes.MULTIPART)
    @ApiOperation({summary: "supper-admin role access"})
    @UseInterceptors(UploadImageInterceptor('avatar'))
    async createHotelCleaner(@UploadedFile()avatar: MulterFile, @Body() createCleanerDto: CreateHotelCleanerDto) {
        if (avatar) createCleanerDto.avatar = avatar.path.slice(7);
        const cleaner = await this.hotelService.createCleaner(createCleanerDto);
        return {
            message: "created hotel cleaner account successfully"
        }
    }

    @Post("/create-hotel-reception")
    @UseInterceptors(UploadImageInterceptor('avatar'))
    @ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
    @ApiOperation({summary: "supper-admin and hotel-admin role access"})
    @Roles(ROLES.SUPERADMIN, ROLES.HOTELADMIN)
    async createHotelReception(@Body() createReceptionDto: CreateHotelReceptionDto) {
        const reception = await this.hotelService.createReception(createReceptionDto);
        return {
            message: "created hotel reception account successfully"
        }
    }

    @Post("/create-hotel-checker")
    @ApiConsumes(SwaggerConsumes.MULTIPART)
    @ApiOperation({summary: "supper-admin role access"})
    @UseInterceptors(UploadImageInterceptor('avatar'))
    async createHotelChecker(@UploadedFile()avatar: MulterFile, @Body() createCheckerDto: CreateHotelCheckerDto) {
        if (avatar) createCheckerDto.avatar = avatar.path.slice(7);
        const cleaner = await this.hotelService.createChecker(createCheckerDto);
        return {
            message: "created hotel checker account successfully"
        }
    }

    @Get()
    @ApiOperation({summary: "supper-admin role access"})
    async findAll() {
        const hotels = await this.hotelService.findAll();
        return {
            hotels
        }
    }

    @Get("/receptions/:hotelId")
    @ApiOperation({summary: "supper-admin admin hotel-admin role access"})
    @ApiParam({name: "hotelId", type: "string"})
    async receptions(@Param() hotelDto: HotelDto) {
        const receptions = await this.hotelService.receptions(hotelDto.hotelId);
        return {
            receptions
        }
    }

    @Get(':hotelID')
    @ApiOperation({summary: "supper-admin role access"})
    @ApiParam({name: "hotelID", type: "string"})
    async findOne(@Param() hotelDto: HotelDto) {
        const hotel = await this.hotelService.findOne(hotelDto.hotelId);
        return {
            hotel
        }
    }

    @Delete(':hotelId')
    @ApiParam({name: "hotelId", type: "string"})
    @ApiOperation({summary: "supper-admin role access"})
    async remove(@Param() hotelDto: HotelDto) {
        const deletedResult = await this.hotelService.remove(hotelDto.hotelId);
        return {
            message: "deleted hotel successfully"
        }
    }


    @Post("/logo")
    @ApiConsumes(SwaggerConsumes.MULTIPART)
    @UseInterceptors(HotelLogoUpload)
    @ApiOperation({summary: "update hotel logo"})
    @Roles(ROLES.SUPERADMIN, ROLES.HOTELADMIN,ROLES.HOTELRECEPTION)
    async updateHotelLogo(@UploadedFiles() logo: LogoFileUploadDto,@Body() updateHotelLogoDto: UpdateHotelLogoDto) {
        let hotelLogo="";
        const newFile: any = getObjectFiles(logo);

        const cleaner = await this.hotelService.updateHotelLogo(newFile.logo[0]);
        return {
            message: "logo updated"
        }
    }


    @Get(':hotelId/logo')
    @ApiOperation({summary: "supper-admin role access"})
    @ApiParam({name: "hotelID", type: "string"})
    @Roles(ROLES.SUPERADMIN, ROLES.HOTELADMIN,ROLES.HOTELRECEPTION)
    async findHotelLogo(@Param() hotelDto: HotelDto) {
        const hotel = await this.hotelService.findHotelLogo(hotelDto.hotelId);
        return {
            hotel
        }
    }


    @Get('/report')
    @ApiOperation({summary: "supper-admin role access"})
    @ApiParam({name: "hotelID", type: "string"})
    @Roles(ROLES.SUPERADMIN, ROLES.HOTELADMIN)
    async getHotelReport(@Param() hotelDto: HotelDto) {
        const cleaners = await this.hotelService.generateReport(hotelDto.hotelId);
        return {
            cleaners
        }
    }
}
