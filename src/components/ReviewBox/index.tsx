import ReviewBoxLayout from './ReviewBoxLayout';
import { useState } from 'react';
import { Review } from '../../lib/interface';

interface ReviewBoxParams {
  data: Review;
}

export default function ReviewBox({ data }: ReviewBoxParams) {
  const sexText = () => {
    if (data.user.sex === 'male') {
      return '남성';
    } else if (data.user.sex === 'female') {
      return '여성';
    } else {
      return '';
    }
  };
  const sizeText = () => {
    if (data.size === 'large') {
      return '커요';
    } else if (data.size === 'mid') {
      return '보통이에요';
    } else {
      return '작아요';
    }
  };
  const colorText = () => {
    if (data.color === 'bright') {
      return '밝아요';
    } else if (data.color === 'mid') {
      return '보통이에요';
    } else {
      return '어두워요';
    }
  };
  const [moreCommentBool, setMoreCommentBool] = useState<boolean>(false);
  const onClick = () => {
    setMoreCommentBool(true);
  };

  return (
    <ReviewBoxLayout
      reviewDate={data.createdDateTime}
      sex={sexText()}
      size={sizeText()}
      color={colorText()}
      moreCommentBool={moreCommentBool}
      onClick={onClick}
      data={data}
    ></ReviewBoxLayout>
  );
}
