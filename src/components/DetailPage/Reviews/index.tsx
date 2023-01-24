import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import ReviewsLayout from './ReviewsLayout';

interface ReviewsProps {
  count: number;
  rating: number;
}

export default function Reviews({ count, rating }: ReviewsProps) {
  const { accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  return (
    <ReviewsLayout count={count} rating={rating} accessToken={accessToken} />
  );
}
