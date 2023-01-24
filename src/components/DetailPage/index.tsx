import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import DetailPageLayout from './DetailPageLayout';
import {
  useApiData,
  useApiItemFetcher,
  apiPostCart,
  apiPostViewedGoods,
} from '../../lib/api';
import { Purchase } from '../../lib/interface';

export interface PurchaseDraft {
  option?: string;
  quantity: number;
}

export interface AddToCartModalState {
  open: boolean;
  visible: boolean;
  message?: string;
}

export default function DetailPage() {
  /***
   *
   * param에서 가져온 id와 useApiItemFetcher를 이용해 item을 가져옵니다.
   * 이 과정에서 에러가 발생한다면, 홈페이지로 navigate합니다.
   *
   */
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id) : null;

  const { user, accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  const navigate = useNavigate();

  const { data, error } = useApiData(useApiItemFetcher(parsedId));

  // 로그인한 상태로 상세페이지에 접속했다면, 최근 본 상품에 id에 해당하는 상품을 자동으로 넣습니다.
  useEffect(() => {
    if (parsedId && accessToken) apiPostViewedGoods(parsedId, accessToken);
  }, [parsedId, accessToken]);

  // error이 null이거나 undefined라면 아무런 효과도 일어나지 않습니다.
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

  /***
   *
   * Item의 images 필드 중 가장 크게 보여줄 사진의 idx를 관리합니다.
   * MouseOver 이벤트 발생 시 setDisplay 함수가 호출됩니다.
   *
   */
  const [displayIdx, setDisplayIdx] = useState<number>(0);

  const setDisplay = (idx: number) => {
    setDisplayIdx(idx);
  };

  /***
   *
   * 구매 혹은 장바구니에 필요한 Purchase 관련 정보를 관리합니다.
   * option의 기본값은 undefined, quantity의 기본값은 1입니다.
   *
   * 무신사 홈페이지에는 여러 개의 옵션을 한꺼번에 선택한 뒤 구매할 수 있지만,
   * 본 프로젝트에서는 최대 1개의 옵션만을 선택할 수 있도록 구현했습니다.
   *
   */
  const [input, setInput] = useState<PurchaseDraft>({
    quantity: 1,
  });

  const onChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === input.option) {
      toast('이미 선택된 옵션입니다.');
      return;
    }
    setInput({
      option: e.target.value,
      quantity: 1,
    });
  };

  const onClearOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    setInput({
      option: undefined,
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

  /***
   *
   * 바로구매 클릭 시,
   * 1. 옵션이 있는 상품임에도 불구하고 옵션을 선택하지 않았다면 '옵션을 선택해 주세요.'라는 알림이 뜨고,
   * 2. 로그인하지 않은 상태라면 로그인 페이지로 redirect합니다.
   *
   * 위의 두 문제가 모두 해결되었다면,
   * input 정보로부터 purchase 객체를 만들어 구매 페이지로 redirect합니다.
   *
   */
  const onPurchase = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (parsedId && data) {
      if (data.item.options && !input.option) {
        toast('옵션을 선택해 주세요.');
        return;
      }
      if (!user) {
        navigate('/login');
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
        state: { items: purchase, from: 'detail' },
      });
    }
  };

  /***
   *
   * 장바구니 클릭 시,
   * 1. 옵션이 있는 상품임에도 불구하고 옵션을 선택하지 않았다면 '옵션을 선택해 주세요.'라는 알림이 뜨고,
   * 2. 로그인하지 않은 상태라면 로그인 페이지로 redirect합니다.
   *
   * 위의 두 문제가 모두 해결되었다면, apiPostCart를 호출합니다.
   * 정상적으로 장바구니에 상품이 담겼다면, 안내 메시지와 함께 장바구니 페이지로 이동할 수 있는 모달이 3초 간 뜹니다.
   * 장바구니에 상품을 넣는 과정에서 문제가 발생했다면, 알맞은 에러 메시지를 담은 모달이 3초 간 뜹니다.
   *
   */
  const onAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (parsedId && data) {
      const { option, quantity } = input;
      if (data.item.options && !option) {
        toast('옵션을 선택해 주세요.');
        return;
      }
      if (!user) {
        navigate('/login');
        return;
      }
      try {
        await apiPostCart(parsedId, option, quantity, accessToken);
        openModal('장바구니에 상품이 담겼습니다.');
      } catch (error) {
        const e = error as AxiosError;
        switch (e.response?.status) {
          case 409:
            openModal('이미 장바구니에 있는 상품입니다.');
            return;
          case 404:
            toast('상품 정보를 찾을 수 없습니다.');
            return;
          default:
            toast('오류가 발생했습니다. 다시 시도해주세요.');
            return;
        }
      }
    }
  };

  /***
   *
   * 장바구니 모달, 애니메이션 구현
   *
   * 모달은 visible일 떄 렌더링 됩니다.
   *
   * openModal 함수는 모달에 띄울 메시지를 인자로 받아서 open을 true로 만들고,
   * setTimeout 함수로 2.5초 뒤에 open을 다시 false로 만듭니다.
   *
   * 모달이 visible인데 openModal에 의해 open이 false가 된 경우,
   * setTimeout으로 0.5초의 딜레이를 두어 해당 시간 동안 fadeOut 애니메이션이 보이고,
   * visible과 message를 각각 false와 undefined로 만듭니다.
   *
   */
  const [modal, setModal] = useState<AddToCartModalState>({
    open: false,
    visible: false,
  });

  const openModal = (msg: string) => {
    if (!modal.open) {
      setModal((prevState) => ({
        ...prevState,
        open: true,
        message: msg,
      }));
      setTimeout(() => {
        setModal((prevState) => ({
          ...prevState,
          open: false,
        }));
      }, 2500);
    }
  };

  useEffect(() => {
    if (!modal.visible && modal.open) {
      setModal((prevState) => ({
        ...prevState,
        visible: true,
      }));
    }
    if (modal.visible && !modal.open) {
      setTimeout(() => {
        setModal((prevState) => ({
          ...prevState,
          visible: false,
          message: undefined,
        }));
      }, 500);
    }
  }, [modal.open, modal.visible]);

  if (data) {
    return (
      <DetailPageLayout
        item={data.item}
        input={input}
        modalState={modal}
        displayIdx={displayIdx}
        setDisplay={setDisplay}
        onChangeOption={onChangeOption}
        onClearOption={onClearOption}
        onChangeQuantity={onChangeQuantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onPurchase={onPurchase}
        onAddToCart={onAddToCart}
      />
    );
  }
}
