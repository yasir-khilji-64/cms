import { Types } from 'mongoose';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CreateRoleDto } from 'src/roles/dtos/create-role.dto';
import { CreateTagDto } from 'src/tags/dtos/create-tag.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { generateGravatarUrl } from 'src/utils/hash';

type DtoWithId<T> = T & { _id: Types.ObjectId };
type DtoWithOptionalRole = CreateUserDto & {
  _id: Types.ObjectId;
  roles?: Types.ObjectId[];
};

export const roles: DtoWithId<CreateRoleDto>[] = [
  {
    _id: new Types.ObjectId('000000000000000000000000'),
    name: 'USER',
    status: true,
  },
  {
    _id: new Types.ObjectId('000000000000000000000001'),
    name: 'ADMIN',
    status: true,
  },
];

export const users: DtoWithOptionalRole[] = [
  {
    _id: new Types.ObjectId('000000000000000000000002'),
    firstname: 'John',
    lastname: 'Doe',
    username: 'john.doe',
    email: 'john.doe@example.com',
    password: '$2a$12$P93zs9IrPWpYNCVVOuaJEucXXia91x5z6cl6FSz9yuA7xV2HiL92G',
    picture: generateGravatarUrl('john.doe@example.com'),
    gender: true,
  },
  {
    _id: new Types.ObjectId('000000000000000000000003'),
    firstname: 'Ivan',
    lastname: 'Ivanov',
    username: 'ivan.ivanov',
    email: 'ivan.ivanov@example.com',
    password: '$2a$12$P93zs9IrPWpYNCVVOuaJEucXXia91x5z6cl6FSz9yuA7xV2HiL92G',
    gender: true,
    roles: [new Types.ObjectId('000000000000000000000001')],
    picture: generateGravatarUrl('ivan.ivanov@example.com'),
  },
];

export const tags: DtoWithId<CreateTagDto>[] = [
  {
    _id: new Types.ObjectId('000000000000000000000004'),
    name: 'TypeScript',
    active: true,
  },
];

export const categories: DtoWithId<CreateCategoryDto>[] = [
  {
    _id: new Types.ObjectId('000000000000000000000004'),
    name: 'TypeScript',
    description: 'This category belongs to all TypeScript posts',
    status: true,
  },
];
