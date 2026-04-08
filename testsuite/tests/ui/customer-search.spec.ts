import { expect, test } from '@playwright/test'
import { CustomerSearchDataBuilder } from '../test-data/customer-search-data.builder'

test.describe('Customer search', () => {
  test('returns rows when searching by name Aiden', async ({ page }) => {
    const searchData = new CustomerSearchDataBuilder().asAidenSearch().build()

    await page.goto('/customers')

    const searchInput = page.getByPlaceholder('Search name, email, or ID')
    await searchInput.fill(searchData.query)

    const tableRows = page.locator('tbody tr')
    await expect(tableRows).toHaveCount(searchData.expectedRowCount)
    await page.waitForTimeout(10_000)
    await expect(page.getByRole('cell', { name: searchData.expectedName })).toBeVisible()
  })
})
