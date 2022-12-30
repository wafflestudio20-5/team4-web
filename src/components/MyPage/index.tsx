import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Session } from '../../lib/interface';
import MyPageUserInfo from './MyPageUserInfo';
import MyPageNavigation from './MyPageNavigation';

function MyPageRoutes() {
  return (
    <Routes>
      <Route index element={<div>content</div>} />
    </Routes>
  );
}

function MyPage() {
  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { user } = session;

  return (
    <>
      <MyPageUserInfo user={user} />
      <MyPageNavigation />
      <MyPageRoutes />
    </>
  );
}

export default MyPage;
