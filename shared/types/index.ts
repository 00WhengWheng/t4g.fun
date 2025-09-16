export interface RootStackParamList {
  Home: undefined;
  About: undefined;
  Profile: undefined;
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  email_verified?: boolean;
  nickname?: string;
  sub?: string;
}

export interface AuthUser extends User {
  accessToken?: string;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Gift {
  id: string;
  title: string;
  description: string;
  tags: string[];
  userId: string;
  createdAt: Date;
}