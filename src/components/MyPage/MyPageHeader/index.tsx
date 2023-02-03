import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../lib/interface';
import { formatDate } from '../../../lib/formatters/dateTimeFormatter';
import styles from './MyPageHeader.module.scss';
// import review from '../../../resources/image/write.png';

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
      <div className={styles.main}>
        <img className={styles.image} src={user.image} alt="이미지 없음" />
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
          {/*
          <div className={styles.bottom}>
            <div className={styles.bottom_block}>
              <img src={review} alt="구매후기" />
              <span>구매후기</span>
              <strong>{user.reviewCount}</strong>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
