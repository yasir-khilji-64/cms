import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { DataAPIResponse } from 'src/types/api-response.type';
import { CategoryDocument } from '../schemas/category.schema';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() details: CreateCategoryDto,
  ): Promise<DataAPIResponse<CategoryDocument>> {
    const category = await this.categoriesService.create(details);
    return {
      statusCode: HttpStatus.CREATED,
      data: category,
    };
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async find(): Promise<DataAPIResponse<CategoryDocument[]>> {
    const categories = await this.categoriesService.find();
    return {
      statusCode: HttpStatus.OK,
      data: categories,
    };
  }
}
