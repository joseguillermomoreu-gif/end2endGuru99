import { test as setup } from '@playwright/test';
import * as guru99 from 'components/guru99';
import * as login from '../../components/guru99/login';
import * as home from '../../components/guru99/home';

import { LoginUserCMS } from './types/types';

setup.describe.configure({ retries: 1 });
export function loginCms(user: LoginUserCMS) {
  setup.describe(`Login cms`, async () => {
    setup(`Cms authentication ${user.role}`, async ({ page }) => {
      await guru99.gotoHome(page);
      await login.isVisible(page, true);
      await login.fillUser(page, user.username);
      await login.fillPassword(page, user.password);
      await login.clickLogin(page);
      await login.isVisible(page, false);
      await home.checkWelcomeMessage(page, user.username);
      await page.context().storageState({ path: `playwright/.auth/cms/${user.role}.json` });
    });
  });
}
