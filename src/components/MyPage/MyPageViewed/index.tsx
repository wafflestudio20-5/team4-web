import styles from './MyPageViewed.module.scss';
import ItemViewed from './ItemViewed';
import { useApiGetViewedListFetcher, useApiData } from '../../../lib/api';

export default function MyPageViewed({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const { data: viewedData } = useApiData(
    useApiGetViewedListFetcher(accessToken)
  );

  const recentlyViewed = viewedData?.recentItems ?? null;
  return (
    <div className={styles.wrapper}>
      <section id="order">
        <header className={styles.title}>
          <h2>최근 본 상품</h2>
        </header>
        Issue: user field (recentlyViewed)
        <ul className={styles.myRecent}>
          {recentlyViewed ? (
            recentlyViewed?.map((item) => <ItemViewed purchase={item} />)
          ) : (
            <div className={styles.none}>최근 구매내역이 없습니다.</div>
          )}
        </ul>
      </section>
    </div>
  );
}
