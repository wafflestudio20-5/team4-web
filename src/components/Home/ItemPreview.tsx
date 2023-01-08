import styles from './ItemPreview.module.css';
import { Item } from '../../lib/interface';
import ItemLabel from './ItemLabel';

interface ItemPreviewProps {
  item: Item;
  idx: number;
}

export default function ItemPreview({ item, idx }: ItemPreviewProps) {
  return (
    <div className={styles.itemPreview}>
      {item?.label ? <ItemLabel label={item?.label}></ItemLabel> : null}
      <div className={styles.rank}>{idx + 1}위</div>
      <img className={styles.previewImage} src={item.image} alt="상품 이미지" />
      <div className={styles.brand}>{item.brand}</div>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.price}>
        {item.newPrice ? (
          <>
            <span className={styles.crossedOutPrice}>
              {item.oldPrice.toLocaleString()}원
            </span>
            <span className={styles.realPrice}>
              {item.newPrice?.toLocaleString()}원
            </span>
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
