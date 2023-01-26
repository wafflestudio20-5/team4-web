import InquiryPopUpPostLayout from './InquiryPopUpPostLayout';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApiData, useApiItemFetcher } from '../../lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface inputInterface {
  type: string;
  option: string | undefined;
  isSecret: boolean;
  title: string;
  content: string;
}

export default function InquiryPopUpPost() {
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id) : null;

  const { accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

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

  const [input, setInput] = useState<inputInterface>({
    type: '',
    option: undefined,
    isSecret: false,
    title: '',
    content: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input.isSecret === false) {
      setInput({ ...input, isSecret: true });
    } else {
      setInput({ ...input, isSecret: false });
    }
  };
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '옵션 선택') {
      setInput({ ...input, option: undefined });
    } else {
      setInput({ ...input, option: e.target.value });
    }
  };
  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ ...input, content: e.target.value });
  };

  //input radio //select //input checkbox //input text //textarea

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <InquiryPopUpPostLayout
      data={data?.item}
      input={input}
      onChange={onChange}
      onChangeCheckbox={onChangeCheckbox}
      onChangeSelect={onChangeSelect}
      onChangeTextarea={onChangeTextarea}
    ></InquiryPopUpPostLayout>
  );
}
