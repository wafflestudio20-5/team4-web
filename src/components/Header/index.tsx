import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, Outlet, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { postLogout } from '../../store/slices/session';
import HeaderLayout from './HeaderLayout';
import { Session } from '../../lib/interface';
import { toast } from 'react-toastify';

function Header() {
  const [query, setQuery] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const navigate = useNavigate();

  const { user, accessToken } = session;

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
    if (query.trim().length === 0) {
      toast('검색어를 입력해주세요.');
      return;
    }
    navigate({
      pathname: '/itemlist',
      search: `?${createSearchParams({
        type: 'search',
        q: query,
      })}`,
    });
    setQuery('');
  };

  const onLogout = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (accessToken) await dispatch(postLogout(accessToken));
  };

  return (
    <>
      <HeaderLayout
        user={user}
        query={query}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onSubmit={onSubmit}
        onLogout={onLogout}
      />
      <Outlet />
    </>
  );
}

export default Header;
