import styles from './ShopppingCartHeader.module.scss';

export default function ShopppingCartHeader() {
  return (
    <>
      <div className={styles.pagenation}>
        <div className={styles.nav_sub}>
          <a href="/">무신사 스토어</a>
          <span className={styles.iconEntity}>{'>'}</span>
          <a href="/mypage">마이페이지</a>
          <span className={styles.iconEntity}>{'>'}</span>
          <span>장바구니</span>
        </div>
      </div>
      <div className={styles.rightContents}>
        <h2 className={styles.titlePage}>Order / Payment</h2>
        <div className={styles.pagesorting}>
          <span className={styles.currentPage}>장바구니</span>
          <span>
            <span className={styles.iconEntity}>{'>'}</span>
          </span>
          <span>주문서</span>
          <span>
            <span className={styles.iconEntity}>{'>'}</span>
          </span>
          <span>주문 완료</span>
        </div>
      </div>
    </>
  );
}
