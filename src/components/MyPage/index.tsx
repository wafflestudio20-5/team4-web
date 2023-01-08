import React, { useEffect } from 'react';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/sessionSlice';
import { Session } from '../../lib/interface';
import MyPageHeader, { MyPageHeaderProps } from './MyPageHeader/';
import MyPageNavigation from './MyPageNavigation';
import MyPageMain from './MyPageMain';
import MyPageInfo from './MyPageInfo';
import MyPageOrder from './MyPageOrder';
import MyPageViewed from './MyPageViewed';

import Footer from '../Footer';

function MyPageLayout({ user, onLogout }: MyPageHeaderProps) {
  return (
    <>
      <MyPageHeader user={user} onLogout={onLogout} />
      <MyPageNavigation />
      <Outlet />
      <Footer />
    </>
  );
}

function MyPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { user } = session;

  const onLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout(null));
  };

  /* Redirection to HomePage */
  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  if (user)
    return (
      <Routes>
        <Route element={<MyPageLayout user={user} onLogout={onLogout} />}>
          <Route index element={<MyPageMain user={user} />} />
          <Route path="info" element={<MyPageInfo user={user} />} />
          <Route path="order" element={<MyPageOrder user={user} />} />
          <Route path="review" element={<div>/mypage/review</div>} />
          <Route
            path="item_inquiry"
            element={<div>/mypage/item_inquiry</div>}
          />
          <Route
            path="personal_inquiry"
            element={<div>/mypage/personal_inquiry</div>}
          />
          <Route path="viewed_goods" element={<MyPageViewed user={user} />} />
        </Route>
      </Routes>
    );
}

export default MyPage;