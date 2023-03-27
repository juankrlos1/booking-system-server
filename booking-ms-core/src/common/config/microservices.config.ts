import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  userServiceUrl: process.env.USER_SERVICE_URL,
  roomServiceUrl: process.env.ROOM_SERVICE_URL,
}));
