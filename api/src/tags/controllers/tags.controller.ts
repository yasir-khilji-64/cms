import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from '../services/tags.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DataAPIResponse } from 'src/types/api-response.type';
import { TagDocument } from '../schemas/tag.schema';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Controller('tags')
@ApiTags('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async find(): Promise<DataAPIResponse<TagDocument[]>> {
    const tags = await this.tagsService.find();
    return {
      statusCode: HttpStatus.OK,
      data: tags,
    };
  }

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() details: CreateTagDto,
  ): Promise<DataAPIResponse<TagDocument>> {
    const tag = await this.tagsService.create(details);
    return {
      statusCode: HttpStatus.CREATED,
      data: tag,
    };
  }
}
