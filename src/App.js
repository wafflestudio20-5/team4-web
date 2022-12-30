import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header/';
import SubHeader from './components/SubHeader/';
import HomePage from './components/Home/';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route element={<SubHeader />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/mypage" element={<></>} />
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
