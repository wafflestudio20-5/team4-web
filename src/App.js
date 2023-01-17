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
            <Route path="/reviews" element={<ReviewBox data={{
              id: 1,
              user: {
                nickname: "LV 3 이재운",
                image: "https://image.msscdn.net/mfile_s01/_simbols/q/692f72ef4643325c186d84684198408b_20210822111353.jpg",
                sex: "male",
                height: 170,
                weight: 66
              },
              purchase: {item: {name: '오버사이즈 집업 카라 터틀넥 니트 [M.GREY]',
                  images: ['https://image.msscdn.net/images/goods_img/20211111/2226767/2226767_3_500.jpg?t=20220825141256']

                },
              option: "S"},
              rating: 10,
              content: "너무 멋있어요! 너무 멋있어요! 너무 멋있어요!",
              createdDateTime: "2022.01.15",
              size: 'large',
              color: 'bright',
              comments: [{user: {
                nickname: "LV 5 으아악",
                  image: "https://image.msscdn.net/mfile_s01/_simbols/a/6a9190916db52c0deccac9087fc47463.jpg",
                  sex: "male",
                  height: 180,
                  weight: 90
                },
              content: "너무 예뻐요!!!!!!! 너무 멋있어요!!!!",
              createdDateTime: "2023.01.13 17:16"},
                {user: {
                    nickname: "LV 5 으아악",
                    image: "https://image.msscdn.net/mfile_s01/_simbols/dnjsgyqlffk.jpg",
                    sex: "male",
                    height: 180,
                    weight: 90
                  },
                  content: "너무 예뻐요!!!!!!! 너무 멋있어요asjfkmasldvakslf!!!!",
                  createdDateTime: "2023.01.13 15:16"},
                {user: {
                    nickname: "LV 5 으아악",
                    image: "https://image.msscdn.net/mfile_s01/_simbols/dnjsgyqlffk.jpg",
                    sex: "male",
                    height: 180,
                    weight: 90
                  },
                  content: "너무 예뻐요!!!!!!! 너무 멋있어요asjfkmasldvakslf!!!!",
                  createdDateTime: "2023.01.13 15:16"}],
              images: ['https://image.msscdn.net/data/estimate/2263769_0/gallery_61e281aebc6e3.jpg.view', 'https://image.msscdn.net/data/estimate/2226767_0/gallery_61e57805556ae.jpg.view']
            }}/>} />
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
