import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../resources/image/musinsa_logo.png';
import search_button from '../resources/image/search_icon.png';

function GnbList() {
  return (
    <div className={styles.gnb}>
      <ul>
        <li>
          <span style={{ color: 'rgb(88, 0, 255)' }}>2023 새해</span>
        </li>
        <li>
          <span style={{ color: 'rgb(0, 212, 123)' }}>시즌오프</span>
        </li>
        <li>
          <span>랭킹</span>
        </li>
        <li>
          <span>업데이트</span>
        </li>
        <li>
          <span>코디</span>
        </li>
        <li>
          <span>세일</span>
        </li>
        <li>
          <span>스페셜</span>
        </li>
        <li>
          <span>매거진</span>
        </li>
        <li>
          <span>TV</span>
        </li>
        <li>
          <span>이벤트</span>
        </li>
        <li>
          <span>브랜드</span>
        </li>
      </ul>
    </div>
  );
}

function MainHeader() {
  const [query, setQuery] = useState<string>('');

  const onSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(`search query: ${query}`);
    setQuery('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className={styles.main}>
      <Link className={styles.title} to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className={styles.searchBar}>
        <form>
          <input
            type="text"
            maxLength={30}
            value={query}
            placeholder="인기 상품 무료 체험단 모집!"
            onChange={onChange}
          />
          <div className={styles.searchButton} onClick={onSubmit}>
            <img src={search_button} alt="search_button" />
          </div>
        </form>
      </div>
      <GnbList />
    </div>
  );
}

function ChannelHeader() {
  return (
    <div className={styles.channel}>
      <span className={styles.channel_terrace}>테라스샵</span>
      <div className={styles.channel_aside}>
        <div className={styles.channel_raffle}>
          래플에 참여해 보세요!
          <span className={styles.channel_raffle_link}>래플 바로가기</span>
        </div>
        <span>브랜드 구인</span>
      </div>
    </div>
  );
}

function MemberHeader() {
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

export default function Header() {
  return (
    <div className={styles.header}>
      <MainHeader />
      <ChannelHeader />
      <MemberHeader />
    </div>
  );
}
