export type PropertyData = {
  // بدو تزبيطة
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    weekly: string;
    monthly: string;
    nightly: string;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};
export type IApiResponse = {
  hasError?: boolean;
  error?: any;
};

export type ProfileProps = {
  id: string;
  email: string;
};
export type seassionProps = {
  id: string;
  email: string;
};
export type Location = {
  street: string;
  city: string;
  state: string;
  zipcode: string;
};

export type Rates = {
  weekly: string;
  monthly: string;
  nightly: string;
};

export type SellerInfo = {
  name: string;
  email: string;
  phone: string;
};

export type Fields = {
  type: string;
  name: string;
  description: string;
  location: Location;
  beds: string;
  baths: string;
  square_feet: string;
  amenities: string[];
  rates: Rates;
  seller_info: SellerInfo;
  images: string[];
  owner?: string;
};
