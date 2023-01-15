import { useState } from 'react';
import styles from './OrderPurchase.module.scss';

export default function OrderPurchase({
  sumPrice,
  sumSale,
}: {
  sumPrice: number;
  sumSale: number;
}) {
  const [price, setPrice] = useState({
    postPoint: 0,
    userPoint: 0,
    finalprice: 1000000,
  });

  return (
    <>
      <div className={styles.orderPurchase}>
        <h3 className={styles.ordertitle}>결제 정보</h3>
        <div className={styles.ordertable}>
          <div className={styles.orderline}>
            <div className={styles.lineleft}>상품 금액</div>
            <div className={styles.lineright}>
              {sumPrice.toLocaleString()} 원
            </div>
          </div>
          <div className={styles.orderline}>
            <div className={styles.lineleft}>상품 할인</div>
            <div className={styles.lineright}>
              <span>{sumSale.toLocaleString()} 원</span>
            </div>
          </div>
          <div className={styles.orderline}>
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
          </div>
          <div className={styles.orderlinelast}>
            <div className={styles.lineleft}>최종 결제 금액</div>
            <div className={styles.lineright}>
              {price.finalprice.toLocaleString()} 원
            </div>
          </div>
        </div>
        <div className={styles.buttonDiv}>
          <button className={styles.purchaseButton}>
            {price.finalprice.toLocaleString()} 원 결제하기
          </button>
        </div>
      </div>
    </>
  );
}
