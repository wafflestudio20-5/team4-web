import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../../store';
import { Inquiry } from '../../../lib/interface';
import InquiryBoxLayout from './InquiryBoxLayout';

interface InquiryBoxProps {
  inquiry: Inquiry;
}

export default function InquiryBox({ inquiry }: InquiryBoxProps) {
  const [verbose, setVerbose] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => {
    return state.session;
  });

  const onSwitch = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (inquiry.isSecret && inquiry.user.id !== user?.id) {
      toast('비밀글은 작성자만 볼 수 있습니다.');
      return;
    }
    setVerbose(!verbose);
  };

  return (
    <InquiryBoxLayout inquiry={inquiry} verbose={verbose} onSwitch={onSwitch} />
  );
}
