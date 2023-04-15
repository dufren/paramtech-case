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
