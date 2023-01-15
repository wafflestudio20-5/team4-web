import styles from './index.module.scss';
import OrderProductInfo from './OrderProductInfo';
import PurchasePageHeader from './PurchasePageHeader';
import OrderDelivery from './OrderDelivery';
import { Category, Label, Purchase, SubCategory } from '../../lib/interface';
import OrderPurchase from './OrderPurchase';

export default function PurchasePage() {
  // shoppingcart & DetailPage 에서 uselocation을 통해 {Item, option, quantity}[] 받아오기
  const purchaseList: Purchase[] = [
    {
      item: {
        id: 0,
        sex: 'female',
        name: '여성 슬러치 바나나 숄더백 - 다크 브라운',
        brand: '더 로우',
        images: [
          'https://image.msscdn.net/images/goods_img/20220722/2678023/2678023_1_125.jpg',
        ],
        rating: 7,
        oldPrice: 1944000,
        sale: 44,
        newPrice: 1090000,
        label: Label.boutique,
        category: Category.bag,
        subCategory: SubCategory.crossBag,
      },
      option: 'M',
      quantity: 1,
    },
    {
      item: {
        id: 1,
        sex: 'male',
        name: '베르겐 고어 구스다운 남성 롱패딩',
        brand: '디스커버리 익스페디션',
        images: [
          'https://image.msscdn.net/images/goods_img/20221007/2848934/2848934_2_125.jpg',
        ],
        rating: 8,
        oldPrice: 750000,
        category: Category.outer,
        subCategory: SubCategory.padding,
      },
      option: 'L',
      quantity: 1,
    },
    {
      item: {
        id: 2,
        sex: 'male',
        name: '[27일하루특가] 남성 W 페트리트 패딩 재킷',
        brand: '디젤',
        images: [
          'https://image.msscdn.net/images/goods_img/20220831/2757856/2757856_1_125.jpg',
        ],
        oldPrice: 750000,
        sale: 62,
        newPrice: 285000,
        rating: 9,
        label: Label.boutique,
        category: Category.outer,
        subCategory: SubCategory.jacket,
      },
      option: 'L',
      quantity: 2,
    },
  ];

  return (
    <div className={styles.wrap}>
      <PurchasePageHeader />
      <form className={styles.f1}>
        <OrderDelivery />
        <OrderProductInfo purchaseList={purchaseList} />
        <OrderPurchase />
      </form>
    </div>
  );
}
