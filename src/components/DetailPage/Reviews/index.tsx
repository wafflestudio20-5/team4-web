import React from 'react';
import ReviewsLayout from './ReviewsLayout';

interface ReviewsProps {
  count: number;
  rating: number;
}

export default function Reviews({ count, rating }: ReviewsProps) {
  return <ReviewsLayout count={count} rating={rating} />;
}
