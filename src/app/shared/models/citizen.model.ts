export interface Citizen {
  id?: string;
  email: string;
  password: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    number: number;
    city: string;
    cityZipCode: string;
  };
  displayName: string;
  type: string;
}
