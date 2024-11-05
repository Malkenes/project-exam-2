export interface Avatar {
  url?: string | null;
  alt?: string;
}

export interface Banner {
  url?: string | null;
  alt?: string;
}

export interface BaseUser {
  name: string;
  email: string;
  avatar: Avatar;
  banner: Banner;
  venueManager: boolean;
}
export interface SignInUser extends BaseUser {
  accessToken: string;
}
export interface RegisterUser extends BaseUser {
  bio: string;
}
export interface RegisterData extends RegisterUser {
  password: string;
}
export interface SignInResponse {
  data: SignInUser;
  meta: Record<string, unknown>;
}
export interface RegisterResponse {
  data: RegisterUser;
  meta: Record<string, unknown>;
}
