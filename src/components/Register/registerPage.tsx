import React from 'react';
import styles from './registerPage.module.scss';

interface RegisterPageProps {
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onChangeCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => {};
  onFocusInput: (input: string) => void;
  onClickClear: (input: string) => void;
  onClickTogglePassword: (input: string) => void;
  onClickRegister: () => void;
  registerInfo: RegisterInfo;
  registerHelper: RegisterInfo;
  isInputHidden: { password: boolean; passwordConfirm: boolean };
  isAgreementChecked: IsAgreementChecked;
  isRegisterButtonDisabled: boolean;
}

interface RegisterInfo {
  username: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

export interface IsAgreementChecked {
  agreementAll: boolean;
  agreementFirst: boolean;
  agreementSecond: boolean;
  agreementThird: boolean;
  agreementFourth: boolean;
}

export default function RegisterPageLayout({
  onChangeInput,
  onChangeCheckbox,
  onFocusInput,
  onClickClear,
  onClickTogglePassword,
  onClickRegister,
  registerInfo,
  registerHelper,
  isInputHidden,
  isAgreementChecked,
  isRegisterButtonDisabled,
}: RegisterPageProps) {
  const { username, password, passwordConfirm, nickname } = registerInfo;
  return (
    <>
      <div className={styles.background}>
        <div className={styles.headerLogoArea}>
          <svg className={styles.headerLogo}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M39.7649 8.92841C41.4239 9.54022 42.38 9.89279 42.38 11.4667C42.38 12.911 41.3584 13.8445 39.7376 13.8445C38.1163 13.8445 36.9616 12.8665 36.9616 11.2445V11.022H34.608C34.608 14.1776 36.8508 16 39.7376 16C42.6686 16 44.7337 13.8445 44.7337 11.3777C44.7337 10.1111 44.3339 9.311 43.668 8.59989C43.0019 7.88901 42.18 7.44459 40.8033 6.93334L39.9149 6.60025C37.9608 5.86657 37.3391 5.31127 37.3391 4.20002C37.3391 2.93318 38.2717 2.15545 39.7152 2.15545C41.1364 2.15545 42.1358 2.93318 42.1358 4.35561V4.64443H44.4894C44.4894 1.79979 42.6909 0 39.7152 0C36.4731 0 34.9853 2.24442 34.9853 4.2445C34.9853 5.35532 35.3407 6.15562 35.9182 6.86672C36.4952 7.57805 37.2947 8.00011 38.4717 8.44452L39.5376 8.84445L39.7649 8.92841ZM13.812 0.222249L8.21601 9.26678L2.64239 0.222249H0V15.7778H2.22042V3.51087L7.19448 11.5778H9.23753L14.2339 3.51087V15.7778H16.4543V0.222249H13.812ZM29.7098 9.26664V0.222332H31.9527V9.24407C31.9527 13.489 29.5322 15.9999 25.8904 15.9999C22.2488 15.9999 19.8284 13.489 19.8284 9.24407V0.222332H22.071V9.26664C22.071 12.0889 23.5366 13.8221 25.8904 13.8221C28.2444 13.8221 29.7098 12.0889 29.7098 9.26664ZM47.5609 15.7777H49.826V0.222332H47.5609V15.7777ZM55.4884 15.7777V3.73338L63.5713 15.7777H66.0584V0.222332H63.8378V12.3331L55.7326 0.222332H53.2678V15.7777H55.4884ZM76.4865 11.4667C76.4865 9.8929 75.5304 9.54027 73.8718 8.92854L73.6442 8.84445L72.5785 8.44452C71.4015 8.00011 70.602 7.57805 70.0247 6.86672C69.4473 6.15562 69.0919 5.35532 69.0919 4.2445C69.0919 2.24442 70.5799 0 73.822 0C76.7975 0 78.5962 1.79979 78.5962 4.64443H76.2424V4.35561C76.2424 2.93318 75.243 2.15545 73.822 2.15545C72.3785 2.15545 71.4459 2.93318 71.4459 4.20002C71.4459 5.31127 72.0676 5.86657 74.0217 6.60025L74.9099 6.93334C76.2866 7.44459 77.1084 7.88901 77.7746 8.59989C78.4407 9.311 78.8403 10.1111 78.8403 11.3777C78.8403 13.8445 76.7751 16 73.8444 16C70.9574 16 68.7146 14.1776 68.7146 11.022H71.0684V11.2445C71.0684 12.8665 72.2231 13.8445 73.8444 13.8445C75.465 13.8445 76.4865 12.911 76.4865 11.4667ZM90.8477 11.4442H83.9195L82.1652 15.7774H79.8778L86.1622 0.221854H88.6049L94.8889 15.7774H92.6017L90.8477 11.4442ZM87.3835 2.88884L84.8077 9.24431H89.9593L87.3835 2.88884Z"
              fill="black"
            ></path>
          </svg>
        </div>
        <div className={styles.contentArea}>
          <div className={styles.joinContainer}>
            <div className={styles.joinForm}>
              <div className={`${styles.inputArea} ${styles.inputAreaFirst}`}>
                <label className={styles.inputLabel} htmlFor="inputId">
                  아이디
                  <span className={styles.inputDot}></span>
                </label>
                <div
                  className={
                    registerHelper.username &&
                    registerHelper.username !== '사용 가능한 아이디입니다.'
                      ? `${styles.inputWrap} ${styles.inputWrapDanger}`
                      : styles.inputWrap
                  }
                >
                  <input
                    className={styles.input}
                    name="username"
                    value={username}
                    placeholder="영문, 숫자 5-11자"
                    type="text"
                    maxLength={11}
                    id="inputId"
                    onFocus={() => {
                      onFocusInput('username');
                    }}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                  ></input>
                  {username && (
                    <button
                      className={styles.inputClearButton}
                      type="button"
                      onClick={() => onClickClear('username')}
                    >
                      <svg width={20} height={20} fill="none">
                        <circle cx="10" cy="10" r="10" fill="#B3B3B3"></circle>
                        <path
                          d="M5.52786 5.52742L14.4722 14.4718M14.4722 5.52734L5.52783 14.4717"
                          stroke="white"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
                <div
                  className={
                    registerHelper.username === '사용 가능한 아이디입니다.'
                      ? `${styles.helper} ${styles.valid}`
                      : `${styles.helper} ${styles.invalid}`
                  }
                >
                  {registerHelper.username}
                </div>
              </div>

              <div className={styles.inputArea}>
                <label className={styles.inputLabel} htmlFor="inputPassword">
                  비밀번호
                  <span className={styles.inputDot}></span>
                </label>
                <div
                  className={
                    registerHelper.password
                      ? `${styles.inputWrap} ${styles.inputWrapDanger}`
                      : styles.inputWrap
                  }
                >
                  <input
                    className={styles.input}
                    name="password"
                    value={password}
                    placeholder="숫자, 영문, 특수문자 조합 최소 8자"
                    type={isInputHidden.password ? 'password' : 'text'}
                    maxLength={30}
                    id="inputPassword"
                    onFocus={() => {
                      onFocusInput('password');
                    }}
                    onChange={(e) => {
                      onChangeInput(e);
                    }}
                  ></input>
                  {password && (
                    <button
                      className={styles.inputClearButton}
                      type="button"
                      onClick={() => onClickClear('password')}
                    >
                      <svg width={20} height={20} fill="none">
                        <circle cx="10" cy="10" r="10" fill="#B3B3B3"></circle>
                        <path
                          d="M5.52786 5.52742L14.4722 14.4718M14.4722 5.52734L5.52783 14.4717"
                          stroke="white"
                        ></path>
                      </svg>
                    </button>
                  )}
                  {password && (
                    <button
                      className={
                        isInputHidden.password
                          ? styles.showPasswordButton
                          : styles.hidePasswordButton
                      }
                      onClick={(e) => {
                        onClickTogglePassword('password');
                      }}
                    ></button>
                  )}
                </div>
                <div className={`${styles.helper} ${styles.invalid}`}>
                  {registerHelper.password}
                </div>
              </div>

              <div
                className={`${styles.inputArea} ${styles.inputAreaPasswordConfirm}`}
              >
                <div
                  className={
                    registerHelper.passwordConfirm
                      ? `${styles.inputWrap} ${styles.inputWrapDanger}`
                      : styles.inputWrap
                  }
                >
                  <input
                    className={styles.input}
                    name="passwordConfirm"
                    value={passwordConfirm}
                    placeholder="비밀번호 재입력"
                    type={isInputHidden.passwordConfirm ? 'password' : 'text'}
                    onFocus={() => {
                      onFocusInput('passwordConfirm');
                    }}
                    onChange={async (e) => {
                      onChangeInput(e);
                    }}
                  ></input>
                  {passwordConfirm && (
                    <button
                      className={styles.inputClearButton}
                      type="button"
                      onClick={() => onClickClear('passwordConfirm')}
                    >
                      <svg width={20} height={20} fill="none">
                        <circle cx="10" cy="10" r="10" fill="#B3B3B3"></circle>
                        <path
                          d="M5.52786 5.52742L14.4722 14.4718M14.4722 5.52734L5.52783 14.4717"
                          stroke="white"
                        ></path>
                      </svg>
                    </button>
                  )}
                  {passwordConfirm && (
                    <button
                      className={
                        isInputHidden.passwordConfirm
                          ? styles.showPasswordButton
                          : styles.hidePasswordButton
                      }
                      onClick={(e) => {
                        onClickTogglePassword('passwordConfirm');
                      }}
                    ></button>
                  )}
                </div>
                <div className={`${styles.helper} ${styles.invalid}`}>
                  {registerHelper.passwordConfirm}
                </div>
              </div>

              <div className={styles.inputArea}>
                <label className={styles.inputLabel} htmlFor="inputNick">
                  닉네임
                  <span className={styles.inputDot}></span>
                </label>
                <div
                  className={
                    registerHelper.nickname &&
                    registerHelper.nickname !== '사용 가능한 닉네임입니다.'
                      ? `${styles.inputWrap} ${styles.inputWrapDanger}`
                      : styles.inputWrap
                  }
                >
                  <input
                    className={styles.input}
                    id="inputNick"
                    name="nickname"
                    placeholder="영문, 숫자 5-11자"
                    onFocus={() => {
                      onFocusInput('nickname');
                    }}
                    onChange={async (e) => {
                      await onChangeInput(e);
                    }}
                  ></input>
                  {nickname && (
                    <button
                      className={styles.inputClearButton}
                      type="button"
                      onClick={() => onClickClear('nickname')}
                    >
                      <svg width={20} height={20} fill="none">
                        <circle cx="10" cy="10" r="10" fill="#B3B3B3"></circle>
                        <path
                          d="M5.52786 5.52742L14.4722 14.4718M14.4722 5.52734L5.52783 14.4717"
                          stroke="white"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
                <div
                  className={
                    registerHelper.nickname === '사용 가능한 닉네임입니다.'
                      ? `${styles.helper} ${styles.valid}`
                      : `${styles.helper} ${styles.invalid}`
                  }
                >
                  {registerHelper.nickname}
                </div>
              </div>

              {/* <div className={styles.inputRecommendIdArea}>
                <label className={styles.inputRecommendIdLabel}>
                  친구 초대 추천인 아이디
                </label>
                <div className={styles.inputRecommendIdWrap}>
                  <input className={styles.inputRecommendId}></input>
                </div>
              </div> */}
              <div className={styles.agreementForm}>
                <div className={styles.checkboxAll}>
                  <input
                    type="checkbox"
                    id="agreementAll"
                    checked={isAgreementChecked.agreementAll}
                    onChange={(e) => onChangeCheckbox(e)}
                    className={styles.allCheckButton}
                  ></input>
                  <label htmlFor="agreementAll" className={styles.allCheckText}>
                    약관 전체 동의하기
                  </label>
                </div>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="agreementFirst"
                    checked={isAgreementChecked.agreementFirst}
                    onChange={(e) => onChangeCheckbox(e)}
                    className={styles.oneCheckButton}
                  ></input>
                  <span className={styles.oneCheckText}>
                    <label htmlFor="agreementFirst">
                      [필수] 개인정보 수집 및 이용 동의
                    </label>
                    <button className={styles.inDetail}>자세히</button>
                  </span>
                </div>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="agreementSecond"
                    checked={isAgreementChecked.agreementSecond}
                    onChange={(e) => onChangeCheckbox(e)}
                    className={styles.oneCheckButton}
                  ></input>
                  <span className={styles.oneCheckText}>
                    <label htmlFor="agreementSecond">
                      [필수] 무신사, 무신사 스토어 이용 약관
                    </label>
                    <button className={styles.inDetail}>자세히</button>
                  </span>
                </div>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="agreementThird"
                    checked={isAgreementChecked.agreementThird}
                    onChange={(e) => onChangeCheckbox(e)}
                    className={styles.oneCheckButton}
                  ></input>
                  <span className={styles.oneCheckText}>
                    <label htmlFor="agreementThird">
                      [필수] 만 14세 미만 가입 제한
                    </label>
                  </span>
                </div>
                <div className={styles.checkbox}>
                  <input
                    type="checkbox"
                    id="agreementFourth"
                    checked={isAgreementChecked.agreementFourth}
                    onChange={(e) => onChangeCheckbox(e)}
                    className={styles.oneCheckButton}
                  ></input>
                  <span className={styles.oneCheckText}>
                    <label htmlFor="agreementFourth">
                      [선택] 마케팅 활용 및 광고성 정보 수신 동의
                    </label>
                    <button className={styles.inDetail}>자세히</button>
                  </span>
                </div>
                <div className={styles.signupButtonArea}>
                  <button
                    className={
                      isRegisterButtonDisabled
                        ? styles.signupButtonF
                        : styles.signupButtonT
                    }
                    disabled={isRegisterButtonDisabled}
                    onClick={onClickRegister}
                  >
                    본인인증하고 가입하기
                  </button>
                </div>
                {/* <ul className={styles.signupButtonHelper}>
                  <li className={styles.signupButtonHelperText}>
                    본인인증이 어려운 경우(만 14세 미만 포함),&nbsp;
                    <a href="/login">비회원으로 구매</a>할 수 있습니다.
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
