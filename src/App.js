import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import HomePage from './components/Home/Index';
import NavigationBar from './components/NavigationBar';

function AppDefault() {
  return (
    <>
      <Header />
      <NavigationBar />
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppDefault />}>
        <Route index element={<HomePage />} />
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
