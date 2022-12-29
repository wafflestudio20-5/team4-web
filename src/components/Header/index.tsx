import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/sessionSlice';
import { Session } from '../../lib/interface';
import MainHeader from './MainHeader';
import ChannelHeader from './ChannelHeader';
import MemberHeader from './MemberHeader';

function Header() {
  /* Feature: Search */
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

  /* Feature: Session */
  const dispatch = useDispatch();
  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { user } = session;

  const onLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout(null));
  };

  return (
    <>
      <MainHeader
        query={query}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onSubmit={onSubmit}
      />
      <ChannelHeader />
      <MemberHeader user={user} onLogout={onLogout} />
    </>
  );
}

export default Header;
