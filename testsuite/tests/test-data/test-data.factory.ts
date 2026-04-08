import { CustomerDataBuilder } from './customer-data.builder'
import { CustomerSearchDataBuilder } from './customer-search-data.builder'

export class TestDataFactory {
  static newCustomer(): CustomerDataBuilder {
    return new CustomerDataBuilder()
  }

  static alexCarterCustomer() {
    return this.newCustomer()
      .asAlexCarter()
      .build()
  }

  static customerSearchByAiden() {
    return new CustomerSearchDataBuilder().asAidenSearch().build()
  }
}
