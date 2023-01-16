import styles from './index.module.scss';
import OrderProductInfo from './OrderProductInfo';
import PurchasePageHeader from './PurchasePageHeader';
import OrderDelivery from './OrderDelivery';
import { Purchase } from '../../lib/interface';
import OrderPurchase from './OrderPurchase';
import { useLocation } from 'react-router-dom';

export default function PurchasePage() {
  const location = useLocation();
  const purchaseList = location.state.items;

  const sumPrice = (purchaseList: Purchase[]): number => {
    let sum = 0;

    for (var idx in purchaseList) {
      sum += purchaseList[idx].item.oldPrice;
    }

    return sum;
  };

  const sumSale = (purchaseList: Purchase[]): number => {
    let sale = 0;
    purchaseList.map((purchase) => {
      if (purchase.item.newPrice) {
        sale += purchase.item.newPrice - purchase.item.oldPrice;
      }
    });
    return sale;
  };

  return (
    <div className={styles.wrap}>
      <PurchasePageHeader />
      <form className={styles.f1}>
        <OrderDelivery />
        <OrderProductInfo purchaseList={purchaseList} />
        <OrderPurchase
          purchaseList={purchaseList}
          sumPrice={sumPrice(purchaseList)}
          sumSale={sumSale(purchaseList)}
        />
      </form>
    </div>
  );
}
