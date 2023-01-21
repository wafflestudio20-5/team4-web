import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { postRefresh } from '../../store/slices/session';

export default function SocialLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(postRefresh());
    navigate('/');
  }, [dispatch, navigate]);

  return <></>;
}
