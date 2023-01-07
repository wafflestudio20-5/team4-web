import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header/';
import SubHeader from './components/SubHeader/';
import HomePage from './components/Home/';
import LoginPage from './components/Login/';
import RegisterPagePage from './components/Register/index';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route element={<SubHeader />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/mypage" element={<></>} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPagePage />} />
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
