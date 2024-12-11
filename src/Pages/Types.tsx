export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude?: number;
    longitude?: number;
  }
  
  export interface Profile {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    description: string;
    profileImageUrl: string;
    address: Address;
    interests?: string[];
    dateOfBirth?: string;
  }
  
  export interface ProfileFormData extends Omit<Profile, 'id'> {
    id?: string;
  }