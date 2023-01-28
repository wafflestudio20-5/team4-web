import MyPageReviewListLayout from './MyPageReviewListLayout';
import { useNavigate } from 'react-router-dom';

export default function MyPageReviewList() {
  const navigate = useNavigate();
  const onClickWrite = () => {
    navigate('/mypage/review');
  };

  return (
    <MyPageReviewListLayout
      onClickWrite={onClickWrite}
    ></MyPageReviewListLayout>
  );
}
