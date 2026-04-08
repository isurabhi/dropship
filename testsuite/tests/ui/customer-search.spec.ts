import { expect, test } from '@playwright/test'
import { TestDataFactory } from '../test-data/test-data.factory'

test.describe('Customer search', () => {
  test('returns rows when searching by name Aiden', async ({ page }) => {
    const searchData = TestDataFactory.customerSearchByAiden()

    await page.goto('/customers')

    const searchInput = page.getByPlaceholder('Search name, email, or ID')
    await searchInput.fill(searchData.query)

    const tableRows = page.locator('tbody tr')
    await expect(tableRows).toHaveCount(searchData.expectedRowCount)
    await page.waitForTimeout(10_000)
    await expect(page.getByRole('cell', { name: searchData.expectedName })).toBeVisible()
  })
})
