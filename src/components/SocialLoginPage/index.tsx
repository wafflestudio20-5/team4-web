import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { apiSocialLogin } from '../../lib/api';
import { AppDispatch } from '../../store';
import { postRefresh } from '../../store/slices/session';

export default function SocialLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useParams();

  const socialLogin = useCallback(
    async (accessToken: string) => {
      await apiSocialLogin(accessToken);
      await dispatch(postRefresh());
      navigate('/');
    },
    [navigate, dispatch]
  );

  useEffect(() => {
    if (accessToken) socialLogin(accessToken);
  }, [accessToken, socialLogin]);

  return <></>;
}
