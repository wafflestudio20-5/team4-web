import styles from './OrderDelivery.module.scss';

export default function OrderDelivery() {
  return (
    <div className={styles.orderDelivery}>
      <div className={styles.orderDeliveryInner}>
        <h3 className={styles.orderTitle}>배송 정보</h3>
        <ul className={styles.orderList}>
          <li className={styles.orderItemDelivery}>
            <span className={styles.orderItemLabel}>배송지</span>
            <div className={styles.orderItemArea}>
              <span className={styles.orderTextAccent}>
                배송지를 등록해주세요
              </span>
              <button className={styles.orderButton}>배송지 추가</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
