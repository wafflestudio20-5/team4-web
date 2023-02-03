import styles from './ItemOrdered.module.scss';
import { Purchase } from '../../../lib/interface';
import { useNavigate } from 'react-router-dom';

interface ItemOrderedProps {
  purchase: Purchase;
  formatDate: (date: string | undefined) => string;
}

export default function ItemOrdered({
  purchase,
  formatDate,
}: ItemOrderedProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.grid_order}>
      <div className={styles.grid_header}>
        <div className={styles.Item}>
          <div className={styles.ImageDiv}>
            <img
              className={styles.previewImage}
              src={purchase.item.images[0]}
              alt="상품 이미지"
              onClick={() => {
                navigate(`/goods/${purchase.item.id}`);
              }}
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
              <span className={styles.size}>{purchase.option}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grid_header}>
        {formatDate(purchase.createdDateTime)}
      </div>
      <div className={styles.grid_header}>{purchase.id}</div>
      <div className={styles.grid_header}>
        {purchase.payment?.toLocaleString()}원 ({purchase.quantity}개)
      </div>
      <div className={styles.grid_header}>
        <div className={styles.orderState}>
          <div className={styles.stateDiv}>구매확정</div>
        </div>
      </div>
    </div>
  );
}
