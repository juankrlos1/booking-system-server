import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBuildingDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  createdBy: string;
}
