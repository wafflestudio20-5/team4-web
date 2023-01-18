import styles from './ItemListPageHeader.module.scss';

export default function ItemListPageHeader() {
  return (
    <>
      <div className={styles.pagenation}>
        <div className={styles.nav_sub}>
          <a href="/">무신사 스토어</a>
          <span className={styles.iconEntity}>{'>'}</span>
          <span>주문서</span>
        </div>
      </div>
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
    </>
  );
}
