import { Purchase } from '../../lib/interface';
import { apiPostPurchaseList } from '../../lib/api';
import { Session } from '../../lib/interface';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import styles from './OrderPurchase.module.scss';

export default function OrderPurchase({
  sumPrice,
  sumSale,
  purchaseList,
}: {
  sumPrice: number;
  sumSale: number;
  purchaseList: Purchase[];
}) {
  const finalprice = sumPrice + sumSale;

  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { accessToken } = session;

  const purchaseItems: {
    id: number;
    option: string | undefined;
    payment: number;
    quantity: number;
  }[] = purchaseList.map((purchase) => {
    return {
      id: purchase?.item.id,
      option: purchase?.option,
      payment: purchase.item?.newPrice
        ? purchase.item.newPrice * purchase.quantity
        : purchase.item.oldPrice * purchase.quantity,
      quantity: purchase?.quantity,
    };
  });

  return (
    <>
      <div className={styles.orderPurchase}>
        <h3 className={styles.ordertitle}>결제 정보</h3>
        <div className={styles.ordertable}>
          <div className={styles.orderline}>
            <div className={styles.lineleft}>총 상품 금액</div>
            <div className={styles.lineright}>
              {sumPrice.toLocaleString()} 원
            </div>
          </div>
          <div className={styles.orderline}>
            <div className={styles.lineleft}>회원 할인 합계</div>
            <div className={styles.lineright}>
              <span>{sumSale.toLocaleString()} 원</span>
            </div>
          </div>
          {/* <div className={styles.orderline}>
            <div className={styles.lineleft}>포인트 선할인</div>
            <div className={styles.lineright}>
              <button></button>
            </div>
          </div>
          <div className={styles.orderline}>
            <div className={styles.lineleft}>포인트 사용</div>
            <div className={styles.lineright}>
              <input></input>
            </div>
          </div>
          <div className={styles.orderline}>
            <div className={styles.lineleft}>할인 합계</div>
            <div className={styles.lineright}>
              {sumSale.toLocaleString()} 원
            </div>
          </div> */}
          <div className={styles.orderlinelast}>
            <div className={styles.lineleft}>최종 결제 금액</div>
            <div className={styles.lineright}>
              {finalprice.toLocaleString()} 원
            </div>
          </div>
        </div>
        <div className={styles.buttonDiv}>
          <button
            className={styles.purchaseButton}
            onClick={() => {
              apiPostPurchaseList(purchaseItems, accessToken);
            }}
          >
            {finalprice.toLocaleString()} 원 결제하기
          </button>
        </div>
      </div>
    </>
  );
}
