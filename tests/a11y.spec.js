const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');

test('accessibility test', async ({ page }) => {
  await page.goto('https://a11y-calculator.netlify.app'); 

  const results = await new AxeBuilder({ page })
    .disableRules('page-has-heading-one') 
    .analyze();
  
  expect(results.violations).toEqual([]);
});