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
      <div id="order">
        <header className={styles.title}>
          <h2>최근 본 상품</h2>
        </header>
        {recentlyViewed && recentlyViewed.length !== 0 ? (
          <div className={styles.myRecent}>
            {recentlyViewed?.map((item) => (
              <ItemViewed key={item.id} purchase={item} />
            ))}
          </div>
        ) : (
          <div className={styles.none}>최근 본 상품이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
