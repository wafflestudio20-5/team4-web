import React from 'react';
import { Review } from '../../../lib/interface';
import ReviewBoxLayout from './ReviewBoxLayout';

interface ReviewBoxProps {
  review: Review;
}

export default function ReviewBox({ review }: ReviewBoxProps) {
  return <ReviewBoxLayout review={review} />;
}
