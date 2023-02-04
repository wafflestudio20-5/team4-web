import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { RootState } from '../../../store';
import { apiPostComment } from '../../../lib/api';
import { Review, Comment } from '../../../lib/interface';
import ReviewBoxLayout from './ReviewBoxLayout';

interface ReviewBoxProps {
  review: Review;
}

export default function ReviewBox({ review }: ReviewBoxProps) {
  const [input, setInput] = useState<string>('');
  const [displayCommentBox, setDisplayCommentBox] = useState<boolean>(true);

  const [comments, setComments] = useState<Comment[]>(review.comments);

  const { accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!accessToken) {
      setDisplayCommentBox(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input.length > 50) return;
    setInput(e.target.value);
  };

  const onSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (input.length === 0) {
      toast('댓글을 입력해주세요.');
      return;
    }
    try {
      const response = await apiPostComment(review.id, input, accessToken);
      setComments([...comments, response.data.comment]);
    } catch (error) {
      const e = error as AxiosError;
      if (e.response?.status === 404) {
        toast('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSubmit(e);
  };

  return (
    <ReviewBoxLayout
      review={review}
      comments={comments}
      displayCommentBox={displayCommentBox}
      input={input}
      onClick={onClick}
      onChange={onChange}
      onSubmit={onSubmit}
      onKeyPress={onKeyPress}
    />
  );
}
