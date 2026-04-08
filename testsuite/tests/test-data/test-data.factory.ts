import { CustomerDataBuilder } from './customer-data.builder'

export class TestDataFactory {
  static newCustomer(): CustomerDataBuilder {
    return new CustomerDataBuilder()
  }

  static alexCarterCustomer() {
    return this.newCustomer()
      .withName('Alex Carter')
      .withEmail('alex.retail@example.com')
      .withPassword('P@ssword123')
      .withPhone('+1 (555) 111-2222')
      .withShippingAddress({
        street: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'IL',
        postalCode: '62704',
        country: 'USA',
      })
      .withBillingSameAsShipping()
      .build()
  }

  static customerSearchByAiden() {
    return {
      query: 'Aiden',
      expectedName: 'Aiden Brooks',
      expectedRowCount: 1,
    }
  }
}
