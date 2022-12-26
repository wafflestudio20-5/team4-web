import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import Home from './components/Home';
import SessionProvider from './contexts/SessionProvider';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

const store = createStore(rootReducer); // 스토어를 만듭니다.

export default function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </SessionProvider>
  );
}
