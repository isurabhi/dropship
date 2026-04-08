export type Address = {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type CustomerDetails = {
  name: string
  email: string
  password: string
  phone: string
  shippingAddress: Address
  billingAddress: Address
}

const EMPTY_ADDRESS: Address = {
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
}

export class CustomerDataBuilder {
  private readonly data: CustomerDetails

  constructor() {
    this.data = {
      name: '',
      email: '',
      password: '',
      phone: '',
      shippingAddress: { ...EMPTY_ADDRESS },
      billingAddress: { ...EMPTY_ADDRESS },
    }
  }

  withName(name: string): CustomerDataBuilder {
    this.data.name = name
    return this
  }

  withEmail(email: string): CustomerDataBuilder {
    this.data.email = email
    return this
  }

  withPassword(password: string): CustomerDataBuilder {
    this.data.password = password
    return this
  }

  withPhone(phone: string): CustomerDataBuilder {
    this.data.phone = phone
    return this
  }

  withShippingAddress(address: Partial<Address>): CustomerDataBuilder {
    this.data.shippingAddress = {
      ...this.data.shippingAddress,
      ...address,
    }

    return this
  }

  withBillingAddress(address: Partial<Address>): CustomerDataBuilder {
    this.data.billingAddress = {
      ...this.data.billingAddress,
      ...address,
    }

    return this
  }

  withBillingSameAsShipping(): CustomerDataBuilder {
    this.data.billingAddress = { ...this.data.shippingAddress }
    return this
  }

  build(): CustomerDetails {
    return {
      ...this.data,
      shippingAddress: { ...this.data.shippingAddress },
      billingAddress: { ...this.data.billingAddress },
    }
  }
}
