import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AdminRoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { ROLES } from 'src/common/enums/role.enum';
import { SwaggerConsumes } from 'src/common/enums';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('room')
@ApiTags("Admin-room")
@AuthDecorator(ROLES.HOTELADMIN, ROLES.HOTELRECEPTION)
export class AdminRoomController {
  constructor(private readonly roomService: AdminRoomService) { }

  @Post()
  @ApiOperation({summary: "hotel and hotelReception role access"})
  @ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
  async create(@Body() createRoomDto: CreateRoomDto) {
    const createdResult = await this.roomService.create(createRoomDto);
    return {
      message: "created room successfully"
    }
  }
  
  @Get()
  @Roles()
  @ApiOperation({summary: "hotel and hotelReception role access"})
  async findAll() {
    const rooms = await this.roomService.findAll();
    return {
      rooms
    }
  }
  
  @Get(':id')
  @ApiOperation({summary: "hotel and hotelReception role access"})
  @ApiParam({ name: "id", type: "string" })
  async findOne(@Param('id') id: string) {
    const room = await this.roomService.findOne(id);
    return {
      room
    }
  }
  
  @Patch(':id')
  @ApiOperation({summary: "hotel and hotelReception role access"})
  @ApiParam({ name: "id", type: "string" })
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const updatedResult = await this.roomService.update(id, updateRoomDto);
    return {
      message: "updated was successfully"
    }
  }
  
  @Delete(':id')
  @ApiParam({ name: "id", type: "string" })
  @ApiOperation({summary: "hotel and hotelReception role access"})
  async remove(@Param('id') id: string) {
    const deletedResult = await this.roomService.remove(id);
    return {
      message: "deleted room successfully"
    }
  }
  
  @Get('cleaner-bills')
  @ApiOperation({summary: "hotel and hotelReception role access"})
  async getCleanerBills(){
    // const bill
  }
}
