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
