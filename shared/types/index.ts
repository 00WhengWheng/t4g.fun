export interface RootStackParamList {
  Home: undefined;
  About: undefined;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Gift {
  id: string;
  title: string;
  description: string;
  tags: string[];
  userId: string;
  createdAt: Date;
}