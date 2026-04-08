import { expect, test } from '@playwright/test'
import { TestDataFactory } from '../test-data/test-data.factory'

test.describe('New customer form', () => {
  test('submits a valid payload from /customers/new', async ({ page }) => {
    const customer = TestDataFactory.alexCarterCustomer()
    let submittedPayload: Record<string, unknown> | undefined

    await page.route('**/customers', async (route) => {
      const request = route.request()
      submittedPayload = request.postDataJSON() as Record<string, unknown>

      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'qa-customer-001',
        }),
      })
    })

    await page.goto('/customers/new')

    await expect(page.getByRole('heading', { name: 'New Customer' })).toBeVisible()

    await page.getByRole('button', { name: 'Email' }).click()
    await expect(page.getByRole('heading', { name: 'Recommended Email Providers' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Gmail' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Yahoo Mail' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Hotmail / Outlook' })).toBeVisible()
    await page.getByRole('button', { name: 'Close email provider popup' }).click()
    await expect(page.getByRole('heading', { name: 'Recommended Email Providers' })).not.toBeVisible()

    await page.getByLabel('Full Name').fill(customer.name)
    await page.getByPlaceholder('alex@retailco.com').fill(customer.email)
    await page.getByLabel('Password').fill(customer.password)
    await page.getByLabel('Phone').fill(customer.phone)

    await page.getByLabel('Street').first().fill(customer.shippingAddress.street)
    await page.getByLabel('City').first().fill(customer.shippingAddress.city)
    await page.getByLabel('State').first().fill(customer.shippingAddress.state)
    await page.getByLabel('Postal Code').first().fill(customer.shippingAddress.postalCode)
    await page.getByLabel('Country').first().fill(customer.shippingAddress.country)

    await page.waitForTimeout(10_000)

    await page.getByRole('button', { name: 'Create Customer' }).click()

    await expect(page.getByText(/Customer created successfully/)).toBeVisible()
    await expect.poll(() => submittedPayload).not.toBeUndefined()

    expect(submittedPayload).toMatchObject({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      shippingAddress: customer.shippingAddress,
      billingAddress: customer.billingAddress,
    })
  })
})
