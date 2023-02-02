import MyPageInquiryListLayout from './MyPageInquiryListLayout';
import { useApiData, useApiInquiryListFetcher } from '../../../lib/api';
import React, { useEffect, useState } from 'react';

export const DEFAULT_INQUIRIES_COUNT = 5;

function generatePageArray(pageIndex: number, maxPageIndex: number): number[] {
  const array = [];
  const base = Math.floor(pageIndex / 5);
  var idx = 0;
  while (idx < 5 && base * 5 + idx <= maxPageIndex) {
    array.push(base * 5 + idx);
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
    useApiInquiryListFetcher(accessToken, index, DEFAULT_INQUIRIES_COUNT)
  );
  const inquiries = inquiriesData?.inquiries ?? null;
  const length = inquiries?.length ?? 0;
  const MAXIMUM_PAGE_INDEX = Math.ceil(length / DEFAULT_INQUIRIES_COUNT) - 1;
  useEffect(() => {
    console.log(inquiries);
    console.log(MAXIMUM_PAGE_INDEX);
    console.log(index);
  });
  const pageArray = generatePageArray(index, MAXIMUM_PAGE_INDEX);

  const onPageSelect = (idx: number) => {
    setIndex(idx);
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

  return (
    <MyPageInquiryListLayout
      inquiries={inquiries}
      MAXIMUM_PAGE_INDEX={MAXIMUM_PAGE_INDEX}
      pageArray={pageArray}
      onPageSelect={onPageSelect}
    ></MyPageInquiryListLayout>
  );
}
