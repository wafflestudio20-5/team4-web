import React from 'react';
import { Style } from '../../lib/interface';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../store/slices/modal';
import styles from './StylePreview.module.scss';
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
                // onClick={() => {
                //   navigate(이사람 옷장);
                // }}
              />
              <div
                className={styles.stylesUserNickName}
                // onClick={() => {
                //   navigate(이사람 옷장);
                // }}
              >
                {styleSingle.user.nickname}
              </div>
            </div>
            <div className={styles.styleUserFollow}>
              <div className={styles.styleUserFollowDiv}>팔로우</div>
              <div className={styles.styleUserMoreDiv}>
                <img src={more} alt="추가 옵션 버튼" />
              </div>
            </div>
          </div>

          <div className={styles.image} onClick={onModalOpen}>
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
