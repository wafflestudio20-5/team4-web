import MyPageReviewListLayout from './MyPageReviewListLayout';
import { useNavigate } from 'react-router-dom';
import {
  apiDeleteReview,
  useApiData,
  useApiGetUserReviewListFetcher,
} from '../../../lib/api';
import { Review } from '../../../lib/interface';

export default function MyPageReviewList({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const navigate = useNavigate();
  const onClickWrite = () => {
    navigate('/mypage/review');
  };

  const { data: reviewData } = useApiData(
    useApiGetUserReviewListFetcher(accessToken)
  );
  const reviews = reviewData?.reviews ?? null;
  const onEdit = (data: Review) => {
    navigate('/mypage/review/edit', { state: data });
  };
  const onRemove = (id: number) => {
    apiDeleteReview(id, accessToken);
  };

  return (
    <MyPageReviewListLayout
      onClickWrite={onClickWrite}
      data={reviews}
      onEdit={onEdit}
      onRemove={onRemove}
    ></MyPageReviewListLayout>
  );
}
