import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model, Types } from 'mongoose';
import { getObjectFiles, parseValue } from 'src/common/utils/functions';
import { CreateCurtainDto } from './dto/create-curtain.dto';
import { CurtainDto } from './dto/curtain.dto';
import { UpdateCurtainDto } from './dto/update-curtain.dto';
import { Curtain, CurtainDocument } from './entities/curtains.entity';
import { ICurtainFilesUpload } from './interfaces/files.interface';

@Injectable({ scope: Scope.REQUEST })
export class CurtainsService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectModel(Curtain.name) private curtainRepository: Model<CurtainDocument>
  ) { }

  async create(createCurtainDto: CreateCurtainDto & any, files: ICurtainFilesUpload) {
    const { hotel, _id: checker } = this.request.user;
    const curtain = await this.findOneByCheckerAndHotel();
    createCurtainDto = parseValue(createCurtainDto)
    const newFile: any = getObjectFiles(files);
    const newDto: CurtainDto = {
      topQuestion: {
        value: createCurtainDto.topQuestionStatus,
        samplePhoto: newFile.samplePhotoTopQuestion,
      },
      comments: {
        curtainsNotClean: {
          status: createCurtainDto.curtainsNotCleanStatus,
          photos: newFile.curtainsNotCleanPhotos
        },
        curtainsHaveWrinkles: {
          status: createCurtainDto.curtainsHaveWrinklesStatus,
          photos: newFile.curtainsHaveWrinklesPhotos,
        }
      },
      checker,
      hotel: new Types.ObjectId(hotel),
      damage: {
        text: createCurtainDto.DamageReportText,
        photos: newFile.DamageReportPhotos
      }
    }
    if (curtain) {
      const updatedResult = await this.curtainRepository.updateOne({ _id: curtain._id }, { $set: newDto })
    } else {
      const createdResult = await this.curtainRepository.create(newDto)
    }
    return true
  }

  async getFloorStatus() {
    const curtain = await this.findOneByCheckerAndHotel();
    if (curtain) return curtain;
    throw new NotFoundException("still not fill floor status")
  }

  async findOneByCheckerAndHotel() {
    const { hotel, _id: checker } = this.request.user;
    const curtain = await this.curtainRepository.findOne({ hotel, checker });
    return curtain;
  }
}