import styles from './ItemPreview.module.css';
import { Item } from '../../lib/interface';
import ItemLabel from './ItemLabel';
import { Navigate, useNavigate } from 'react-router-dom';

interface ItemPreviewProps {
  item: Item;
  idx: number;
}

export default function ItemPreview({ item, idx }: ItemPreviewProps) {
  const navigate = useNavigate();
  // 추후 최근 본 상품에 추가 등 로직 복잡해질 수 있어서 Link말고 navigate로 구현

  return (
    <div
      className={styles.itemPreview}
      onClick={() => {
        navigate(`/goods/${item.id}`);
      }}
    >
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
