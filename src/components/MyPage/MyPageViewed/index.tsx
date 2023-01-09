import { User } from '../../../lib/interface';
import styles from './MyPageViewed.module.scss';
import ItemViewed from './ItemViewed';

interface MyPageViewedProps {
  user: User;
}

export default function MyPageViewed({ user }: MyPageViewedProps) {
  return (
    <div className={styles.wrapper}>
      <section id="order">
        <header className={styles.title}>
          <h2>최근 본 상품</h2>
        </header>
        {/* Issue: user field (recentlyViewed)
        <ul className={styles.myRecent}>
          {user.recentlyViewed ? (
            user.recentlyViewed?.map((item) => <ItemViewed item={item} />)
          ) : (
            <div className={styles.none}>최근 구매내역이 없습니다.</div>
          )}
        </ul>
          */}
      </section>
    </div>
  );
}
