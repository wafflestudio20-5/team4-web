import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ReviewBox.module.scss';

export default function ReviewBox() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <img
            src="https://image.msscdn.net/mfile_s01/_simbols/_basic/k.png"
            alt=""
          />
        </div>
        <div className={styles.profile_text_wrapper}>
          <div className={styles.profile_text}>
            <p className={styles.profile_text_left}>honggildong</p>
            <p className={styles.profile_text_right}>11시간 전</p>
          </div>
          <div className={styles.profile_info}>
            <p>남성, 170cm, 70kg</p>
          </div>
        </div>
      </div>
      <div className={styles.purchase_info}>
        <div className={styles.purchase_item_image}>
          {/* 추후 수정 필요*/}
          <Link to="/">
            <img
              src="https://image.msscdn.net/images/goods_img/20220829/2752332/2752332_1_100.jpg"
              alt=""
            />
          </Link>
        </div>
        <div className={styles.purchase_item_text}>
          {/* 추후 수정 필요*/}
          <Link to="/" className={styles.purchase_item_info}>
            빅 어워드 스타디움 울 바시티자켓 블랙
          </Link>
          <p className={styles.purchase_option_info}>XL 구매</p>
        </div>
      </div>
    </div>
  );
}
