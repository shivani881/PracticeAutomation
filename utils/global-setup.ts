import { chromium, FullConfig,expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
async function globalSetup(config: FullConfig) {
  // 1. Browser launch karein (Headless mode by default)
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('🔄 Running Global Setup: Authenticating and generating fresh auth state...');

let loginpage = new LoginPage(page);
   await loginpage.navigate();
   await loginpage.login("tm_roles","tm_roles","roles123");
   await expect(page).toHaveURL(/dashboard/, { timeout: 20000 })

  // 6. State ko root folder mein save karein
  await page.context().storageState({ path: 'auth-state.json' });
  
  console.log('✅ Auth state successfully generated and saved to auth-state.json');

  // 7. Browser close kar dein
  await browser.close();
}

export default globalSetup;