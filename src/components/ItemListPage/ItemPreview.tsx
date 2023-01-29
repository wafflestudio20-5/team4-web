import { useNavigate } from 'react-router-dom';
import { Item } from '../../lib/interface';
import styles from './ItemPreview.module.css';

interface ItemPreviewProps {
  item: Item;
}

export default function ItemPreview({ item }: ItemPreviewProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.itemPreview}>
      <div
        className={styles.CGoods}
        onClick={() => {
          navigate(`/goods/${item.id}`);
        }}
      >
        <div className={styles.image}>
          <img
            className={styles.previewImage}
            src={item.images[0]}
            alt="상품 이미지"
          />
        </div>
        <div className={styles.info}>
          <span className={styles.brand}>{item.brand}</span>
          <span className={styles.name}>{item.name}</span>
          <div className={styles.price}>
            {item.newPrice ? (
              <>
                <span className={styles.realPrice}>
                  {item.newPrice?.toLocaleString()}원
                </span>
                <del className={styles.crossedOutPrice}>
                  {item.oldPrice.toLocaleString()}원
                </del>
                <span className={styles.sale}>{item.sale}%</span>
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
      </div>
    </div>
  );
}
