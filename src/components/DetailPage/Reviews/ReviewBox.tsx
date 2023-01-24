import React from 'react';
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
    </div>
  );
}
