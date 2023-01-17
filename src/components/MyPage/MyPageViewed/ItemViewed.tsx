import styles from './ItemViewed.module.scss';
import { Purchase } from '../../../lib/interface';
import { useNavigate } from 'react-router-dom';

export default function ItemViewed({ purchase }: { purchase: Purchase }) {
  const navigate = useNavigate();

  return (
    <div className={styles.itemPreview}>
      <img
        className={styles.previewImage}
        src={purchase.item.images[0]}
        alt="상품 이미지"
        onClick={() => {
          navigate(`/goods/${purchase.id}`);
        }}
      />
      <div className={styles.brand}>{purchase.item.brand}</div>
      <div
        className={styles.name}
        onClick={() => {
          navigate(`/goods/${purchase.id}`);
        }}
      >
        {purchase.item.name}
      </div>

      <div className={styles.price}>
        {purchase.item.newPrice ? (
          <>
            <em className={styles.realPrice}>
              {purchase.item.newPrice?.toLocaleString()}원
            </em>
            <span className={styles.upto}>25%</span>
            <del className={styles.crossedOutPrice}>
              {purchase.item.oldPrice.toLocaleString()}원
            </del>
          </>
        ) : (
          <>
            <span className={styles.realPrice}>
              {purchase.item.oldPrice.toLocaleString()}원
            </span>
          </>
        )}
      </div>
    </div>
  );
}
