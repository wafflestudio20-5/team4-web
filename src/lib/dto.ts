import { Category, SubCategory } from './interface';

export interface RegisterDto {
  username: string;
  password: string;
  nickname: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface GetItemsDto {
  index?: number;
  count: number;
  category?: Category;
  subCategory?: SubCategory;
}
