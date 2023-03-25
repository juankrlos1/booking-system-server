import { PartialType } from '@nestjs/mapped-types';
import { CreateBuildingDto } from './create-building.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {
  @IsNotEmpty()
  updatedAt: Date;

  @IsNotEmpty()
  updatedBy: string;
}
