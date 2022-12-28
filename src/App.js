import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './components/Header';
import HomePage from './components/Home/index';
import NavigationBar from './components/NavigationBar';
import SessionProvider from './contexts/SessionProvider';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SessionProvider>
        <BrowserRouter>
          <Header />
          <NavigationBar />
          <AppRoutes />
        </BrowserRouter>
      </SessionProvider>
    </Provider>
  );
}
