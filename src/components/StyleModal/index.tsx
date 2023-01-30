import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setClose } from '../../store/slices/modal';
import StyleModalLayout from './StyleModalLayout';

export default function StyleModal() {
  const [visible, setVisible] = useState<boolean>(false);

  const outside = useRef(null);

  const { open } = useSelector((state: RootState) => {
    return state.modal;
  });

  console.log(`open: ${open}, visible: ${visible}`);

  const dispatch = useDispatch();

  /*
  다른 컴포넌트에서는 이런 식으로 모달창을 open해주시면 됩니다.

  const onOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setOpen(styleId));
  }
  */

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

  return (
    <StyleModalLayout
      open={open}
      visible={visible}
      outside={outside}
      onClose={onClose}
      onOuterClick={onOuterClick}
    />
  );
}
