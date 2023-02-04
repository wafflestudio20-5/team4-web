import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import { useApiData, useApiInquiryListFetcher } from '../../../lib/api';
import InquiriesLayout from './InquiriesLayout';

interface InquiriesProps {
  itemId: number;
}

const DEFAULT_INQUIRIES_COUNT = 5;

export default function Inquiries({ itemId }: InquiriesProps) {
  const [index, setIndex] = useState(0);

  const { data: inquiriesData } = useApiData(
    useApiInquiryListFetcher(itemId, index, DEFAULT_INQUIRIES_COUNT)
  );
  const inquiries = inquiriesData?.inquiries ?? null;
  const totalPages = inquiriesData?.totalPages ?? 0;
  const maxIndex = totalPages - 1;

  const onPageSelect = (idx: number) => {
    setIndex(idx);
  };

  const onSmallJumpBackwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (0 < index) setIndex(index - 1);
  };

  const onSmallJumpForwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const onBigJumpBackwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bigIndex = Math.floor(index / 5);
    if (0 < bigIndex) setIndex(bigIndex * 5 - 1);
  };

  const onBigJumpForwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bigIndex = Math.floor(index / 5);
    const maximumBigIndex = Math.floor(maxIndex / 5);
    if (bigIndex < maximumBigIndex) setIndex((bigIndex + 1) * 5);
  };

  /***
   *
   * 상품 문의 작성하기
   *
   */

  const { accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  const navigate = useNavigate();

  const onInquiryWrite = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }
    window.open(
      `/inquiry/${itemId}`,
      'inquiry',
      'width=572,height=805,location=no,status=no,scrollbars=yes,resizable=yes'
    );
  };

  return (
    <InquiriesLayout
      inquiries={inquiries}
      pageIndex={index}
      maxPageIndex={maxIndex}
      onPageSelect={onPageSelect}
      onSmallJumpBackwards={onSmallJumpBackwards}
      onSmallJumpForwards={onSmallJumpForwards}
      onBigJumpBackwards={onBigJumpBackwards}
      onBigJumpForwards={onBigJumpForwards}
      onInquiryWrite={onInquiryWrite}
    />
  );
}
