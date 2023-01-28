import ReviewBoxLayout from './ReviewBoxLayout';
import { useState } from 'react';
import { Review } from '../../lib/interface';

interface ReviewBoxParams {
  data: Review;
}

export default function ReviewBox({ data }: ReviewBoxParams) {
  const [moreCommentBool, setMoreCommentBool] = useState<boolean>(false);
  const onClick = () => {
    setMoreCommentBool(true);
  };

  return (
    <ReviewBoxLayout
      reviewDate={data.createdDateTime}
      moreCommentBool={moreCommentBool}
      onClick={onClick}
      data={data}
    />
  );
}
