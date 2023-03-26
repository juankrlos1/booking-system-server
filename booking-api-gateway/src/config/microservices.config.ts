import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  authServiceUrl: process.env.AUTH_SERVICE_URL,
  userServiceUrl: process.env.USER_SERVICE_URL,
  roomServiceUrl: process.env.ROOM_SERVICE_URL,
  coreServiceUrl: process.env.CORE_SERVICE_URL,
  notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL,
}));
