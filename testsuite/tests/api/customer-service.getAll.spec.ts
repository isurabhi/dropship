import { expect, test } from '@playwright/test'
import { SharedTestFixture } from '../fixtures/shared-test.fixture'
import {
  expectCustomerRecordToMatch,
  expectValidDateField,
} from '../helpers/customer-assertions.helpers'
import { CustomerDataBuilder } from '../test-data/customer-data.builder'

test.describe('Customer getAll API', () => {
  test('returns customers through the getAll endpoint after creating a customer', async ({ request }) => {
    // Arrange
    const payload = CustomerDataBuilder.validCustomer()
      .withName('QA GetAll Customer')
      .withUniqueEmail('qa.getall')
      .build()

    await SharedTestFixture.createCustomerViaApi(request, payload)

    // Act
    const customers = await SharedTestFixture.getAllCustomersViaApi(request)

    // Assert
    expect(Array.isArray(customers)).toBe(true)
    expect(customers.length).toBeGreaterThan(0)

    const createdCustomer = customers.find((item) => item.email === payload.email)
    expectCustomerRecordToMatch(createdCustomer, payload)
    expectValidDateField(createdCustomer?.createdAt, 'createdAt')
  })

  test('returns newest customers first for records created in sequence', async ({ request }) => {
    // Arrange
    const firstCustomer = CustomerDataBuilder.validCustomer()
      .withName('QA Order First')
      .withUniqueEmail('qa.order.first')
      .build()
    const secondCustomer = CustomerDataBuilder.validCustomer()
      .withName('QA Order Second')
      .withUniqueEmail('qa.order.second')
      .build()

    await SharedTestFixture.createCustomerViaApi(request, firstCustomer)
    await SharedTestFixture.createCustomerViaApi(request, secondCustomer)

    // Act
    const customers = await SharedTestFixture.getAllCustomersViaApi(request)

    const firstIndex = customers.findIndex((item) => item.email === firstCustomer.email)
    const secondIndex = customers.findIndex((item) => item.email === secondCustomer.email)
    const firstRecord = customers[firstIndex]
    const secondRecord = customers[secondIndex]

    // Assert
    expect(firstIndex).toBeGreaterThanOrEqual(0)
    expect(secondIndex).toBeGreaterThanOrEqual(0)
    expectCustomerRecordToMatch(firstRecord, firstCustomer)
    expectCustomerRecordToMatch(secondRecord, secondCustomer)
    expectValidDateField(firstRecord?.createdAt, 'firstRecord.createdAt')
    expectValidDateField(secondRecord?.createdAt, 'secondRecord.createdAt')

    const firstCreatedAt = Date.parse(firstRecord?.createdAt ?? '')
    const secondCreatedAt = Date.parse(secondRecord?.createdAt ?? '')
    expect(secondCreatedAt).toBeGreaterThanOrEqual(firstCreatedAt)
    expect(secondIndex).toBeLessThan(firstIndex)
  })
})
