import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hashPassword, verifyPassword } from 'src/utils/hash';
import { UsersService } from 'src/users/services/users.service';
import { MongoErrorCode } from 'src/database/mongo-error-codes.enum';
import { UserDocument } from 'src/users/schemas/user.schema';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  public async register(details: RegisterUserDto): Promise<UserDocument> {
    try {
      const hashedPassword = await hashPassword(details.password);
      const user = await this.usersService.create({
        email: details.email,
        firstname: details.firstname,
        lastname: details.lastname,
        username: details.username,
        password: hashedPassword,
        gender: details.gender,
      });
      user['password'] = undefined;
      user['status'] = undefined;
      user['created_at'] = undefined;
      user['updated_at'] = undefined;
      return user;
    } catch (error) {
      if (
        error?.code === MongoErrorCode.UniqueViolation &&
        error?.keyPattern?.email === 1
      ) {
        throw new HttpException('Email already in use', HttpStatus.CONFLICT);
      } else if (
        error?.code === MongoErrorCode.UniqueViolation &&
        error?.keyPattern?.username === 1
      ) {
        throw new HttpException('Username already taken', HttpStatus.CONFLICT);
      }
      throw new HttpException(
        'Fatal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserDocument> {
    try {
      const users = await this.usersService.find({ email });
      const user = users[0];
      await verifyPassword(password, user['password']);
      user['password'] = undefined;
      user['status'] = undefined;
      user['created_at'] = undefined;
      user['updated_at'] = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials', HttpStatus.CONFLICT);
    }
  }

  public getJwtToken({ id, role }: TokenPayload) {
    const payload: TokenPayload = { id, role };
    const token = this.jwtService.sign(payload, {
      subject: id.toString(),
    });
    return token;
  }
}
