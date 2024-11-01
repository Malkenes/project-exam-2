export interface Avatar {
  url: string;
  alt: string;
}

export interface Banner {
  url: string;
  alt: string;
}

export interface UserData {
  name: string;
  email: string;
  avatar: Avatar;
  banner: Banner;
  accessToken: string;
  venueManager: boolean;
}

export interface SignInResponse {
  data: UserData;
  meta: Record<string, unknown>;
}
