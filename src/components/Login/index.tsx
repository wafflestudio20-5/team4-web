import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const onLogin = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
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
    } catch (error) {
      toast(`${error}`);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onLogin(e);
  };

  const onSocialLogin = () => {
    window.location.href =
      process.env.REACT_APP_REDIRECT_HOST + '/oauth2/authorization/kakao';
  };

  useEffect(() => {
    if (session.user) {
      navigate(-1);
    }
  });

  return (
    <LoginPageLayout
      input={input}
      onChange={onChange}
      onLogin={onLogin}
      onKeyPress={onKeyPress}
      onSocialLogin={onSocialLogin}
    />
  );
}
