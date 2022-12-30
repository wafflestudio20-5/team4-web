import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/sessionSlice';
import { Session } from '../../lib/interface';
import MyPageUserInfo from './MyPageUserInfo';
import MyPageNavigation from './MyPageNavigation';

function MyPageRoutes() {
  return (
    <Routes>
      <Route index element={<div>content</div>} />
      <Route path="/mypage/info" element={<div>/mypage/info</div>} />
      <Route path="/mypage/money" element={<div>/mypage/money</div>} />
      <Route path="/mypage/point" element={<div>/mypage/point</div>} />
      <Route path="/mypage/review" element={<div>/mypage/review</div>} />
    </Routes>
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
      <>
        <MyPageUserInfo user={user} onLogout={onLogout} />
        <MyPageNavigation />
        <MyPageRoutes />
      </>
    );
}

export default MyPage;
