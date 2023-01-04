import styles from './ItemOrdered.module.scss';
import { Item } from '../../../lib/interface';

interface ItemPreviewProps {
  item: Item;
  idx: number;
}

export default function ItemOrdered({ item, idx }: ItemPreviewProps) {
  return (
    // <div className={styles.itemPreview}>
    //   <img className={styles.previewImage} src={item.image} alt="상품 이미지" />
    //   <div className={styles.brand}>{item.brand}</div>
    //   <div className={styles.name}>{item.name}</div>
    //   <div className={styles.price}>
    //     {item.newPrice ? (
    //       <>
    //         <em className={styles.realPrice}>
    //           {item.newPrice?.toLocaleString()}원
    //         </em>
    //         <span className={styles.upto}>25%</span>
    //         <del className={styles.crossedOutPrice}>
    //           {item.oldPrice.toLocaleString()}원
    //         </del>
    //       </>
    //     ) : (
    //       <>
    //         <span className={styles.realPrice}>
    //           {item.oldPrice.toLocaleString()}원
    //         </span>
    //       </>
    //     )}
    //   </div>
    // </div>
    <div className={styles.grid_order}>
      <div className={styles.grid_header}>
        <img
          className={styles.previewImage}
          src={item.image}
          alt="상품 이미지"
        />
        <div>{item.brand}</div>
        <div>{item.name}</div>
      </div>
      <div className={styles.grid_header}>yyyy.mm.dd</div>
      <div className={styles.grid_header}>12345678</div>
      <div className={styles.grid_header}>
        {item.newPrice
          ? item.newPrice.toLocaleString()
          : item.oldPrice.toLocaleString()}
        원
      </div>
      <div className={styles.grid_header}>주문 상태</div>
    </div>
  );
}
