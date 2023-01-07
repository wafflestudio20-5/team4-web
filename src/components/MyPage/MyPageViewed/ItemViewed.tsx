import styles from './ItemViewed.module.scss';
import { Item } from '../../../lib/interface';

interface ItemPreviewProps {
  item: Item;
  idx: number;
}

export default function ItemViewed({ item, idx }: ItemPreviewProps) {
  return (
    <div className={styles.itemPreview}>
      <img className={styles.previewImage} src={item.image} alt="상품 이미지" />
      <div className={styles.brand}>{item.brand}</div>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.price}>
        {item.newPrice ? (
          <>
            <em className={styles.realPrice}>
              {item.newPrice?.toLocaleString()}원
            </em>
            <span className={styles.upto}>25%</span>
            <del className={styles.crossedOutPrice}>
              {item.oldPrice.toLocaleString()}원
            </del>
          </>
        ) : (
          <>
            <span className={styles.realPrice}>
              {item.oldPrice.toLocaleString()}원
            </span>
          </>
        )}
      </div>
    </div>
  );
}
