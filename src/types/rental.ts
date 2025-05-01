export interface RentalProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  specifications: {
    bedrooms: number;
    bathrooms: number;
    surface: number;
    furnished: boolean;
    petsAllowed: boolean;
  };
  amenities: string[];
  images: string[];
  landlordInfo: {
    id: string;
    name: string;
    phone: string;
    email: string;
  };
  availableFrom: Date;
  createdAt: Date;
  updatedAt: Date;
  status: 'available' | 'rented' | 'pending';
} 