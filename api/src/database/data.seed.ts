import { Types } from 'mongoose';
import { CreateRoleDto } from 'src/roles/dtos/create-role.dto';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

type DtoWithId<T> = T & { _id: Types.ObjectId };

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

export const users: DtoWithId<CreateUserDto>[] = [
  {
    _id: new Types.ObjectId('000000000000000000000002'),
    firstname: 'John',
    lastname: 'Doe',
    username: 'john.doe',
    email: 'john.doe@example.com',
    password: 'SuperSecret123',
    gender: true,
  },
];
