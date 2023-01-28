import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postRefresh } from './store/slices/session';
import Header from './components/Header/';
import CategorySideBar from './components/CategorySideBar';
import HomePage from './components/Home/';
import DetailPage from './components/DetailPage';
import MyPage from './components/MyPage/';
import LoginPage from './components/Login/';
import RegisterPage from './components/Register';
import PurchasePage from './components/PurchasePage';
import ShoppingCart from './components/ShoppingCart';
import SocialLoginPage from './components/SocialLoginPage';
import ItemListPage from './components/ItemListPage';
import StyleListPage from './components/StyleListPage';
import Closet from './components/Closet';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route index element={<HomePage />} />
        <Route path="/closet/*" element={<Closet />} />
        <Route element={<CategorySideBar />}>
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/coupon" element={<></>} />
          <Route path="/customercenter" element={<></>} />
          <Route path="/goods/:id" element={<DetailPage />} />
          <Route path="/itemlist" element={<ItemListPage />} />
          <Route path="/stylelist" element={<StyleListPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
        </Route>
        <Route path="/mypage/*" element={<MyPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/oauth2/redirect/:accessToken"
        element={<SocialLoginPage />}
      />
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
