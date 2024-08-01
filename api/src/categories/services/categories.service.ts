import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { Model, PipelineStage } from 'mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(details: CreateCategoryDto): Promise<CategoryDocument> {
    const result = await this.categoryModel.create([details]);
    return result[0];
  }

  async find(): Promise<CategoryDocument[]> {
    const query: PipelineStage[] = [
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$name',
          picture: '$picture',
          description: '$description',
          created_at: '$created_at',
          updated_at: '$updated_at',
        },
      },
    ];
    return await this.categoryModel.aggregate<CategoryDocument>(query);
  }
}
