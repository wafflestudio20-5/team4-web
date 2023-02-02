import React, { useEffect } from 'react';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { postLogout } from '../../store/slices/session';
import MyPageHeader, { MyPageHeaderProps } from './MyPageHeader/';
import MyPageNavigation from './MyPageNavigation';
import MyPageInfo from './MyPageInfo';
import MyPageOrder from './MyPageOrder';
import MyPageViewed from './MyPageViewed';
import MyPageWriteReviews from './MyPageWriteReviews';
import MyPageWriteReviewsList from './MyPageWriteReviews/indexList';
import MyPageReviewList from './MyPageReviewList';
import MyPageEditReviews from './MyPageEditReviews';
import Footer from '../Footer';
import { Session } from '../../lib/interface';
import MyPageInquiryList from './MyPageInquiryList';

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

  const dispatch = useDispatch<AppDispatch>();
  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { user, accessToken } = session;

  const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (accessToken) await dispatch(postLogout(accessToken));
  };

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (user)
    return (
      <Routes>
        <Route element={<MyPageLayout user={user} onLogout={onLogout} />}>
          <Route index element={<MyPageInfo user={user} />} />
          <Route path="info" element={<MyPageInfo user={user} />} />
          <Route
            path="review"
            element={<MyPageWriteReviewsList accessToken={accessToken} />}
          />
          <Route
            path="review/write"
            element={<MyPageWriteReviews accessToken={accessToken} />}
          />
          <Route
            path="review/edit"
            element={<MyPageEditReviews accessToken={accessToken} />}
          />
          <Route
            path="review/list"
            element={<MyPageReviewList accessToken={accessToken} />}
          />
          <Route
            path="order"
            element={<MyPageOrder accessToken={accessToken} />}
          />
          <Route path="item_inquiry" element={<MyPageInquiryList />} />
          <Route
            path="personal_inquiry"
            element={<div>/mypage/personal_inquiry</div>}
          />
          <Route
            path="viewed_goods"
            element={<MyPageViewed accessToken={accessToken} />}
          />
        </Route>
      </Routes>
    );
}

export default MyPage;
