import React, { useState } from 'react';
import LoginPageLayout from './LoginPageLayout';
import { apiLogin } from '../../lib/api';
import { ApiLoginParams } from '../../lib/interface';

export default function LoginPage() {
  const [input, setInput] = useState<ApiLoginParams>({
    username: '',
    password: '',
  });

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
    await apiLogin(username, password)
      .then((r) => {
        console.log(r);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSocialLogin = () => {
    window.open('http://localhost:8080/oauth2/authorization/kakao');
  };

  return (
    <LoginPageLayout
      input={input}
      onChange={onChange}
      onLogin={onLogin}
      onSocialLogin={onSocialLogin}
    />
  );
}
