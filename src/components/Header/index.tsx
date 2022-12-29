import React, { useState } from 'react';
import MainHeader from './MainHeader';
import ChannelHeader from './ChannelHeader';
import MemberHeader from './MemberHeader';
import styles from './index.module.scss';

function Header() {
  const [query, setQuery] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(`search query: ${query}`);
    setQuery('');
  };

  return (
    <div className={styles.header}>
      <MainHeader query={query} onChange={onChange} onSubmit={onSubmit} />
      <ChannelHeader />
      <MemberHeader />
    </div>
  );
}

export default Header;
