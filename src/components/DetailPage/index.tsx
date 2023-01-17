import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import DetailPageLayout from './DetailPageLayout';
import { useApiData, useApiItemFetcher } from '../../lib/api';

export default function DetailPage() {
  const [displayIdx, setDisplayIdx] = useState<number>(0);

  const changeDisplay = (idx: number) => {
    setDisplayIdx(idx);
  };

  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id) : null;

  const { data, error } = useApiData(useApiItemFetcher(parsedId));

  const navigate = useNavigate();

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
        displayIdx={displayIdx}
        changeDisplay={changeDisplay}
      />
    );
  }
}
