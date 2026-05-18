import { test, expect } from '@playwright/test';

test.describe('Arenix Full-Stack E2E Application Flows', () => {
  
  test('should load the homepage and render key branding elements', async ({ page }) => {
    // Navigate to the monolithic web server port
    await page.goto('/');

    // 1. Verify page title contains 'Arenix'
    const headerTitle = page.locator('header h1');
    await expect(headerTitle).toContainText('Arenix');

    // 2. Verify "System Online" indicator is visible
    const systemIndicator = page.locator('text=System Online');
    await expect(systemIndicator).toBeVisible();

    // 3. Verify the chat input box exists with correct placeholder
    const chatInput = page.locator('input[placeholder="Enter prompt for Arenix..."]');
    await expect(chatInput).toBeVisible();
    await expect(chatInput).toBeEnabled();
  });

  test('should handle Theme Toggling correctly (Light/Dark Mode)', async ({ page }) => {
    await page.goto('/');

    // Find the toggle button
    const toggleBtn = page.locator('button[aria-label="Toggle Theme"]');
    await expect(toggleBtn).toBeVisible();

    // Toggle theme once
    await toggleBtn.click();
    await page.waitForTimeout(300);

    // Toggle theme back
    await toggleBtn.click();
    await page.waitForTimeout(300);
  });

  test('should allow entering text in input and trigger loading visual feedback', async ({ page }) => {
    await page.goto('/');

    const chatInput = page.locator('input[placeholder="Enter prompt for Arenix..."]');
    
    // Type in a coding query
    await chatInput.fill('Write a binary search algorithm in python');

    // Find send button and verify it's enabled
    const sendBtn = page.locator('button.absolute.right-2');
    await expect(sendBtn).toBeEnabled();

    // Click send
    await sendBtn.click();

    // Expecting to see the loading analysis state triggered
    const loadingState = page.locator('text=Analyzing query across models...');
    await expect(loadingState).toBeVisible();
  });
});
