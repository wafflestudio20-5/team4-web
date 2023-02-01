import { Style } from '../../lib/interface';
import styles from './StylePreview.module.scss';
import { useNavigate } from 'react-router-dom';
// import more from '../../resources/image/more.svg';

interface StylePreviewProps {
  styleSingle: Style;
}

export default function StylePreview({ styleSingle }: StylePreviewProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.itemPreview}>
      <div className={styles.CGoods}>
        <div className={styles.stylesWrap}>
          <div
            className={styles.image}
            // onClick={() => {
            //   스타일모달 디스패치;
            // }}
          >
            <img
              className={styles.previewImage}
              src={styleSingle.images[0]}
              alt="상품 이미지"
            />
          </div>
        </div>
        <div className={styles.stylesitem}>
          <div
            className={styles.stylesiteminfo}
            onClick={() => {
              navigate(`/goods/${styleSingle.items[0].id}`);
            }}
          >
            <div className={styles.imageDiv}>
              <img
                className={styles.styleItemImage}
                src={styleSingle.items[0].images[0]}
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
