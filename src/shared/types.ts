export interface Avatar {
  url?: string;
  alt?: string;
}

export interface Banner {
  url?: string;
  alt?: string;
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
  data: SignInUser;
  meta: Record<string, unknown>;
}
export interface RegisterResponse {
  data: BaseUser;
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
