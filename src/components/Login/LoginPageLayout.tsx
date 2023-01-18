import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDto } from '../../lib/dto';
import styles from './LoginPageLayout.module.scss';
import logo from '../../resources/image/musinsa_logo.png';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  input: LoginDto;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function LoginForm({ input, onChange, onLogin }: LoginFormProps) {
  const { username, password } = input;
  return (
    <>
      <div className={styles.idInputWrap}>
        <input
          name="username"
          value={username}
          className={styles.idInput}
          placeholder="아이디"
          onChange={onChange}
        />
      </div>
      <div className={styles.passwordInputWrap}>
        <input
          name="password"
          value={password}
          className={styles.passwordInput}
          placeholder="비밀번호"
          type="password"
          onChange={onChange}
        />
      </div>
      <button className={styles.loginButton} onClick={onLogin}>
        로그인
      </button>
    </>
  );
}

function LoginUtility() {
  return (
    <div className={styles.loginUtility}>
      <div className={styles.loginCheckbox}>
        <input type="checkbox" id="autoLoginCheckbox" />
        <label htmlFor="autoLoginCheckbox" className={styles.labelCheckBox}>
          자동 로그인
        </label>
      </div>
      <span className={styles.findDiv}>
        <button className={styles.findId}>아이디 찾기</button>
        <button className={styles.findPassword}>비밀번호 찾기</button>
      </span>
    </div>
  );
}

interface SocialLoginProps {
  onSocialLogin: () => void;
}

function SocialLogin({ onSocialLogin }: SocialLoginProps) {
  return (
    <div className={styles.loginSocialArea}>
      <div className={styles.loginKakao} onClick={onSocialLogin}>
        <svg className={styles.kakaoLogo}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 7C10.029 7 6 10.129 6 13.989C6 16.389 7.559 18.505 9.932 19.764L8.933 23.431C8.845 23.754 9.213 24.013 9.497 23.826L13.874 20.921C14.243 20.958 14.618 20.978 15 20.978C19.971 20.978 24 17.849 24 13.989C24 10.129 19.971 7 15 7Z"
            fill="black"
          />
        </svg>
        <span className={styles.kakaoText}>카카오 로그인</span>
      </div>
    </div>
  );
}

function LoginBottom() {
  const navigate = useNavigate();
  return (
    <div className={styles.loginBottom}>
      <span>가입만 해도 즉시 15% 할인</span>
      <div className={styles.bottomButton}>
        <span
          className={styles.loginBottomButton}
          onClick={() => {
            navigate('/register');
          }}
        >
          회원가입
        </span>
        <span
          className={styles.loginBottomButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          이전 페이지
        </span>
      </div>
    </div>
  );
}

interface LoginPageLayoutProps {
  input: LoginDto;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSocialLogin: () => void;
}

export default function LoginPageLayout({
  input,
  onChange,
  onLogin,
  onSocialLogin,
}: LoginPageLayoutProps) {
  return (
    <div className={styles.background}>
      <div className={styles.middleWhiteBox}>
        <section className={styles.header}>
          <div className={styles.loginTextBox}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </section>
        <div className={styles.content}>
          <div className={styles.commonTabUnderline}>
            <div className={styles.loginTab}>
              <span>LOGIN</span>
            </div>
            {/* <div className={styles.buySearchTab}>
              <span>비회원 구매하기</span>
            </div> */}
          </div>
          <div className={styles.loginArea}>
            <div className={styles.loginForm}>
              <LoginForm input={input} onChange={onChange} onLogin={onLogin} />
              <LoginUtility />
              <SocialLogin onSocialLogin={onSocialLogin} />
              <LoginBottom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
