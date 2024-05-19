export type PropertyData = {
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
