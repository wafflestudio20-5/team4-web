import MyPageInquiryListLayout from './MyPageInquiryListLayout';
import { useApiData, useApiInquiryListFetcher } from '../../../lib/api';
import { useState } from 'react';

export const DEFAULT_INQUIRIES_COUNT = 5;

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
  return <MyPageInquiryListLayout></MyPageInquiryListLayout>;
}
