import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SocialLoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
  }, []);

  return <></>;
}
