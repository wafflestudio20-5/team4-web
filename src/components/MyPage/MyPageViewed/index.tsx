import { User } from '../../../lib/interface';
import styles from './MyPageViewed.module.scss';
import ItemViewed from './ItemViewed';

interface MyPageMainProps {
  user: User;
}

export default function MyPageViewed({ user }: MyPageMainProps) {
  return (
    <div className={styles.wrapper}>
      <section id="order">
        <header className={styles.title}>
          <h2>최근 본 상품</h2>
        </header>
        <ul className={styles.myRecent}>
          {user.recentlyViewed ? (
            user.recentlyViewed?.map((item, idx) => (
              <ItemViewed item={item} idx={idx} />
            ))
          ) : (
            <div className={styles.none}>최근 구매내역이 없습니다.</div>
          )}
        </ul>
      </section>
    </div>
  );
}
