import { User } from '../../../lib/interface';
import ItemOrdered from './ItemOrdered';
import styles from './MyPageOrder.module.scss';

interface MyPageMainProps {
  user: User;
}

export default function MyPageOrder({ user }: MyPageMainProps) {

  console.log(user.purchases);
  return (
    <div className={styles.wrapper}>
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
        </header>
        <div className={styles.grid_order}>
          <div className={styles.grid_header}>상품정보</div>
          <div className={styles.grid_header}>주문일자</div>
          <div className={styles.grid_header}>주문번호</div>
          <div className={styles.grid_header}>주문금액(수량)</div>
          <div className={styles.grid_header}>주문 상태</div>
        </div>
        {user.purchases ? (
          user.purchases.map((item, idx) => (
            <ItemOrdered item={item} idx={idx} />
          ))
        ) : (
          <div className={styles.none}>dd</div>
        )}
      </section>
    </div>
  );
}
