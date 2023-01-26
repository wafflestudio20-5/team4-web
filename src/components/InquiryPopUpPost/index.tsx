import InquiryPopUpPostLayout from './InquiryPopUpPostLayout';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useApiData, useApiItemFetcher } from '../../lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function InquiryPopUpPost() {
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id) : null;

  const { user, accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  const { data, error } = useApiData(useApiItemFetcher(parsedId));

  return <InquiryPopUpPostLayout data={data?.item}></InquiryPopUpPostLayout>;
}
