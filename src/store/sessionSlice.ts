import { createSlice } from '@reduxjs/toolkit';
import { Session, Label, Category, SubCategory } from '../lib/interface';

const initialState: Session = {
  user: {
    /* Initialized for test purposes */
    id: 0,
    username: '홍길동',
    nickname: '뉴비_8sd9c1cw',
    reviewCount: 10,
    registrationDate: '2020.12.30',
    sex: 'male',
    height: 170,
    weight: 70,
    socialKey: '',
    point: 3500,
    purchases: [
      {
        id: 0,
        name: '여성 슬러치 바나나 숄더백 - 다크 브라운',
        brand: '더 로우',
        image:
          'https://image.msscdn.net/images/goods_img/20220722/2678023/2678023_1_125.jpg',
        oldPrice: 1944000,
        newPrice: 1090000,
        label: Label.boutique,
        category: Category.bag,
        subCategory: SubCategory.crossBag,
      },
      {
        id: 1,
        name: '베르겐 고어 구스다운 남성 롱패딩',
        brand: '디스커버리 익스페디션',
        image:
          'https://image.msscdn.net/images/goods_img/20221007/2848934/2848934_2_125.jpg',
        oldPrice: 750000,
        rating: 8,
        category: Category.outer,
        subCategory: SubCategory.padding,
      },
    ],
    shoppingCart: [
      {
        id: 2,
        name: '[27일하루특가] 남성 W 페트리트 패딩 재킷',
        brand: '디젤',
        image:
          'https://image.msscdn.net/images/goods_img/20220831/2757856/2757856_1_125.jpg',
        oldPrice: 750000,
        newPrice: 285000,
        rating: 9,
        label: Label.boutique,
        category: Category.outer,
        subCategory: SubCategory.jacket,
      },
      {
        id: 3,
        name: '여성 슬러치 바나나 숄더백 - 다크 브라운',
        brand: '더 로우',
        image:
          'https://image.msscdn.net/images/goods_img/20220722/2678023/2678023_1_125.jpg',
        oldPrice: 1944000,
        newPrice: 1090000,
        label: Label.boutique,
        category: Category.bag,
        subCategory: SubCategory.crossBag,
      },
    ],
    recentlyViewed: [
      {
        id: 5,
        name: '[27일하루특가] 남성 W 페트리트 패딩 재킷',
        brand: '디젤',
        image:
          'https://image.msscdn.net/images/goods_img/20220831/2757856/2757856_1_125.jpg',
        oldPrice: 750000,
        newPrice: 285000,
        rating: 9,
        label: Label.boutique,
        category: Category.outer,
        subCategory: SubCategory.jacket,
      },
      {
        id: 6,
        name: '여성 슬러치 바나나 숄더백 - 다크 브라운',
        brand: '더 로우',
        image:
          'https://image.msscdn.net/images/goods_img/20220722/2678023/2678023_1_125.jpg',
        oldPrice: 1944000,
        newPrice: 1090000,
        label: Label.boutique,
        category: Category.bag,
        subCategory: SubCategory.crossBag,
      },
      {
        id: 7,
        name: '베르겐 고어 구스다운 남성 롱패딩',
        brand: '디스커버리 익스페디션',
        image:
          'https://image.msscdn.net/images/goods_img/20221007/2848934/2848934_2_125.jpg',
        oldPrice: 750000,
        rating: 8,
        category: Category.outer,
        subCategory: SubCategory.padding,
      },
      {
        id: 8,
        name: '[27일하루특가] 남성 W 페트리트 패딩 재킷',
        brand: '디젤',
        image:
          'https://image.msscdn.net/images/goods_img/20220831/2757856/2757856_1_125.jpg',
        oldPrice: 750000,
        newPrice: 285000,
        rating: 9,
        label: Label.boutique,
        category: Category.outer,
        subCategory: SubCategory.jacket,
      },
    ],
  },
  accessToken: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export default sessionSlice;
export const { login, logout } = sessionSlice.actions;
