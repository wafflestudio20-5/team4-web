import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/';
import SubHeader from './components/SubHeader/';
import HomePage from './components/Home/';
import MyPage from './components/MyPage/';
import LoginPage from './components/Login/';
import RegisterPage from './components/Register';

export default function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route element={<SubHeader />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<></>} />
          <Route path="/coupon" element={<></>} />
          <Route path="/customercenter" element={<></>} />
        </Route>
        <Route path="/mypage/*" element={<MyPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
