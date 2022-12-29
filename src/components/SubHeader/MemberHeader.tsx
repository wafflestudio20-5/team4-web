import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../lib/interface';
import styles from './MemberHeader.module.scss';

interface MemberHeaderProps {
  user: User | null;
  onLogout: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MemberHeader({ user, onLogout }: MemberHeaderProps) {
  return (
    <div className={styles.member}>
      {user ? (
        <div className={styles.member_block}>
          <span className={styles.member_nickname}>{user.nickname}</span>
        </div>
      ) : (
        <Link className={styles.member_login} to="/login">
          로그인
        </Link>
      )}
      <div className={styles.member_block}>
        <span
          className={styles.member_link}
          style={{
            color: '#00a3ff',
            fontFamily: 'Musinsa',
            paddingTop: '6px',
          }}
        >
          바로접속 ON
        </span>
      </div>
      {user && (
        <div className={styles.member_block}>
          <span className={styles.member_link}>알림</span>
        </div>
      )}
      <div className={styles.member_block}>
        <span className={styles.member_link}>마이페이지</span>
      </div>
      <div className={styles.member_block}>
        <span className={styles.member_link}>최근 본 상품</span>
      </div>
      <div className={styles.member_block}>
        <span
          className={styles.member_link}
          style={{
            color: 'red',
          }}
        >
          좋아요
        </span>
      </div>
      <div className={styles.member_block}>
        <span className={styles.member_link}>장바구니</span>
        <span className={styles.badge}>0</span>
      </div>
      <div className={styles.member_block}>
        <span className={styles.member_link}>주문배송조회</span>
      </div>
      <div className={styles.member_block}>
        <span className={styles.member_link}>고객센터</span>
      </div>
      {user && (
        <div className={styles.member_block}>
          <button className={styles.member_logout_button} onClick={onLogout}>
            로그아웃
          </button>
        </div>
      )}
      <div className={styles.member_block}>
        <span
          className={styles.member_link}
          style={{
            color: '#048eff',
            fontWeight: 700,
          }}
        >
          {user
            ? `친구초대 EVENT. 친구 초대하면 무조건 5천원! 무제한 적립금 지급!`
            : `회원 가입 EVENT. 신규 가입 후 바로 사용 가능한 15% 할인 쿠폰 / 무신사
          스탠다드 990원 구매 기회`}
        </span>
      </div>
    </div>
  );
}
