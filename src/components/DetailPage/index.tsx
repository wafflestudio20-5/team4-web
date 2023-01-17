import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import DetailPageLayout from './DetailPageLayout';
import { useApiData, useApiItemFetcher } from '../../lib/api';

export interface PurchaseDraft {
  option?: string;
  quantity: number;
}

export default function DetailPage() {
  const [displayIdx, setDisplayIdx] = useState<number>(0);
  const [input, setInput] = useState<PurchaseDraft>({
    quantity: 1,
  });

  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id) : null;

  const { data, error } = useApiData(useApiItemFetcher(parsedId));

  const navigate = useNavigate();

  const setDisplay = (idx: number) => {
    setDisplayIdx(idx);
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput({
      option: e.target.value,
      quantity: 1,
    });
  };

  const onIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInput({
      ...input,
      quantity: input.quantity + 1,
    });
  };

  const onDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInput({
      ...input,
      quantity: input.quantity - 1,
    });
  };

  useEffect(() => {
    if (error) {
      const payload = error.payload as AxiosError;
      console.log(payload);
      if (payload.response?.status === 404) {
        toast('해당하는 상품을 찾을 수 없습니다.');
        navigate('/');
      }
    }
  }, [error, navigate]);

  if (data) {
    return (
      <DetailPageLayout
        item={data.item}
        input={input}
        displayIdx={displayIdx}
        setDisplay={setDisplay}
        onChange={onChange}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    );
  }
}
