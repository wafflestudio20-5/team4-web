import React from 'react';
import { StyleData } from '../../lib/interface';
import styles from './StyleModalLayout.module.scss';
import close from '../../resources/image/close.png';
import like from '../../resources/image/like.png';

interface StyleModalHeaderProps {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function StyleModalHeader({ onClose }: StyleModalHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        <img
          className={styles.profile_image}
          src="https://image.msscdn.net/mfile_s01/_simbols/_basic/c.png"
          alt=""
        />
        <div className={styles.profile_text}>
          <h3 className={styles.profile_nickname}>cococo</h3>
          <div className={styles.profile_userinfo}>160cm · 50kg</div>
        </div>
      </div>
      <button className={styles.close_button} onClick={onClose}>
        <img src={close} alt="닫기" />
      </button>
    </div>
  );
}

function StyleModalContent() {
  return (
    <div className={styles.content}>
      <div className={styles.content_text_wrapper}>
        <span className={styles.content_text}>어쩌고 저쩌고</span>
        <span className={styles.content_hashtag}>{'#ootd #outfit'}</span>
      </div>
      <div className={styles.like_box_wrapper}>
        <div className={styles.like_box}>
          <div className={styles.like_icon}>
            <img src={like} alt="like" />
          </div>
          <div className={styles.like_count}>
            <span>3</span>
          </div>
        </div>
      </div>
      <span className={styles.style_created_time}>5시간 전</span>
    </div>
  );
}

function StyleModalItem() {
  return (
    <div className={styles.item_wrapper}>
      <div className={styles.item_image}>
        <img
          src="https://image.msscdn.net/images/goods_img/20230125/3036796/3036796_16746132910861_320.jpg"
          alt="상품 이미지"
        />
      </div>
      <div className={styles.item_info}>
        <div className={styles.item_info_text}>
          <span className={styles.item_info_brand}>피그먼트</span>
          <span className={styles.item_info_name}>
            {'윈터비조 스커트(PBBW-WSKW004)'}
          </span>
        </div>
        <div className={styles.item_info_price}>
          41,300원 <span className={styles.item_info_sale}>30%</span>
        </div>
      </div>
    </div>
  );
}

interface StyleModalLayoutProps {
  open: boolean;
  data: StyleData;
  visible: boolean;
  outside: React.MutableRefObject<null>;
  onClose: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onOuterClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function StyleModalLayout({
  open,
  data,
  visible,
  outside,
  onClose,
  onOuterClick,
}: StyleModalLayoutProps) {
  console.log(data);

  return (
    <>
      {visible && (
        <div
          ref={outside}
          onClick={onOuterClick}
          className={`${styles.wrapper} ${open ? styles.open : styles.close}`}
        >
          <div className={styles.modal}>
            <div className={styles.images}></div>
            <div className={styles.body}>
              <StyleModalHeader onClose={onClose} />
              <div className={styles.scrollable}>
                <StyleModalContent />
                <StyleModalItem />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
