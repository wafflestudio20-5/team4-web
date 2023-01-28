import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useApiData, useApiReviewListFetcher } from '../../../lib/api';
import ReviewsLayout from './ReviewsLayout';

interface ReviewsProps {
  itemId: number;
  count: number;
}

const DEFAULT_REVIEWS_COUNT = 10;

export default function Reviews({ itemId, count }: ReviewsProps) {
  const { accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  /***
   *
   * 페이지네이션
   *
   */

  const [index, setIndex] = useState<number>(0);

  const MAXIMUM_PAGE_INDEX = Math.ceil(count / DEFAULT_REVIEWS_COUNT);

  const onPageChange = (idx: number) => {
    if (idx <= MAXIMUM_PAGE_INDEX) setIndex(idx);
  };

  /***
   *
   * api 연결 전 임시 구현
   *
   */

  const { data: reviewsData } = useApiData(
    useApiReviewListFetcher(itemId, index, DEFAULT_REVIEWS_COUNT)
  );
  const reviews = reviewsData?.reviews ?? null;

  return (
    <ReviewsLayout
      count={count}
      reviews={reviews}
      maxPageIdx={MAXIMUM_PAGE_INDEX}
      accessToken={accessToken}
      onPageChange={onPageChange}
    />
  );
}
