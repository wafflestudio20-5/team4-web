import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../lib/interface';
import styles from './MyPageUserInfo.module.scss';
import point from '../../../resources/image/saving.png';
import review from '../../../resources/image/write.png';
import { formatDate } from '../../../lib/formatters/dateFormatter';

export interface MyPageUserInfoProps {
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
        <button className={styles.nav_link} onClick={onLogout}>
          로그아웃
        </button>
      </div>
      <div className={styles.main}>
        <img className={styles.image} src={user.image} alt="이미지 로딩 실패" />
        <div className={styles.info}>
          <div className={styles.name}>
            <strong>{user.nickname}</strong>
            <Link to="/mypage/info">회원정보변경</Link>
          </div>
          <div className={styles.flex}>
            <div className={styles.level}>LV.1 멤버</div>
            <span className={styles.date}>
              가입일 : {formatDate(user.registrationDate)}
            </span>
          </div>
          <div className={styles.bottom}>
            <Link to="/mypage/point">
              <img src={point} alt="적립금" />
              <span>적립금</span>
              <strong>{user.point}</strong>
            </Link>
            <Link to="/mypage/review">
              <img src={review} alt="후기작성" />
              <span>구매후기</span>
              <strong>{user.reviewCount}</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
