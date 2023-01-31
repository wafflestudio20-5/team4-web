export interface LoginDto {
  username: string;
  password: string;
}

export interface PurchasePostDto {
  id: number;
  option?: String;
  payment: number;
  quantity: number;
}

export interface PatchMyInfoRequestDto {
  image?: string;
  password?: string;
  nickname?: string;
  sex?: string;
  height?: number;
  weight?: number;
  description?: string;
  instaUsername?: string;
}
