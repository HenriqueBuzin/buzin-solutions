import { expect, test } from '@playwright/test';

test('@smoke loads the complete landing page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Buzin Solutions');
  await expect(page.getByRole('img', { name: 'Logo' })).toBeVisible();
  await expect(page.locator('header a')).toHaveCount(2);
  await expect(page.locator('#portfolio')).toBeAttached();
});
