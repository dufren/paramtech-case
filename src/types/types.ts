export type FormValuesType = {
  fullName: string;
  email: string;
};

export type PackageType = {
  imagePath: string;
  name: string;
  details: string[];
  tags: string[];
  amount: number;
  currency: string;
  id: number;
};

export type PackagesResponseType = PackageType[];

export type PaymentResponseType = {
  content: string;
};

export type PaymentDataType = {
  packageIds: string[];
  cardHolderName: string;
  cardNumber: string;
  expireDate: string;
  cvv: string;
  totalAmount: number;
};

export type paymentInfoType = {
  cardHolderName: string;
  cardNumber: string;
  expireDate: string;
  cvv: string;
};
