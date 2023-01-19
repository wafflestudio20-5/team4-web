export interface User {
  id: number;
  image: string;
  username: string;
  nickname: string;
  reviewCount: number;
  description: string;
  registrationDate: string;
  sex?: string;
  height?: number;
  weight?: number;
  socialKey?: string;
}

export interface Session {
  user: User | null;
  accessToken: string | null;
}

export interface Item {
  id: number;
  sex: string;
  name: string;
  brand: string;
  images: string[];
  rating: number;
  oldPrice: number;
  sale?: number;
  options?: string[];
  newPrice?: number;
  label?: Label;
  category: Category;
  subCategory: SubCategory;
  reviewCount: number;
}

export interface Purchase {
  id: number;
  item: Item;
  createdDate?: string;
  payment?: number;
  quantity: number;
  option?: string;
}

export interface Review {
  id: number;
  user: User;
  content: string;
  createdDateTime: string;
  size: string;
  color: string;
  rating: number;
  purchase: Purchase;
  comments: Comment[];
  images: string[];
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  createdDateTime: string;
}

export interface Inquiry {
  id: number;
  user: User;
  isAnswered: boolean;
  type: InquiryType;
  options: string[];
  title: string;
  content: string;
  images: string[];
  isSecret: boolean;
  createdDateTime: string;
}

export enum InquiryType {
  size = 'size',
  delivery = 'delivery',
  restock = 'restock',
  detail = 'detail',
}

export enum Label {
  limited = 'limited',
  boutique = 'boutique',
  preorder = 'preorder',
  exclusive = 'exclusive',
}

export enum Category {
  top = 'top',
  outer = 'outer',
  pants = 'pants',
  skirt = 'skirt',
  bag = 'bag',
  shoes = 'shoes',
  headWear = 'headWear',
}

export enum SubCategory {
  sweater = 'sweater',
  hoodie = 'hoodie',
  sweatShirt = 'sweatShirt',
  shirt = 'shirt',
  coat = 'coat',
  jacket = 'jacket',
  padding = 'padding',
  cardigan = 'cardigan',
  denim = 'denim',
  slacks = 'slacks',
  jogger = 'jogger',
  leggings = 'leggings',
  miniSkirt = 'miniSkirt',
  mediSkirt = 'mediSkirt',
  longSkirt = 'longSkirt',
  backpack = 'backpack',
  crossBag = 'crossBag',
  echoBag = 'echoBag',
  goodoo = 'goodoo',
  sandal = 'sandal',
  slipper = 'slipper',
  sneakers = 'sneakers',
  cap = 'cap',
  hat = 'hat',
  beanie = 'beanie',
}

export enum Best {
  best = 'best',
}

export type CategoryIncludeBest = Category | Best;

export function displayLabel(label: Label) {
  switch (label) {
    case Label.limited:
      return '한정 판매';
    case Label.boutique:
      return '부티크';
    case Label.preorder:
      return '선발매';
    case Label.exclusive:
      return '무신사 단독';
    default:
      throw new Error('Unknown Label: ' + label);
  }
}

export function displayCategory(category: Category) {
  switch (category) {
    case Category.top:
      return '상의';
    case Category.outer:
      return '아우터';
    case Category.pants:
      return '바지';
    case Category.skirt:
      return '스커트';
    case Category.bag:
      return '가방';
    case Category.shoes:
      return '신발';
    case Category.headWear:
      return '모자';
    default:
      throw new Error('Unknown Category: ' + category);
  }
}

export function displayCategoryIncludeBest(category: CategoryIncludeBest) {
  switch (category) {
    case Best.best:
      return '인기';
    case Category.top:
      return '상의';
    case Category.outer:
      return '아우터';
    case Category.pants:
      return '바지';
    case Category.skirt:
      return '스커트';
    case Category.bag:
      return '가방';
    case Category.shoes:
      return '신발';
    case Category.headWear:
      return '모자';
    default:
      throw new Error('Unknown Category: ' + category);
  }
}

export function displaySubCategory(subcategory: SubCategory) {
  switch (subcategory) {
    case SubCategory.sweater:
      return '스웨터';
    case SubCategory.hoodie:
      return '후드 티셔츠';
    case SubCategory.sweatShirt:
      return '스웨트셔츠';
    case SubCategory.shirt:
      return '셔츠';
    case SubCategory.coat:
      return '코트';
    case SubCategory.jacket:
      return '재킷';
    case SubCategory.padding:
      return '패딩';
    case SubCategory.cardigan:
      return '카디건';
    case SubCategory.denim:
      return '데님 팬츠';
    case SubCategory.slacks:
      return '슬랙스';
    case SubCategory.jogger:
      return '조거 팬츠';
    case SubCategory.leggings:
      return '레깅스';
    case SubCategory.miniSkirt:
      return '미니스커트';
    case SubCategory.mediSkirt:
      return '미디스커트';
    case SubCategory.longSkirt:
      return '롱스커트';
    case SubCategory.backpack:
      return '백팩';
    case SubCategory.crossBag:
      return '크로스 백';
    case SubCategory.echoBag:
      return '에코백';
    case SubCategory.goodoo:
      return '구두';
    case SubCategory.sandal:
      return '샌들';
    case SubCategory.slipper:
      return '슬리퍼';
    case SubCategory.sneakers:
      return '스니커즈';
    case SubCategory.cap:
      return '캡';
    case SubCategory.hat:
      return '버킷/사파리햇';
    case SubCategory.beanie:
      return '비니';
    default:
      throw new Error('Unknown SubCategory: ' + subcategory);
  }
}
export function SubCategoryInCategory(category: CategoryIncludeBest) {
  switch (category) {
    case Best.best:
      return [
        SubCategory.coat,
        SubCategory.backpack,
        SubCategory.shirt,
        SubCategory.slacks,
      ];

    case Category.top:
      return [
        SubCategory.sweater,
        SubCategory.hoodie,
        SubCategory.sweatShirt,
        SubCategory.shirt,
      ];
    case Category.outer:
      return [
        SubCategory.coat,
        SubCategory.jacket,
        SubCategory.padding,
        SubCategory.cardigan,
      ];
    case Category.pants:
      return [
        SubCategory.denim,
        SubCategory.slacks,
        SubCategory.jogger,
        SubCategory.leggings,
      ];
    case Category.skirt:
      return [
        SubCategory.miniSkirt,
        SubCategory.mediSkirt,
        SubCategory.longSkirt,
      ];
    case Category.bag:
      return [SubCategory.backpack, SubCategory.crossBag, SubCategory.echoBag];
    case Category.shoes:
      return [
        SubCategory.goodoo,
        SubCategory.sandal,
        SubCategory.slipper,
        SubCategory.sneakers,
      ];
    case Category.headWear:
      return [SubCategory.cap, SubCategory.hat, SubCategory.beanie];
    default:
      throw new Error('Unknown Category: ' + category);
  }
}

export function displaySex(sex: string) {
  switch (sex) {
    case 'male':
      return '남';
    case 'female':
      return '여';
    case 'both':
      return '남 , 여';
    default:
      throw new Error('Unknown sex: ' + sex);
  }
}
