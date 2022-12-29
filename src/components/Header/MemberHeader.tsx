import { Link } from 'react-router-dom';
import styles from './MemberHeader.module.scss';

export default function MemberHeader() {
  return (
    <div className={styles.member}>
      <Link className={styles.member_login} to="/login">
        로그인
      </Link>
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
      <div className={styles.member_block}>
        <span
          className={styles.member_link}
          style={{
            color: '#048eff',
            fontWeight: 700,
          }}
        >
          회원 가입 EVENT. 신규 가입 후 바로 사용 가능한 15% 할인 쿠폰 / 무신사
          스탠다드 990원 구매 기회
        </span>
      </div>
    </div>
  );
}
