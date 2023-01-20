import { Link } from 'react-router-dom';
import styles from './MyPageNavigation.module.scss';

export default function MyPageNavigation() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.direct}>바로접속 ON</span>
      <div className={styles.flex}>
        <h3>나의 쇼핑 활동</h3>
        <Link className={styles.nav} to="/mypage/order">
          주문 내역 조회
        </Link>
        <Link className={styles.nav} to="/mypage/review/">
          구매후기
        </Link>
        <Link className={styles.nav} to="/mypage/item_inquiry">
          상품문의
        </Link>
        <Link className={styles.nav} to="/mypage/personal_inquiry">
          1:1문의
        </Link>
        <Link className={styles.nav} to="/mypage/viewed_goods">
          최근 본 상품
        </Link>
        <Link className={styles.nav} to="/mypage/review/edit">
          reviewPutTest
        </Link>
      </div>
      {/*
      <div className={styles.flex}>
        <h3>커뮤니티</h3>
        <Link className={styles.nav} to="/mypage/community">
          게시물/스크랩/댓글
        </Link>
      </div>
      */}
    </div>
  );
}
