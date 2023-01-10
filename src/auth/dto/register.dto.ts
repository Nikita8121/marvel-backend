import { IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
