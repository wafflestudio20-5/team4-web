import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Review } from '../../../lib/interface';
import ReviewBoxLayout from './ReviewBoxLayout';

interface ReviewBoxProps {
  review: Review;
}

export default function ReviewBox({ review }: ReviewBoxProps) {
  const [displayCommentBox, setDisplayCommentBox] = useState<boolean>(true);

  const { user, accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  return (
    <ReviewBoxLayout review={review} displayCommentBox={displayCommentBox} />
  );
}
