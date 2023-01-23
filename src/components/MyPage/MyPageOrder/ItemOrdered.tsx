import styles from './ItemOrdered.module.scss';
import { Purchase } from '../../../lib/interface';

interface ItemOrderedProps {
  purchase: Purchase;
  formatDate: (date: string | undefined) => string;
}

export default function ItemOrdered({
  purchase,
  formatDate,
}: ItemOrderedProps) {
  return (
    <div className={styles.grid_order}>
      <div className={styles.grid_header}>
        <div className={styles.Item}>
          <div className={styles.ImageDiv}>
            <img
              className={styles.previewImage}
              src={purchase.item.images[0]}
              alt="상품 이미지"
            />
          </div>
          <div className={styles.ItemInfo}>
            <div className={styles.InfoLine}>
              <span className={styles.brand}>{purchase.item.brand}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.name}>{purchase.item.name}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.size}>M</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grid_header}>
        {formatDate(purchase.createdDate)}
      </div>
      <div className={styles.grid_header}>{purchase.id}</div>
      <div className={styles.grid_header}>
        {purchase.payment?.toLocaleString()} 원
      </div>
      <div className={styles.grid_header}>
        <div className={styles.orderState}>
          <div className={styles.stateDiv}>입금확인</div>
          <div className={styles.buttonDiv}>
            <button>환불 요청</button>
            <button>교환 요청</button>
            <button>배송지 변경</button>
          </div>
        </div>
      </div>
    </div>
  );
}
