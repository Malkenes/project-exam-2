export interface Avatar {
  url?: string;
  alt?: string;
}

export interface Banner {
  url?: string;
  alt?: string;
}

export interface Media {
  url?: string;
  alt?: string;
}

export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface GeoLocation {
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  continent?: string;
  lat?: number;
  long?: number;
}
export interface BaseUser {
  name: string;
  email: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
  bio: string;
}
export interface SignInUser extends BaseUser {
  keepSignedIn: boolean;
  accessToken: string;
}
export interface RegisterData extends BaseUser {
  password: string;
}
export interface SignInResponse {
  data: BaseUser & { accessToken: string };
  meta: Record<string, unknown>;
}
export interface RegisterResponse {
  data: BaseUser;
  meta: Record<string, unknown>;
}

export interface ProfileResponse {
  data: BaseUser & Venue[] & Booking[];
  meta: Record<string, unknown>;
}
export interface VenueResponse {
  data: Venue;
  meta: Record<string, unknown>;
}

export interface UpdateProfile {
  accessToken: string;
  name: string;
  bio: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
}

export interface BaseVenue {
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  meta: Meta;
  location: GeoLocation;
}
export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: GeoLocation;
  bookings?: bookingInVenue[];
}
export interface bookingInVenue {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: string;
  created: string;
  updated: string;
  customer: {
    avatar: Avatar;
    banner: Banner;
    name: string;
    email: string;
    bio: string;
  };
}
export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: string;
  created: string;
  updated: string;
  venue: Venue;
}
