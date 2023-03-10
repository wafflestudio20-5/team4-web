import MyPageInquiryListLayout from './MyPageInquiryListLayout';
import {
  apiDeleteInquiry,
  useApiData,
  useApiMyInquiryListFetcher,
} from '../../../lib/api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inquiry } from '../../../lib/interface';

export const DEFAULT_INQUIRIES_COUNT = 5;

function generatePageArray(pageIndex: number, maxPageIndex: number): number[] {
  const array = [];
  const base = Math.floor(pageIndex / DEFAULT_INQUIRIES_COUNT);
  var idx = 0;
  while (
    idx < DEFAULT_INQUIRIES_COUNT &&
    base * DEFAULT_INQUIRIES_COUNT + idx <= maxPageIndex
  ) {
    array.push(base * DEFAULT_INQUIRIES_COUNT + idx);
    idx++;
  }
  return array;
}

export default function MyPageInquiryList({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const [index, setIndex] = useState(0);
  const { data: inquiriesData } = useApiData(
    useApiMyInquiryListFetcher(accessToken, index, DEFAULT_INQUIRIES_COUNT)
  );
  const inquiries = inquiriesData?.inquiries ?? null;
  const totalPages = inquiriesData?.totalPages ?? 0;
  const MAXIMUM_PAGE_INDEX = totalPages - 1;
  const pageArray = generatePageArray(index, MAXIMUM_PAGE_INDEX);

  const onPageSelect = (idx: number) => {
    setIndex(idx);
  };

  const onBigJumpBackwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bigIndex = Math.floor(index / DEFAULT_INQUIRIES_COUNT);
    if (0 < bigIndex) setIndex(bigIndex * DEFAULT_INQUIRIES_COUNT - 1);
    else setIndex(0);
  };

  const onBigJumpForwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bigIndex = Math.floor(index / DEFAULT_INQUIRIES_COUNT);
    const maximumBigIndex = Math.floor(
      MAXIMUM_PAGE_INDEX / DEFAULT_INQUIRIES_COUNT
    );
    if (bigIndex < maximumBigIndex)
      setIndex((bigIndex + 1) * DEFAULT_INQUIRIES_COUNT);
    else setIndex(MAXIMUM_PAGE_INDEX);
  };
  const navigate = useNavigate();
  const inquiryEditClick = (data: Inquiry) => {
    navigate('/inquiry/edit', { state: data });
  };
  const inquiryDeleteClick = (id: number) => {
    apiDeleteInquiry(id, accessToken);
    window.location.reload();
  };

  return (
    <MyPageInquiryListLayout
      inquiries={inquiries}
      MAXIMUM_PAGE_INDEX={MAXIMUM_PAGE_INDEX}
      pageArray={pageArray}
      onPageSelect={onPageSelect}
      onBigJumpBackwards={onBigJumpBackwards}
      onBigJumpForwards={onBigJumpForwards}
      inquiryEditClick={inquiryEditClick}
      inquiryDeleteClick={inquiryDeleteClick}
    ></MyPageInquiryListLayout>
  );
}
