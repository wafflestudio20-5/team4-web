import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../lib/interface';
import styles from './MyPageHeader.module.scss';
import point from '../../../resources/image/saving.png';
import review from '../../../resources/image/write.png';

export interface MyPageHeaderProps {
  user: User;
  onLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MyPageHeader({ user, onLogout }: MyPageHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.title} to="/mypage">
        My Page
      </Link>
      <div className={styles.nav}>
        <Link className={styles.nav_link} to="/cart">
          장바구니
        </Link>
        <button className={styles.nav_link} onClick={onLogout}>
          로그아웃
        </button>
      </div>
      <div className={styles.main}>
        <img
          className={styles.image}
          src="https://image.msscdn.net/mfile_s01/_simbols/_basic/s.png"
          alt="이미지 없음"
        />
        <div className={styles.info}>
          <div className={styles.name}>
            <strong>{user.nickname}</strong>
            <Link to="/mypage/info">회원정보변경</Link>
          </div>
          <div className={styles.flex}>
            <div className={styles.level}>LV.1 멤버</div>
            <span className={styles.date}>
              가입일 : {user.registrationDate}
            </span>
          </div>
          <div className={styles.bottom}>
            <Link to="/mypage/point">
              <img src={point} alt="적립금" />
              <span>적립금 {'>'}</span>
              <strong>4,333</strong>
            </Link>
            <Link to="/mypage/review">
              <img src={review} alt="후기작성" />
              <span>후기작성 {'>'}</span>
              <strong>0</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
