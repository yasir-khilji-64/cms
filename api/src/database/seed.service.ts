import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { tags, users } from './data.seed';
import { Tag, TagDocument } from 'src/tags/schemas/tag.schema';
import {
  Category,
  CategoryDocument,
} from 'src/categories/schemas/category.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Tag.name) private tagModel: Model<TagDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create() {
    try {
      await this.userModel.deleteMany({});
      await this.userModel.create(users);
      await this.tagModel.deleteMany({});
      await this.tagModel.create(tags);
      await this.categoryModel.deleteMany({});
      await this.categoryModel.create(tags);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
