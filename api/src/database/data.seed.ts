import { Types } from 'mongoose';
import { RoleDocument } from 'src/roles/schemas/role.schema';

export const roles: Partial<RoleDocument>[] = [
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
