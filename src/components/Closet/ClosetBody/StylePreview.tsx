import styles from './StylePreview.module.scss';
// import more from '../../resources/image/more.svg';

interface StylePreviewProps {
  styleSingle: { id: number; image: string };
}

export default function StylePreview({ styleSingle }: StylePreviewProps) {
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
              src={styleSingle.image}
              alt="상품 이미지"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
