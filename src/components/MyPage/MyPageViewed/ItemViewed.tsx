import styles from './ItemViewed.module.scss';
import { Purchase } from '../../../lib/interface';
import { useNavigate } from 'react-router-dom';

export default function ItemViewed({ purchase }: { purchase: Purchase }) {
  const navigate = useNavigate();

  return (
    <div className={styles.itemPreview}>
      <div
        className={styles.CGoods}
        onClick={() => {
          navigate(`/goods/${purchase.item.id}`);
        }}
      >
        <div className={styles.image}>
          <img
            className={styles.previewImage}
            src={purchase.item.images[0]}
            alt="상품 이미지"
          />
        </div>
        <div className={styles.info}>
          <span className={styles.brand}>{purchase.item.brand}</span>
          <span className={styles.name}>{purchase.item.name}</span>
          <div className={styles.price}>
            {purchase.item.newPrice ? (
              <>
                <span className={styles.realPrice}>
                  {purchase.item.newPrice?.toLocaleString()}원
                </span>
                <del className={styles.crossedOutPrice}>
                  {purchase.item.oldPrice.toLocaleString()}원
                </del>
                <span className={styles.sale}>{purchase.item.sale}%</span>
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
      </div>
    </div>
  );
}
