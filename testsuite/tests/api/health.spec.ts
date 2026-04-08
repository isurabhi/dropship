import { expect, test } from '@playwright/test'

test.describe('API health', () => {
  test('GET /health returns ok', async ({ request }) => {
    const response = await request.get('/health')

    expect(response.ok()).toBeTruthy()
    await expect(response).toHaveStatus(200)

    const body = await response.json()
    expect(body).toEqual({ status: 'ok' })
  })
})
