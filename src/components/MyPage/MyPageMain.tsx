import { User } from '../../lib/interface';
import styles from './MyPageMain.module.scss';

interface MyPageMainProps {
  user: User;
}

function OrderBlock() {
  return (
    <section id="order">
      <header className={styles.title}>
        <h2>주문내역 조회</h2>
        <ul>
          <li>
            <span>입금/결제 0</span>
          </li>
          <li>
            <span>배송중/픽업대기 0</span>
          </li>
          <li>
            <span>배송완료/픽업완료 0</span>
          </li>
          <li>
            <span>구매확정 0</span>
          </li>
        </ul>
        <span className={styles.clickable}>전체</span>
      </header>
      <div className={styles.grid}>
        <div className={styles.grid_header}>상품정보</div>
        <div className={styles.grid_header}>주문일자</div>
        <div className={styles.grid_header}>주문번호</div>
        <div className={styles.grid_header}>주문금액(수량)</div>
        <div className={styles.grid_header}>주문 상태</div>
      </div>
      <div className={styles.none}>최근 구매내역이 없습니다.</div>
    </section>
  );
}

export default function MyPageMain({ user }: MyPageMainProps) {
  return (
    <div className={styles.wrapper}>
      <OrderBlock />
    </div>
  );
}
