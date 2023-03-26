import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The name of the room',
    maxLength: 255,
    default: 'Room 1',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    description: 'The ID of the level associated with the room',
    type: 'integer',
    default: 1,
  })
  @IsNotEmpty()
  @IsInt()
  levelId: number;

  @ApiProperty({
    description: 'The capacity of the room',
    type: 'integer',
    minimum: 1,
    default: 10,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({
    description: 'The URL of the room photo (optional)',
    maxLength: 255,
    type: 'string',
    format: 'url',
    required: false,
    default: 'https://example.com/photo.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsUrl()
  photoUrl?: string;

  @ApiProperty({
    description: 'The status of the room [ACTIVO, INACTIVO, OCUPADO]',
    maxLength: 255,
    default: 'ACTIVO',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  status: string;

  @ApiProperty({
    description: 'The name of the user who created the room (optional)',
    maxLength: 100,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  createdBy?: string;
}
