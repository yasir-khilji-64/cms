import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { roles } from './data.seed';

@Injectable()
export class SeedService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create() {
    try {
      await this.roleModel.deleteMany({});
      await this.roleModel.create(roles);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
