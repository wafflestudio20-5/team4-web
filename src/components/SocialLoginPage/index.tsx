import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { AppDispatch } from '../../store';

export default function SocialLoginPage() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useParams();

  useEffect(() => {
    // dispatch(postRefresh());
    // navigate('/');
    console.log(accessToken);
  }, [accessToken]);

  return <></>;
}
