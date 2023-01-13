import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postRefresh } from './store/slices/session';
import Header from './components/Header/';
import SubHeader from './components/SubHeader/';
import CategorySideBar from './components/CategorySideBar';
import HomePage from './components/Home/';
import DetailPage from './components/DetailPage';
import MyPage from './components/MyPage/';
import LoginPage from './components/Login/';
import RegisterPage from './components/Register';
import ReviewBox from "./components/ReviewBox";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route element={<SubHeader />}>
          <Route element={<CategorySideBar />}>
            <Route index element={<HomePage />} />
            <Route path="/cart" element={<></>} />
            <Route path="/coupon" element={<></>} />
            <Route path="/customercenter" element={<></>} />
            <Route path="/goods/:id" element={<DetailPage />} />
            <Route path="/reviews" element={<ReviewBox />} />
          </Route>
        </Route>
        <Route path="/mypage/*" element={<MyPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postRefresh());
  });

  return <AppRoutes />;
}
