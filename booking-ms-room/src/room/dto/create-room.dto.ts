import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  MaxLength,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateRoomDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsInt()
  levelId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsUrl()
  photoUrl?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  status: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  createdBy?: string;
}
