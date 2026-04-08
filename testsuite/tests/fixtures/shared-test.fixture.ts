import { expect, type APIRequestContext, type Page } from '@playwright/test'
import type { CustomerDetails } from '../test-data/customer-data.builder'

export type CustomerListRecord = {
  name?: string
  email?: string
  createdAt?: string
}

export class SharedTestFixture {
  static uniqueEmail(prefix: string): string {
    const now = Date.now()
    const random = Math.floor(Math.random() * 100_000)
    return `${prefix}.${now}.${random}@example.com`
  }

  static async createCustomerViaApi(
    request: APIRequestContext,
    payload: CustomerDetails,
  ): Promise<void> {
    const createResponse = await request.post('/customers', { data: payload })
    expect(createResponse.status()).toBe(201)
  }

  static async getAllCustomersViaApi(
    request: APIRequestContext,
  ): Promise<CustomerListRecord[]> {
    const response = await request.get('/trpc/customer.getAll')
    expect(response.status()).toBe(200)

    const responseBody = await response.json()
    return this.extractTrpcJson<CustomerListRecord[]>(responseBody)
  }

  static extractTrpcJson<T>(body: unknown): T {
    if (!body || typeof body !== 'object') {
      return body as T
    }

    const result = body as {
      result?: {
        data?: unknown
      }
    }

    const data = result.result?.data
    if (
      data &&
      typeof data === 'object' &&
      'json' in (data as Record<string, unknown>)
    ) {
      return (data as { json?: T }).json as T
    }

    return data as T
  }

  static async setupCustomerCreateRoute(page: Page): Promise<{
    getSubmittedPayload: () => Record<string, unknown> | undefined
  }> {
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

    return {
      getSubmittedPayload: () => submittedPayload,
    }
  }

  static async fillNewCustomerForm(page: Page, customer: CustomerDetails): Promise<void> {
    await page.getByLabel('Full Name').fill(customer.name)
    await page.getByPlaceholder('alex@retailco.com').fill(customer.email)
    await page.getByLabel('Password').fill(customer.password)
    await page.getByLabel('Phone').fill(customer.phone)

    await page.getByLabel('Street').first().fill(customer.shippingAddress.street)
    await page.getByLabel('City').first().fill(customer.shippingAddress.city)
    await page.getByLabel('State').first().fill(customer.shippingAddress.state)
    await page.getByLabel('Postal Code').first().fill(customer.shippingAddress.postalCode)
    await page.getByLabel('Country').first().fill(customer.shippingAddress.country)
  }

  static async openAndCloseEmailProviderPopup(page: Page): Promise<void> {
    await page.getByRole('button', { name: 'Email' }).click()
    await expect(
      page.getByRole('heading', { name: 'Recommended Email Providers' }),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: 'Gmail' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Yahoo Mail' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Hotmail / Outlook' })).toBeVisible()
    await page.getByRole('button', { name: 'Close email provider popup' }).click()
    await expect(
      page.getByRole('heading', { name: 'Recommended Email Providers' }),
    ).not.toBeVisible()
  }
}