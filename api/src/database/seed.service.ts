import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from 'src/roles/schemas/role.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { users } from './data.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create() {
    try {
      await this.userModel.deleteMany({});
      await this.userModel.create(users);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
