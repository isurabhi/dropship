import { expect, test } from '@playwright/test'

test.describe('API health', () => {
  test('GET /health returns ok', async ({ request }) => {
    const response = await request.get('/health')

    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe('OK')
    expect(response.headers()['content-type']).toContain('application/json')

    const body = (await response.json()) as { status: string }
    expect(body).toEqual({ status: 'ok' })
    expect(body.status).toBe('ok')
  })
})
