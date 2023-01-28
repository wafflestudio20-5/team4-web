import MyPageReviewListLayout from './MyPageReviewListLayout';
import { useNavigate } from 'react-router-dom';
import { useApiData, useApiGetUserReviewListFetcher } from '../../../lib/api';
import { useState } from 'react';

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

  return (
    <MyPageReviewListLayout
      onClickWrite={onClickWrite}
      data={reviews}
    ></MyPageReviewListLayout>
  );
}
