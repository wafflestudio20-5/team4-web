import React, { useEffect } from 'react';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/sessionSlice';
import { Session } from '../../lib/interface';
import MyPageUserInfo, { MyPageUserInfoProps } from './MyPageUserInfo';
import MyPageNavigation from './MyPageNavigation';

function MyPageLayout({ user, onLogout }: MyPageUserInfoProps) {
  return (
    <>
      <MyPageUserInfo user={user} onLogout={onLogout} />
      <MyPageNavigation />
      <Outlet />
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
          <Route index element={<div>content</div>} />
          <Route path="community" element={<div>/mypage/community</div>} />
          <Route path="info" element={<div>/mypage/info</div>} />
          <Route path="money" element={<div>/mypage/money</div>} />
          <Route path="order" element={<div>/mypage/order</div>} />
          <Route path="point" element={<div>/mypage/point</div>} />
          <Route path="review" element={<div>/mypage/review</div>} />
          <Route
            path="viewed_goods"
            element={<div>/mypage/viewed_goods</div>}
          />
        </Route>
      </Routes>
    );
}

export default MyPage;
