export type CustomerSearchData = {
  query: string
  expectedName: string
  expectedRowCount: number
}

export class CustomerSearchDataBuilder {
  private readonly data: CustomerSearchData

  constructor() {
    this.data = {
      query: '',
      expectedName: '',
      expectedRowCount: 0,
    }
  }

  withQuery(query: string): CustomerSearchDataBuilder {
    this.data.query = query
    return this
  }

  withExpectedName(expectedName: string): CustomerSearchDataBuilder {
    this.data.expectedName = expectedName
    return this
  }

  withExpectedRowCount(expectedRowCount: number): CustomerSearchDataBuilder {
    this.data.expectedRowCount = expectedRowCount
    return this
  }

  asAidenSearch(): CustomerSearchDataBuilder {
    return this.withQuery('Aiden')
      .withExpectedName('Aiden Brooks')
      .withExpectedRowCount(1)
  }

  static byName(name: string, expectedRowCount = 1): CustomerSearchDataBuilder {
    return new CustomerSearchDataBuilder()
      .withQuery(name)
      .withExpectedName(name)
      .withExpectedRowCount(expectedRowCount)
  }

  build(): CustomerSearchData {
    return { ...this.data }
  }
}