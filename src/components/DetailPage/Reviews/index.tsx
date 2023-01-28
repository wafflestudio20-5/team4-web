import React, { useState } from 'react';

import { useApiData, useApiReviewListFetcher } from '../../../lib/api';
import ReviewsLayout from './ReviewsLayout';

interface ReviewsProps {
  itemId: number;
  count: number;
}

const DEFAULT_REVIEWS_COUNT = 5;

export default function Reviews({ itemId, count }: ReviewsProps) {
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
      onPageChange={onPageChange}
    />
  );
}
