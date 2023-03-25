export class CreateRoomDto {
  name: string;
  levelId: number;
  capacity: number;
  photoUrl?: string;
  status?: string;
  createdBy?: string;
}
