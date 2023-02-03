import ItemOrdered from './ItemOrdered';
import styles from './MyPageOrder.module.scss';
import { useApiGetPurchaseListFetcher, useApiData } from '../../../lib/api';
import { formatDate } from '../../../lib/formatters/dateTimeFormatter';
export default function MyPageOrder({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const { data: purchasesData } = useApiData(
    useApiGetPurchaseListFetcher(accessToken)
  );

  const purchases = purchasesData?.purchaseItems ?? null;

  return (
    <div className={styles.wrapper}>
      <section id="order">
        <header className={styles.title}>
          <h2>주문내역 조회</h2>
        </header>
        <div className={styles.grid_order}>
          <div className={styles.grid_header}>상품정보</div>
          <div className={styles.grid_header}>주문일자</div>
          <div className={styles.grid_header}>주문번호</div>
          <div className={styles.grid_header}>주문금액(수량)</div>
          <div className={styles.grid_header}>주문 상태</div>
        </div>
        {purchases && purchases?.length !== 0 ? (
          purchases.map((item) => (
            <ItemOrdered
              key={item.id}
              purchase={item}
              formatDate={formatDate}
            />
          ))
        ) : (
          <div className={styles.none}>주문 목록이 없습니다.</div>
        )}
      </section>
    </div>
  );
}
