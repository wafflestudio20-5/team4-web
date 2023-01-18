import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../lib/interface';
import styles from './HeaderLayout.module.scss';
import logo from '../../resources/image/musinsa_logo.png';
import search_button from '../../resources/image/search_icon.png';

interface GnbListProps {
  user: User | null;
  onLogout: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

function GnbList({ user, onLogout }: GnbListProps) {
  return (
    <div className={styles.gnb}>
      {user ? (
        <ul>
          <li>
            <Link className={styles.gnb_element} to="/mypage">
              마이페이지
            </Link>
          </li>
          <li>
            <Link className={styles.gnb_element} to="/mypage/viewed_goods">
              최근 본 상품
            </Link>
          </li>
          <li>
            <Link className={styles.gnb_element} to="/cart">
              장바구니
            </Link>
          </li>
          <li>
            <Link className={styles.gnb_element} to="/mypage/order">
              주문배송조회
            </Link>
          </li>
          <li>
            <span className={styles.gnb_element} onClick={onLogout}>
              로그아웃
            </span>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link className={styles.gnb_element} to="/register">
              회원가입
            </Link>
          </li>
          <li>
            <Link className={styles.gnb_element} to="/login">
              로그인
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

interface MainHeaderProps {
  user: User | null;
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLogout: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export default function MainHeader({
  user,
  query,
  onChange,
  onKeyPress,
  onSubmit,
  onLogout,
}: MainHeaderProps) {
  return (
    <div className={styles.main}>
      <Link className={styles.title} to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className={styles.searchBar}>
        <input
          type="text"
          maxLength={30}
          value={query}
          placeholder="인기 상품 무료 체험단 모집!"
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <div className={styles.searchButton} onClick={onSubmit}>
          <img src={search_button} alt="search_button" />
        </div>
      </div>
      <GnbList user={user} onLogout={onLogout} />
    </div>
  );
}
