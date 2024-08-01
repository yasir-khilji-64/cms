import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from '../schemas/tag.schema';
import { Model, PipelineStage } from 'mongoose';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async create(details: CreateTagDto): Promise<TagDocument> {
    const result = await this.tagModel.create([details]);
    return result[0];
  }

  async find(): Promise<TagDocument[]> {
    const query: PipelineStage[] = [
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: '$name',
          picture: '$picture',
          created_at: '$created_at',
          updated_at: '$updated_at',
        },
      },
    ];
    return await this.tagModel.aggregate<TagDocument>(query);
  }
}
