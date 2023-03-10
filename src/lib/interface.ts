export interface User {
  id: number;
  image: string;
  username: string;
  nickname: string;
  reviewCount: number;
  description?: string;
  instaUsername?: string;
  registrationDate: string;
  height?: number;
  weight?: number;
  sex?: string;
  socialKey?: string;
}

export interface SimpleUser {
  id: number;
  username: string;
  nickname: string;
  image: string;
}

export interface Session {
  user: User | null | undefined;
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
  user: User;
  createdDateTime?: string;
  payment?: number;
  quantity: number;
  option?: string;
  isReviewed?: boolean;
}

export interface Review {
  id: number;
  user: User;
  content: string;
  createdDateTime: string;
  modifiedDateTime?: string;
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
  modifiedDateTime: string;
}

export interface Inquiry {
  id: number;
  item: Item;
  user: User;
  isAnswered: boolean;
  type: InquiryType;
  option?: string;
  title: string;
  content: string;
  comment?: string;
  images: string[];
  isSecret: boolean;
  createdDateTime: string;
  modifiedDateTime?: string;
}

export interface Style {
  id: number;
  user: User;
  images: string[];
  items: Item[];
  content?: string;
  hashtag?: string;
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
      return '?????? ??????';
    case Label.boutique:
      return '?????????';
    case Label.preorder:
      return '?????????';
    case Label.exclusive:
      return '????????? ??????';
    default:
      throw new Error('Unknown Label: ' + label);
  }
}

export function displayCategory(category: Category) {
  switch (category) {
    case Category.top:
      return '??????';
    case Category.outer:
      return '?????????';
    case Category.pants:
      return '??????';
    case Category.skirt:
      return '?????????';
    case Category.bag:
      return '??????';
    case Category.shoes:
      return '??????';
    case Category.headWear:
      return '??????';
    default:
      throw new Error('Unknown Category: ' + category);
  }
}

export function displayCategoryIncludeBest(category: CategoryIncludeBest) {
  switch (category) {
    case Best.best:
      return '??????';
    case Category.top:
      return '??????';
    case Category.outer:
      return '?????????';
    case Category.pants:
      return '??????';
    case Category.skirt:
      return '?????????';
    case Category.bag:
      return '??????';
    case Category.shoes:
      return '??????';
    case Category.headWear:
      return '??????';
    default:
      throw new Error('Unknown Category: ' + category);
  }
}

export function displaySubCategory(subcategory: SubCategory) {
  switch (subcategory) {
    case SubCategory.sweater:
      return '?????????';
    case SubCategory.hoodie:
      return '?????? ?????????';
    case SubCategory.sweatShirt:
      return '???????????????';
    case SubCategory.shirt:
      return '??????';
    case SubCategory.coat:
      return '??????';
    case SubCategory.jacket:
      return '??????';
    case SubCategory.padding:
      return '??????';
    case SubCategory.cardigan:
      return '?????????';
    case SubCategory.denim:
      return '?????? ??????';
    case SubCategory.slacks:
      return '?????????';
    case SubCategory.jogger:
      return '?????? ??????';
    case SubCategory.leggings:
      return '?????????';
    case SubCategory.miniSkirt:
      return '???????????????';
    case SubCategory.mediSkirt:
      return '???????????????';
    case SubCategory.longSkirt:
      return '????????????';
    case SubCategory.backpack:
      return '??????';
    case SubCategory.crossBag:
      return '????????? ???';
    case SubCategory.echoBag:
      return '?????????';
    case SubCategory.goodoo:
      return '??????';
    case SubCategory.sandal:
      return '??????';
    case SubCategory.slipper:
      return '?????????';
    case SubCategory.sneakers:
      return '????????????';
    case SubCategory.cap:
      return '???';
    case SubCategory.hat:
      return '??????/????????????';
    case SubCategory.beanie:
      return '??????';
    default:
      throw new Error('Unknown SubCategory: ' + subcategory);
  }
}

export function getCategorybySubCategory(subcategory: SubCategory) {
  switch (subcategory) {
    case SubCategory.sweater:
      return Category.top;
    case SubCategory.hoodie:
      return Category.top;
    case SubCategory.sweatShirt:
      return Category.top;
    case SubCategory.shirt:
      return Category.top;
    case SubCategory.coat:
      return Category.outer;
    case SubCategory.jacket:
      return Category.outer;
    case SubCategory.padding:
      return Category.outer;
    case SubCategory.cardigan:
      return Category.outer;
    case SubCategory.denim:
      return Category.pants;
    case SubCategory.slacks:
      return Category.pants;
    case SubCategory.jogger:
      return Category.pants;
    case SubCategory.leggings:
      return Category.pants;
    case SubCategory.miniSkirt:
      return Category.skirt;
    case SubCategory.mediSkirt:
      return Category.skirt;
    case SubCategory.longSkirt:
      return Category.skirt;
    case SubCategory.backpack:
      return Category.bag;
    case SubCategory.crossBag:
      return Category.bag;
    case SubCategory.echoBag:
      return Category.bag;
    case SubCategory.goodoo:
      return Category.shoes;
    case SubCategory.sandal:
      return Category.shoes;
    case SubCategory.slipper:
      return Category.shoes;
    case SubCategory.sneakers:
      return Category.shoes;
    case SubCategory.cap:
      return Category.headWear;
    case SubCategory.hat:
      return Category.headWear;
    case SubCategory.beanie:
      return Category.headWear;
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
      return '???';
    case 'female':
      return '???';
    case 'both':
      return '??? , ???';
    default:
      throw new Error('Unknown sex: ' + sex);
  }
}
