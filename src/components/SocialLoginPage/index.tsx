import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { postRefresh } from '../../store/slices/session';

export default function SocialLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useParams();

  useEffect(() => {
    dispatch(postRefresh());
    // navigate('/');
    console.log(accessToken);
  }, [dispatch, navigate, accessToken]);

  return <></>;
}
