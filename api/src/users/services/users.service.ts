import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model, PipelineStage, Types } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FindUserDto } from '../dtos/find-user.dto';
import { generateGravatarUrl } from 'src/utils/hash';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async find(details: FindUserDto): Promise<UserDocument[]> {
    const matchOpts = {};
    if (details['id'] !== undefined) {
      matchOpts['_id'] = new Types.ObjectId(details['id']);
    }
    if (details['email'] !== undefined) {
      matchOpts['email'] = details['email'];
    }
    matchOpts['status'] = true;

    const query: PipelineStage[] = [
      {
        $match: matchOpts,
      },
      {
        $lookup: {
          localField: 'roles',
          foreignField: '_id',
          from: 'roles',
          as: 'roles',
          pipeline: [
            {
              $project: {
                _id: 0,
                name: '$name',
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          firstname: '$firstname',
          lastname: '$lastname',
          username: '$username',
          email: '$email',
          dob: '$dob',
          picture: '$picture',
          password: '$password',
          website: '$website',
          gender: '$gender',
          socialMediaHandle: '$socialMediaHandle',
          roles: '$roles',
          phone: '$phone',
        },
      },
    ];
    const users = await this.userModel.aggregate<UserDocument>(query);
    return users;
  }

  async create(details: CreateUserDto): Promise<UserDocument> {
    if (details['picture'] === undefined) {
      const picture = generateGravatarUrl(details['email']);
      details['picture'] = picture;
    }
    const result = await this.userModel.create([details]);
    return result[0];
  }
}
