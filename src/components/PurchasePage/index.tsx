import styles from './index.module.scss';

export default function PurchasePage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.pagenation}>
        <div className={styles.nav_sub}>
          <a href="/">무신사 스토어</a>
          <span className={styles.iconEntity}>{'>'}</span>
          <span>주문서</span>
        </div>
      </div>
      <form className={styles.f1}>
        <div className={styles.rightContents}>
          <h2 className={styles.titlePage}>Order / Payment</h2>
          <div className={styles.pagesorting}>
            <a href="/cart">
              <span>장바구니</span>
            </a>
            <span>
              <span className={styles.iconEntity}>{'>'}</span>
            </span>
            <span className={styles.currentPage}>주문서</span>
            <span>
              <span className={styles.iconEntity}>{'>'}</span>
            </span>
            <span>주문 완료</span>
          </div>
        </div>
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
        <div className={styles.orderProductInfo}>
          <h3 className={styles.orderTitle}>상품 정보</h3>
          <table className={styles.tableBasicOrder}>
            <thead>
              <tr>
                <th scope="col">상품 정보</th>
                <th scope="col">수량</th>
                <th scope="col">상품 금액</th>
                <th scope="col">적립금</th>
                <th scope="col">상품 할인</th>
                <th scope="col">배송 그룹</th>
                <th scope="col">배송비</th>
                <th scope="col">주문금액</th>
              </tr>
            </thead>
          </table>
        </div>
      </form>
    </div>
  );
}
