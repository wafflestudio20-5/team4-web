import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { postLogin } from '../../store/slices/session';
import LoginPageLayout from './LoginPageLayout';
import { LoginDto } from '../../lib/dto';
import { Session } from '../../lib/interface';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [input, setInput] = useState<LoginDto>({
    username: '',
    password: '',
  });

  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { username, password } = input;
    setInput({
      username: '',
      password: '',
    });
    try {
      await dispatch(
        postLogin({
          username,
          password,
        })
      ).unwrap();
      toast('로그인 되었습니다.');
    } catch (error) {
      toast(`${error}`);
    }
  };

  const onSocialLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };

  useEffect(() => {
    if (session.user && location.state?.fromRegister) navigate(-3);
    else if (session.user && !location.state?.fromRegister) navigate(-1);
  });

  return (
    <LoginPageLayout
      input={input}
      onChange={onChange}
      onLogin={onLogin}
      onSocialLogin={onSocialLogin}
    />
  );
}
