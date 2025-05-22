import { IsEmail, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, {
    message: '비밀번호는 영문과 숫자 조합 8자 이상이어야 합니다',
  })
  password: string;

  @IsString()
  @Matches(/^010\d{8}$/, { message: '휴대폰 번호 형식이 올바르지 않습니다' })
  phone: string;
}