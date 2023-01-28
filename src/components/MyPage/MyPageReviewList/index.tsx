import MyPageReviewListLayout from './MyPageReviewListLayout';
import { useNavigate } from 'react-router-dom';

export default function MyPageReviewList({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const navigate = useNavigate();
  const onClickWrite = () => {
    navigate('/mypage/review');
  };
  {
    /*const { data: reviewData } = useApiData(useApiGetReviewFetcher(accessToken));
  const reviews = reviewData?.reviews ?? null;*/
  }

  return (
    <MyPageReviewListLayout
      onClickWrite={onClickWrite}
    ></MyPageReviewListLayout>
  );
}
