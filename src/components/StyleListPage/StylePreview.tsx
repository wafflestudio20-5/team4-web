import { Style } from '../../lib/interface';
import styles from './StylePreview.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../store/slices/modal';
import more from '../../resources/image/more.svg';

interface StylePreviewProps {
  styleSingle: Style;
}

export default function StylePreview({ styleSingle }: StylePreviewProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setOpen(styleSingle.id));
  };

  return (
    <div className={styles.itemPreview}>
      <div className={styles.CGoods}>
        <div className={styles.stylesWrap}>
          <div className={styles.stylesUser}>
            <div className={styles.stylesUserProfile}>
              <img
                className={styles.styleItemImage}
                src={styleSingle.user.image}
                alt="상품 이미지"
                onClick={() => {
                  navigate(`/closet/${styleSingle.user.id}`);
                }}
              />
              <div
                className={styles.stylesUserNickName}
                onClick={() => {
                  navigate(`/closet/${styleSingle.user.id}`);
                }}
              >
                {styleSingle.user.nickname}
              </div>
            </div>
            <div className={styles.styleUserFollow}>
              <div className={styles.styleUserMoreDiv}>
                <img src={more} alt="추가 옵션 버튼" />
              </div>
            </div>
          </div>
          <div
            className={styles.image}
            onClick={(e) => {
              onModalOpen(e);
            }}
          >
            <img
              className={styles.previewImage}
              src={styleSingle.images[0]}
              alt="상품 이미지"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
