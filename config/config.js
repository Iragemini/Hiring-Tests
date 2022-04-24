import dotenv from 'dotenv';

dotenv.config();

export default {
  server: {
    port: process.env.PORT || 3000,
  },
  storage: {
    keyValue: {
      ttl: +process.env.TTL || -1,
    },
  },
};
