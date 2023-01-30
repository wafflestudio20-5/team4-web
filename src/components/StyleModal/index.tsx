import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { setClose } from '../../store/slices/modal';
import { useApiData, useApiStyleFetcher } from '../../lib/api';
import StyleModalLayout from './StyleModalLayout';

export default function StyleModal() {
  /***
   *
   * 모달 상태, 애니메이션 관리
   *
   */
  const [visible, setVisible] = useState<boolean>(false);

  const outside = useRef(null);

  const { open, styleId } = useSelector((state: RootState) => {
    return state.modal;
  });

  console.log(`open: ${open}, visible: ${visible}`);

  const dispatch = useDispatch();

  const onClose = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    dispatch(setClose());
  };

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (outside.current === e.target) {
      onClose(e);
    }
  };

  useEffect(() => {
    if (!visible && open) {
      setVisible(true);
    }
    if (visible && !open) {
      setTimeout(() => setVisible(false), 500);
    }
  }, [visible, open]);

  /***
   *
   * 스타일 데이터 불러오기
   *
   */
  const { accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  const { data, error } = useApiData(useApiStyleFetcher(styleId, accessToken));

  // error이 null이거나 undefined라면 아무런 효과도 일어나지 않습니다.
  useEffect(() => {
    if (error) {
      const payload = error.payload as AxiosError;
      console.log(payload);
      if (payload.response?.status === 404) {
        toast('해당하는 스타일을 찾을 수 없습니다.');
        dispatch(setClose());
      }
    }
  }, [error, dispatch]);

  if (data) {
    return (
      <StyleModalLayout
        open={open}
        data={data}
        visible={visible}
        outside={outside}
        onClose={onClose}
        onOuterClick={onOuterClick}
      />
    );
  }
}
