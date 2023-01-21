import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store';
// import { postRefresh } from '../../store/slices/session';
// import { AppDispatch } from '../../store';
import { useCookies } from 'react-cookie';

export default function SocialLoginPage() {
  // const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['refreshToken']);
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useParams();

  useEffect(() => {
    // navigate('/');
    setCookie('refreshToken', accessToken!);
    console.log(cookies);
    // dispatch(postRefresh());
  }, [accessToken, cookies, dispatch, setCookie]);

  return <></>;
}
