import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { sessionActions } from '../../store/slices/session';

export default function SocialLoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useParams<{ accessToken: string }>();

  useEffect(() => {
    dispatch(sessionActions.setAccessToken(accessToken!));
    navigate('/');
  }, [accessToken, dispatch, navigate]);

  return <></>;
}
