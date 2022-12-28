import styles from './itemPreview.module.css';
import { Item } from '../../lib/interface';

interface ItemPreviewProps {
  item: Item;
  idx: number;
}

export default function ItemPreview({ item, idx }: ItemPreviewProps) {
  return (
    <div className={styles.itemPreview}>
      <div className={styles.rank}>{idx + 1}위</div>
      <img className={styles.previewImage} src={item.image} alt="상품 이미지" />
      <div className={styles.brand}>{item.brand}</div>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.price}>
        {item.newPrice ? (
          <>
            <span className={styles.oldPrcie}>
              {item.oldPrice.toLocaleString()}원
            </span>
            <span className={styles.newPrcie}>
              {item.newPrice?.toLocaleString()}원
            </span>
          </>
        ) : (
          <>
            <span className={styles.newPrcie}>
              {item.oldPrice.toLocaleString()}원
            </span>
          </>
        )}
      </div>
    </div>
  );
}
