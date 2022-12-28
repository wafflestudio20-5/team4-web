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

export default function Header() {
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
    <>
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
      <div className="header-channel">smallHeader</div>
      <div className="header-member"></div>
    </>
  );
}
