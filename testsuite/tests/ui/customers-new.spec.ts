import { expect, test } from '@playwright/test'
import { SharedTestFixture } from '../fixtures/shared-test.fixture'
import { expectSubmittedCustomerPayloadToMatch } from '../helpers/customer-assertions.helpers'
import { CustomerDataBuilder } from '../test-data/customer-data.builder'

test.describe('New customer form', () => {
  test('submits a valid payload from /customers/new', async ({ page }) => {
    const customer = CustomerDataBuilder.validCustomer().build()
    const customerRoute = await SharedTestFixture.setupCustomerCreateRoute(page)

    await page.goto('/customers/new')

    await expect(page.getByRole('heading', { name: 'New Customer' })).toBeVisible()

    await SharedTestFixture.openAndCloseEmailProviderPopup(page)
    await SharedTestFixture.fillNewCustomerForm(page, customer)

    await page.waitForTimeout(10_000)

    await page.getByRole('button', { name: 'Create Customer' }).click()

    await expect(page.getByText(/Customer created successfully/)).toBeVisible()

    let submittedPayload: Record<string, unknown> | undefined
    await expect
      .poll(() => {
        submittedPayload = customerRoute.getSubmittedPayload()
        return submittedPayload?.email
      })
      .toBe(customer.email)

    expectSubmittedCustomerPayloadToMatch(submittedPayload, customer)
  })
})
