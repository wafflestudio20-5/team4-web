import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import DetailPageLayout from './DetailPageLayout';
import { useApiData, useApiItemFetcher, apiPutCart } from '../../lib/api';
import { Purchase } from '../../lib/interface';

export interface PurchaseDraft {
  option?: string;
  quantity: number;
}

export default function DetailPage() {
  const [displayIdx, setDisplayIdx] = useState<number>(0);
  const [input, setInput] = useState<PurchaseDraft>({
    quantity: 1,
  });

  const accessToken = useSelector((state: RootState) => {
    return state.session.accessToken;
  });

  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id) : null;

  const { data, error } = useApiData(useApiItemFetcher(parsedId));

  const navigate = useNavigate();

  const setDisplay = (idx: number) => {
    setDisplayIdx(idx);
  };

  const onChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput({
      option: e.target.value,
      quantity: 1,
    });
  };

  const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(e.target.value);
    setInput({
      ...input,
      quantity: Number.isNaN(parsedValue) ? 1 : parsedValue,
    });
  };

  const onIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInput({
      ...input,
      quantity: input.quantity + 1,
    });
  };

  const onDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (input.quantity === 1) {
      toast('더 이상 줄일 수 없습니다.');
      return;
    }
    setInput({
      ...input,
      quantity: input.quantity - 1,
    });
  };

  const onPurchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (parsedId && data) {
      if (data.item.options && !input.option) {
        toast('옵션을 선택해 주세요.');
        return;
      }
      const purchase: Purchase[] = [
        {
          id: parsedId,
          item: data.item,
          quantity: input.quantity,
          option: input.option,
        },
      ];
      navigate('/purchase', {
        state: { items: purchase },
      });
    }
  };

  const onAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (parsedId && data) {
      const { option, quantity } = input;
      try {
        await apiPutCart(parsedId, option, quantity, accessToken);
        setInput({
          option: undefined,
          quantity: 1,
        });
      } catch (error) {
        const e = error as AxiosError;
        if (e.response?.status === 409) {
          toast('이미 장바구니에 있는 상품입니다.');
        }
      }
    }
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
        onChangeOption={onChangeOption}
        onChangeQuantity={onChangeQuantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onPurchase={onPurchase}
        onAddToCart={onAddToCart}
      />
    );
  }
}
