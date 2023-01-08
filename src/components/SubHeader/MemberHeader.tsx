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
          <Link className={styles.member_nickname} to="/mypage/info">
            {user.nickname}
          </Link>
        </div>
      ) : (
        <Link className={styles.member_login} to="/login">
          로그인
        </Link>
      )}
      <div
        className={styles.member_block}
        style={{
          color: '#00a3ff',
          fontFamily: 'Musinsa',
          paddingTop: '4px',
        }}
      >
        <span className={styles.member_link}>바로접속 ON</span>
      </div>
      {/*
      {user && (
        <div className={styles.member_block}>
          <span className={styles.member_link}>알림</span>
        </div>
      )}
      */}
      <div className={styles.member_block}>
        <Link className={styles.member_link} to={user ? `/mypage` : `/login`}>
          마이페이지
        </Link>
      </div>
      <div className={styles.member_block}>
        <Link className={styles.member_link} to="/mypage/viewed_goods">
          최근 본 상품
        </Link>
      </div>
      {/*
      <div
        className={styles.member_block}
        style={{
          color: 'red',
        }}
      >
        <span className={styles.member_link}>좋아요</span>
      </div>
      */}
      <div className={styles.member_block}>
        <Link className={styles.member_link} to="/cart">
          장바구니
        </Link>
        <span className={styles.badge}>0</span>
      </div>
      <div className={styles.member_block}>
        <Link className={styles.member_link} to="/mypage/order">
          주문배송조회
        </Link>
      </div>
      {/*
      <div className={styles.member_block}>
        <Link className={styles.member_link} to="/customercenter">
          고객센터
        </Link>
      </div>
      */}
      {user && (
        <div className={styles.member_block}>
          <button className={styles.member_logout_button} onClick={onLogout}>
            로그아웃
          </button>
        </div>
      )}
      {/*
      <div
        className={styles.member_block}
        style={{
          color: '#048eff',
        }}
      >
        {user ? (
          <span className={styles.member_special_link}>
            친구초대 EVENT. 친구 초대하면 무조건 5천원! 무제한 적립금 지급!
          </span>
        ) : (
          <Link className={styles.member_special_link} to="/register">
            회원 가입 EVENT. 신규 가입 후 바로 사용 가능한 15% 할인 쿠폰 /
            무신사 스탠다드 990원 구매 기회
          </Link>
        )}
      </div>
      */}
    </div>
  );
}
