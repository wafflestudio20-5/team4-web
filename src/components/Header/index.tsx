import React, { useState } from 'react';
import MainHeader from './MainHeader';

function Header() {
  const [query, setQuery] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit(e);
  };

  const onSubmit = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    console.log(`search query: ${query}`);
    setQuery('');
  };

  return (
    <MainHeader
      query={query}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onSubmit={onSubmit}
    />
  );
}

export default Header;
