import { expect, test } from '@playwright/test'
import { CustomerService } from '../../../api/src/customer/customer.service'
import { CustomerModel, type ICustomer } from '../../../api/src/customer/customer.model'

type FindResult = {
  sort: (criteria: { createdAt: -1 }) => Promise<ICustomer[]>
}

const makeCustomer = (id: string, createdAt: string): ICustomer => {
  return {
    _id: id,
    name: `Customer ${id}`,
    email: `${id}@example.com`,
    password: 'hashed-password',
    phone: '1234567890',
    shippingAddress: {
      street: '1 Main St',
      city: 'Springfield',
      state: 'CA',
      postalCode: '12345',
      country: 'USA',
    },
    billingAddress: {
      street: '1 Main St',
      city: 'Springfield',
      state: 'CA',
      postalCode: '12345',
      country: 'USA',
    },
    createdAt: new Date(createdAt),
    updatedAt: new Date(createdAt),
  } as unknown as ICustomer
}

test.describe('CustomerService.getAll', () => {
  const service = new CustomerService()
  const originalFind = CustomerModel.find

  test.afterEach(() => {
    CustomerModel.find = originalFind
  })

  test('returns customers sorted by newest first for typical data', async () => {
    // Arrange
    const sortedCustomers = [
      makeCustomer('new', '2026-04-08T10:00:00.000Z'),
      makeCustomer('old', '2026-04-01T10:00:00.000Z'),
    ]

    CustomerModel.find = (() => {
      return {
        sort: async (criteria: { createdAt: -1 }) => {
          expect(criteria).toEqual({ createdAt: -1 })
          return sortedCustomers
        },
      } as FindResult
    }) as typeof CustomerModel.find

    // Act
    const result = await service.getAll()

    // Assert
    expect(Array.isArray(result)).toBeTruthy()
    expect(result).toHaveLength(2)
    expect(result[0]?.createdAt.getTime()).toBeGreaterThan(result[1]?.createdAt.getTime())
  })

  test('returns an empty array when no customers exist (minimum/zero boundary)', async () => {
    // Arrange
    CustomerModel.find = (() => {
      return {
        sort: async () => [],
      } as FindResult
    }) as typeof CustomerModel.find

    // Act
    const result = await service.getAll()

    // Assert
    expect(result).toEqual([])
    expect(result).toHaveLength(0)
  })

  test('ignores extra null/undefined/empty/zero/negative arguments because method contract takes no input', async () => {
    // Arrange
    const expected = [makeCustomer('only', '2026-04-07T10:00:00.000Z')]
    CustomerModel.find = (() => {
      return {
        sort: async () => expected,
      } as FindResult
    }) as typeof CustomerModel.find

    // Assumption: JavaScript allows extra positional args; this service method intentionally ignores them.

    // Act
    const fromNull = await (service.getAll as (...args: unknown[]) => Promise<ICustomer[]>)(null)
    const fromUndefined = await (service.getAll as (...args: unknown[]) => Promise<ICustomer[]>)(undefined)
    const fromEmptyString = await (service.getAll as (...args: unknown[]) => Promise<ICustomer[]>)('')
    const fromZero = await (service.getAll as (...args: unknown[]) => Promise<ICustomer[]>)(0)
    const fromNegative = await (service.getAll as (...args: unknown[]) => Promise<ICustomer[]>)(-1)

    // Assert
    expect(fromNull).toEqual(expected)
    expect(fromUndefined).toEqual(expected)
    expect(fromEmptyString).toEqual(expected)
    expect(fromZero).toEqual(expected)
    expect(fromNegative).toEqual(expected)
  })

  test('returns large result sets without truncation (maximum boundary)', async () => {
    // Arrange
    const maxBoundaryData = Array.from({ length: 1000 }, (_, i) =>
      makeCustomer(`id-${i}`, '2026-04-08T10:00:00.000Z'),
    )
    CustomerModel.find = (() => {
      return {
        sort: async () => maxBoundaryData,
      } as FindResult
    }) as typeof CustomerModel.find

    // Act
    const result = await service.getAll()

    // Assert
    expect(result).toHaveLength(1000)
    expect(result[0]?.email).toBe('id-0@example.com')
    expect(result[999]?.email).toBe('id-999@example.com')
  })

  test('propagates the exact error message when querying fails', async () => {
    // Arrange
    const error = new Error('DB_FIND_FAILED')
    CustomerModel.find = (() => {
      throw error
    }) as typeof CustomerModel.find

    // Act
    let thrown: unknown
    try {
      await service.getAll()
    } catch (err) {
      thrown = err
    }

    // Assert
    expect(thrown).toBeInstanceOf(Error)
    expect((thrown as Error).message).toBe('DB_FIND_FAILED')
  })
})
