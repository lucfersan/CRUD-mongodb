import * as dotenv from 'dotenv';

import { resolve } from 'path';

let path: string;
switch (process.env.NODE_ENV) {
  case 'test':
    path = resolve(__dirname, '..', '..', '.env.test');
    break;
  case 'production':
    path = resolve(__dirname, '..', '..', '.env.production');
    break;
  default:
    path = resolve(__dirname, '..', '..', '.env.development');
}
dotenv.config({ path });

export const JWT_SECRET = process.env.JWT_SECRET;
export const EXPIRES_IN = process.env.EXPIRES_IN;
