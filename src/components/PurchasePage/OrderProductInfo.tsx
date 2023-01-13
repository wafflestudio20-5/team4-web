import styles from './OrderProductInfo.module.scss';
import { Purchase } from '../../lib/interface';

interface OrderProductInfoProps {
  purchaseList: Purchase[];
}

export default function OrderProductInfo({
  purchaseList,
}: OrderProductInfoProps) {
  return (
    <>
      <div className={styles.orderProductInfo}>
        <h3 className={styles.orderTitle}>상품 정보</h3>
        <table className={styles.tableBasicOrder}>
          <thead>
            <tr>
              <th className={styles.th1}>상품 정보</th>
              <th className={styles.th2}>수량</th>
              <th className={styles.th3}>적립금</th>
              <th className={styles.th4}>상품 할인</th>
              <th className={styles.th5}>배송비</th>
              <th className={styles.th6}>주문금액</th>
            </tr>
          </thead>
          <tbody>
            {purchaseList.map((purchase) => (
              <PurchaseItem purchase={purchase} />
            ))}
          </tbody>
        </table>
        <div className={styles.announcement}>
          <div>
            <ul>
              <li>
                · 구매 가능 수량이 1개로 제한된 상품은 주문 취소 시, 24시간 내
                가상계좌 재주문이 불가합니다.
              </li>
              <li>
                · 무신사 스토어는 기본적으로 대한민국 내 제주도 및 도서 산간
                지역 포함 <span>전 지역, 전 상품 무료배송입니다.</span>
              </li>
              <li>
                · 해외 배송 상품이나 일부 업체의 경우, 교환/환불 시 반송료가
                다를 수 있으며 상품 페이지에 별도 표기되어 있습니다.
              </li>
              <li>
                · 2개 이상의 브랜드(업체) 상품을 주문하신 경우, 각 개별
                배송됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function PurchaseItem({ purchase }: { purchase: Purchase }) {
  return (
    <tr key={purchase.item.id}>
      <th>
        <div className={styles.Item}>
          <div className={styles.ImageDiv}>
            <img
              className={styles.previewImage}
              src={purchase.item.images[0]}
              alt="상품 이미지"
            />
          </div>
          <div className={styles.ItemInfo}>
            <div>
              <span className={styles.brand}>[{purchase.item.brand}]</span>
              <span className={styles.name}>{purchase.item.name}</span>
            </div>
            <div className={styles.InfoLine}>
              <div className={styles.option}>옵션 : {purchase.option}</div>
            </div>
          </div>
        </div>
      </th>
      <th>{purchase.quantity} 개</th>
      <th>
        {purchase.item.newPrice
          ? `${Math.ceil(purchase.item.newPrice / 20).toLocaleString()}원`
          : `${Math.ceil(purchase.item.oldPrice / 20).toLocaleString()}원`}
      </th>
      <th>
        {purchase.item.newPrice
          ? `${(
              purchase.item.newPrice - purchase.item.oldPrice
            ).toLocaleString()}원`
          : -0}
      </th>
      <th>무료</th>
      <th>
        {purchase.item.newPrice ? (
          <>
            <del>{purchase.item.oldPrice?.toLocaleString()}원</del>
            <em>{purchase.item.newPrice?.toLocaleString()}원</em>
          </>
        ) : (
          <em>{purchase.item.oldPrice.toLocaleString()}원</em>
        )}
      </th>
    </tr>
  );
}
