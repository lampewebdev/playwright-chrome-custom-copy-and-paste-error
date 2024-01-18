import { test, expect } from '@playwright/test';

test('plain copy and paste should work', async ({ page }) => {
    await page.goto('/');
    await page.click('#copyButton');
    await page.getByRole('button', { name: 'Plain format paste' }).first().click();
    await expect(page.getByRole('textbox')).toHaveValue('{"type":"plain"}');
});

test('custom copy and paste should work', async ({ page }) => {
    await page.goto('/');
    await page.click('#copyButton');
    await page.getByRole('button', { name: 'Custom format paste' }).first().click();
    await expect(page.getByRole('textbox')).toHaveValue('{"type":"custom"}');
});
