import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SocialLoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
    toast('로그인 되었습니다.');
  }, [navigate]);

  return <></>;
}
