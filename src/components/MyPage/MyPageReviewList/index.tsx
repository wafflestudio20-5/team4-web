import MyPageReviewListLayout from './MyPageReviewListLayout';
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
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
  const reviews = reviewData?.reviews ?? undefined;
  const onEdit = (data: Review) => {
    navigate('/mypage/review/edit', { state: data });
  };
  const [temp, setTemp] = useState<number[]>([]);
  const onRemove = (id: number) => {
    apiDeleteReview(id, accessToken);
    setTemp([...temp, id]);
  };

  return (
    <MyPageReviewListLayout
      onClickWrite={onClickWrite}
      data={reviews}
      onEdit={onEdit}
      onRemove={onRemove}
      temp={temp}
    ></MyPageReviewListLayout>
  );
}
