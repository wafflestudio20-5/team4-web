import { Style } from '../../lib/interface';
import styles from './StylePreview.module.scss';
import { useNavigate } from 'react-router-dom';

interface StylePreviewProps {
  styleSingle: Style;
}

export default function ItemPreview({ styleSingle }: StylePreviewProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.itemPreview}>
      <div
        className={styles.CGoods}
        // onClick={() => {
        //   스타일모달 디스패치;
        // }}
      >
        <div className={styles.image}>
          <img
            className={styles.previewImage}
            src={styleSingle.images[0]}
            alt="상품 이미지"
          />
        </div>
        <div
          className={styles.stylesitem}
          onClick={() => {
            navigate(`/goods/${styleSingle.items[0].id}`);
          }}
        >
          <div className={styles.stylesiteminfo}>
            <div className={styles.imageDiv}>
              <img
                className={styles.styleItemImage}
                src={styleSingle.items[0].image}
                alt="상품 이미지"
              />
            </div>
            <div className={styles.infoDiv}>
              <div className={styles.infoLine}>
                <div>{styleSingle.items[0].brand}</div>
              </div>
              <div className={styles.infoLine}>
                <div>{styleSingle.items[0].name}</div>
              </div>
              <div className={styles.infoLine}>
                {styleSingle.items[0].newPrice ? (
                  <>
                    <span className={styles.realPrice}>
                      {styleSingle.items[0].newPrice?.toLocaleString()}원
                    </span>
                    <del className={styles.crossedOutPrice}>
                      {styleSingle.items[0].oldPrice.toLocaleString()}원
                    </del>
                    <span className={styles.sale}>
                      {styleSingle.items[0].sale}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className={styles.realPrice}>
                      {styleSingle.items[0].oldPrice.toLocaleString()}원
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
