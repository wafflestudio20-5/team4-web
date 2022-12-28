import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../resources/image/musinsa_logo.png';
import search_button from '../resources/image/search_icon.png';

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
              onChange={onChange}
            />
            <div className={styles.searchButton} onClick={onSubmit}>
              <img src={search_button} alt="search_button" />
            </div>
          </form>
        </div>
      </div>
      <div className="header-channel">smallHeader</div>
      <div className="header-member"></div>
    </>
  );
}
