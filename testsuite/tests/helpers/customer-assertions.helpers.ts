import { expect } from '@playwright/test'
import type { CustomerDetails } from '../test-data/customer-data.builder'
import type { CustomerListRecord } from '../fixtures/shared-test.fixture'

export const expectValidDateField = (
  value: string | undefined,
  fieldName: string,
): void => {
  expect(typeof value, `${fieldName} should be a string`).toBe('string')
  const parsed = Date.parse(value ?? '')
  expect(Number.isNaN(parsed), `${fieldName} should be a valid date`).toBe(false)
}

export const expectCustomerRecordToMatch = (
  actual: CustomerListRecord | undefined,
  expected: Pick<CustomerDetails, 'name' | 'email'>,
): void => {
  expect(actual).toBeDefined()
  expect(actual?.name).toBe(expected.name)
  expect(actual?.email).toBe(expected.email)
}

export const expectSubmittedCustomerPayloadToMatch = (
  payload: Record<string, unknown> | undefined,
  customer: CustomerDetails,
): void => {
  expect(payload).toBeDefined()
  expect(payload?.name).toBe(customer.name)
  expect(payload?.email).toBe(customer.email)
  expect(payload?.phone).toBe(customer.phone)

  const shippingAddress = payload?.shippingAddress as Record<string, unknown> | undefined
  expect(shippingAddress?.street).toBe(customer.shippingAddress.street)
  expect(shippingAddress?.city).toBe(customer.shippingAddress.city)
  expect(shippingAddress?.state).toBe(customer.shippingAddress.state)
  expect(shippingAddress?.postalCode).toBe(customer.shippingAddress.postalCode)
  expect(shippingAddress?.country).toBe(customer.shippingAddress.country)

  const billingAddress = payload?.billingAddress as Record<string, unknown> | undefined
  expect(billingAddress?.street).toBe(customer.billingAddress.street)
  expect(billingAddress?.city).toBe(customer.billingAddress.city)
  expect(billingAddress?.state).toBe(customer.billingAddress.state)
  expect(billingAddress?.postalCode).toBe(customer.billingAddress.postalCode)
  expect(billingAddress?.country).toBe(customer.billingAddress.country)
}