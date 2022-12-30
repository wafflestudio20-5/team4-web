import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header/';
import SubHeader from './components/SubHeader/';
import HomePage from './components/Home/';
import MyPage from './components/MyPage/';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route element={<SubHeader />}>
          <Route index element={<HomePage />} />
          <Route path="/cart" element={<></>} />
          <Route path="/coupon" element={<></>} />
          <Route path="/customercenter" element={<></>} />
        </Route>
        <Route path="/mypage" element={<MyPage />} />
      </Route>
      <Route path="/login" element={<></>} />
      <Route path="/register" element={<></>} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
