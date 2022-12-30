import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../lib/interface';
import styles from './MyPageUserInfo.module.scss';

interface MyPageUserInfoProps {
  user: User;
  onLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MyPageUserInfo({
  user,
  onLogout,
}: MyPageUserInfoProps) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.title} to="/mypage">
        My Page
      </Link>
      <div className={styles.nav}>
        <Link className={styles.nav_link} to="/cart">
          장바구니
        </Link>
        <Link className={styles.nav_link} to="/customercenter">
          고객센터
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
          <div>
            <strong>{user.nickname}</strong>
            <Link to="/mypage/info">회원정보변경</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
