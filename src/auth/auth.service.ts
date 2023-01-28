import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash, compare } from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { USER_NOT_FOUND, WRONG_PASSWORD_ERROR } from './auth.constants';
import { UserId } from '../decorators/user.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(dto: RegisterDto) {
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.email,
      passwordHash: await hash(dto.password, salt),
    });
    await newUser.save();
    return { email: newUser.email };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Pick<UserModel, 'email'>> {
    const user = (await this.findUser(email)).toObject();
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }
    const isCorrectPassword = compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    delete user.passwordHash;
    return user;
  }

  async getById(id: string) {
    const user = (await this.userModel.findById(id).exec()).toObject();
    delete user.passwordHash;
    return user;
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async login(email: string) {
    const user = await this.findUser(email);
    const payload = { userId: user._id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
