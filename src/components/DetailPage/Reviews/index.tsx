import React, { useState } from 'react';
import { useApiData, useApiReviewListFetcher } from '../../../lib/api';
import ReviewsLayout from './ReviewsLayout';

interface ReviewsProps {
  itemId: number;
  count: number;
}

export const DEFAULT_REVIEWS_COUNT = 5;

export default function Reviews({ itemId, count }: ReviewsProps) {
  /***
   *
   * 페이지네이션
   *
   * 현재 페이지 번호: index
   * 유효한 페이지 번호: [0, MAXIMUM_PAGE_INDEX]
   * 유저에게 보여지는 페이지 번호: [Math.floor(index / DEFAULT_REVIEWS_COUNT) + 1, Math.floor(index / DEFAULT_REVIEWS_COUNT) + 5]
   * (주의 ! 상태로 관리하는 페이지 번호는 0부터 시작하기 때문에 사용자에게 보여줄 때는 항상 +1을 해야 함)
   *
   */

  const [index, setIndex] = useState(0);

  const MAXIMUM_PAGE_INDEX = Math.ceil(count / DEFAULT_REVIEWS_COUNT) - 1;

  const onPageSelect = (idx: number) => {
    setIndex(idx);
  };

  const onSmallJumpBackwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (0 < index) setIndex(index - 1);
  };

  const onSmallJumpForwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (index < MAXIMUM_PAGE_INDEX) setIndex(index + 1);
  };

  const onBigJumpBackwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bigIndex = Math.floor(index / 5);
    if (0 < bigIndex) setIndex(bigIndex * 5 - 1);
  };

  const onBigJumpForwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bigIndex = Math.floor(index / 5);
    const maximumBigIndex = Math.floor(MAXIMUM_PAGE_INDEX / 5);
    if (bigIndex < maximumBigIndex) setIndex((bigIndex + 1) * 5);
  };

  const { data: reviewsData } = useApiData(
    useApiReviewListFetcher(itemId, index, DEFAULT_REVIEWS_COUNT)
  );
  const reviews = reviewsData?.reviews ?? null;

  return (
    <ReviewsLayout
      count={count}
      reviews={reviews}
      pageIndex={index}
      onPageSelect={onPageSelect}
      onSmallJumpBackwards={onSmallJumpBackwards}
      onSmallJumpForwards={onSmallJumpForwards}
      onBigJumpBackwards={onBigJumpBackwards}
      onBigJumpForwards={onBigJumpForwards}
    />
  );
}
