import styles from './ItemOrdered.module.scss';
import { Item } from '../../../lib/interface';

interface ItemOrderedProps {
  item: Item;
}

export default function ItemOrdered({ item }: ItemOrderedProps) {
  return (
    <div className={styles.grid_order}>
      <div className={styles.grid_header}>
        <div className={styles.Item}>
          <div className={styles.ImageDiv}>
            <img
              className={styles.previewImage}
              src={item.images[0]}
              alt="상품 이미지"
            />
          </div>
          <div className={styles.ItemInfo}>
            <div className={styles.InfoLine}>
              <span className={styles.brand}>{item.brand}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.name}>{item.name}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.size}>M</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grid_header}>yyyy.mm.dd</div>
      <div className={styles.grid_header}>12345678</div>
      <div className={styles.grid_header}>
        {item.newPrice
          ? item.newPrice.toLocaleString()
          : item.oldPrice.toLocaleString()}
        원
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
