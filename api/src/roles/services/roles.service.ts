import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from '../schemas/role.schema';
import { Model } from 'mongoose';
import { CreateRoleDto } from '../dtos/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(details: CreateRoleDto) {
    const result = await this.roleModel.create([details]);
    return result[0];
  }
}
