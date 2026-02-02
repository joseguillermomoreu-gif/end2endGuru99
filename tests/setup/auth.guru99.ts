import { LoginUserCMS } from './types/types';
import { loginCms } from './test';

const env = process.env;

const USERS: Array<LoginUserCMS> = [{ username: env.testUser || '', password: env.testPass || '', role: 'admin' },]

for (const user of USERS) {
  loginCms(user);
}
