import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../resources/image/musinsa_logo.png';
import styles from './Header.module.scss';

export default function Header() {
  const [query, setQuery] = useState<string>('');

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target.value);
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
          <form onSubmit={onSubmit}>
            <input
              type="text"
              maxLength={30}
              value={query}
              onChange={onChange}
            />
            <button />
          </form>
        </div>
      </div>
      <div className="header-channel">smallHeader</div>
      <div className="header-member"></div>
    </>
  );
}
