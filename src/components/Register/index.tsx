import React, { useCallback, useEffect, useState } from 'react';
import RegisterPageLayout, { IsAgreementChecked } from './registerPage';
import { apiCheckNickname, apiCheckUsername, apiRegister } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Session } from '../../lib/interface';
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import {
  regexAlphabet,
  regexNumber,
  regexRepeat,
  regexSpecial,
  regexUsername,
} from '../../lib/formatters/regexFormatter';

function RegisterPage() {
  const session: Session = useSelector((state: RootState) => state.session);
  const navigate = useNavigate();

  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [registerHelper, setRegisterHelper] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });
  const [isInputFocused, setIsInputFocused] = useState({
    username: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
  });
  const [isInputHidden, setIsInputHidden] = useState({
    password: true,
    passwordConfirm: true,
  });
  const [isAgreementChecked, setIsAgreementChecked] =
    useState<IsAgreementChecked>({
      agreementAll: false,
      agreementFirst: false,
      agreementSecond: false,
      agreementThird: false,
      agreementFourth: false,
    });
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] =
    useState<boolean>(true);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    switch (id) {
      case 'agreementAll':
        isAgreementChecked.agreementAll
          ? setIsAgreementChecked({
              agreementAll: false,
              agreementFirst: false,
              agreementSecond: false,
              agreementThird: false,
              agreementFourth: false,
            })
          : setIsAgreementChecked({
              agreementAll: true,
              agreementFirst: true,
              agreementSecond: true,
              agreementThird: true,
              agreementFourth: true,
            });
        break;
      default:
        const nextIsAgreementChecked = {
          ...isAgreementChecked,
          [id]: !isAgreementChecked[id as keyof IsAgreementChecked],
        };
        checkEveryAgreementChecked(nextIsAgreementChecked)
          ? (nextIsAgreementChecked.agreementAll = true)
          : (nextIsAgreementChecked.agreementAll = false);
        setIsAgreementChecked(nextIsAgreementChecked);
        break;
    }
  };

  const onFocusInput = (input: string) => {
    switch (input) {
      case 'username':
        setIsInputFocused((prev) => ({ ...prev, username: true }));
        break;
      case 'password':
        setIsInputFocused((prev) => ({ ...prev, password: true }));
        break;
      case 'passwordConfirm':
        setIsInputFocused((prev) => ({ ...prev, passwordConfirm: true }));
        break;
      case 'nickname':
        setIsInputFocused((prev) => ({ ...prev, nickname: true }));
        break;
    }
  };

  const onClickClear = (input: string) => {
    switch (input) {
      case 'username':
        setRegisterInfo((prev) => ({ ...prev, username: '' }));
        break;
      case 'password':
        setRegisterInfo((prev) => ({ ...prev, password: '' }));
        break;
      case 'passwordConfirm':
        setRegisterInfo((prev) => ({ ...prev, passwordConfirm: '' }));
        break;
      case 'nickname':
        setRegisterInfo((prev) => ({ ...prev, nickname: '' }));
        break;
    }
  };

  const onClickTogglePassword = (input: string) => {
    switch (input) {
      case 'password':
        setIsInputHidden((prev) => ({ ...prev, password: !prev.password }));
        break;
      case 'passwordConfirm':
        setIsInputHidden((prev) => ({
          ...prev,
          passwordConfirm: !prev.passwordConfirm,
        }));
        break;
    }
  };

  const onClickRegister = () => {
    apiRegister(
      registerInfo.username,
      registerInfo.password,
      registerInfo.nickname
    )
      .then(() => {
        toast('회원가입이 완료되었습니다!');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsernameHelper = useCallback(
    async (username: string) => {
      if (!isInputFocused.username) return { message: '' };
      if (!username) return { message: '아이디는 필수정보입니다.' };
      if (username.length < 5)
        return { message: '아이디는 5자 이상이어야 합니다.' };
      if (!regexUsername.test(username))
        return {
          message: '아이디는 영문소문자, 숫자, 특수기호(_)만 사용 가능합니다.',
        };
      const response = await apiCheckUsername(username);
      return response.data.isUnique
        ? { message: '사용 가능한 아이디입니다.' }
        : { message: '이미 사용 중인 아이디입니다.' };
    },
    [isInputFocused.username]
  );

  const getPasswordHelper = useCallback(
    (password: string) => {
      if (!isInputFocused.password) return { message: '' };
      if (!password) return { message: '비밀번호는 필수정보입니다.' };
      if (password.length < 8)
        return { message: '8~30자 이내로 입력해 주십시오.' };
      if (regexRepeat.test(password))
        return {
          message: '동일문자를 반복해서 4자 이상 사용할 수 없습니다.',
        };
      const combinationCount =
        Number(regexNumber.test(password)) +
        Number(regexAlphabet.test(password)) +
        Number(regexSpecial.test(password));
      if (combinationCount < 2)
        return {
          message:
            '숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오.',
        };
      return { message: '' };
    },
    [isInputFocused.password]
  );

  const getPasswordConfirmHelper = useCallback(
    (passwordConfirm: string) => {
      if (!isInputFocused.passwordConfirm) return { message: '' };
      if (!passwordConfirm)
        return { message: '비밀번호 재확인은 필수정보입니다.' };
      if (passwordConfirm !== registerInfo.password)
        return { message: '비밀번호가 일치하지 않습니다.' };
      return { message: '' };
    },
    [registerInfo.password, isInputFocused.passwordConfirm]
  );

  const getNicknameHelper = useCallback(
    async (nickname: string) => {
      if (!isInputFocused.nickname) return { message: '' };
      if (!nickname) return { message: '닉네임은 필수정보입니다.' };
      if (nickname.length < 5)
        return { message: '닉네임은 5자 이상이어야 합니다.' };
      if (!regexUsername.test(nickname))
        return {
          message: '닉네임은 영문소문자, 숫자, 특수기호(_)만 사용 가능합니다.',
        };
      const response = await apiCheckNickname(nickname);
      return response.data.isUnique
        ? { message: '사용 가능한 닉네임입니다.' }
        : { message: '이미 사용 중인 닉네임입니다.' };
    },
    [isInputFocused.nickname]
  );

  const checkEveryAgreementChecked = (
    isAgreementChecked: IsAgreementChecked
  ) => {
    const agreementKeys = Object.keys(isAgreementChecked) as Array<
      keyof IsAgreementChecked
    >;
    let isEveryAgreementChecked = true;
    agreementKeys.forEach((key) => {
      if (key !== 'agreementAll' && !isAgreementChecked[key]) {
        isEveryAgreementChecked = false;
        return;
      }
    });
    return isEveryAgreementChecked;
  };

  const checkFormValidity = useCallback(() => {
    return (
      !!registerInfo.username &&
      !!registerInfo.password &&
      !!registerInfo.passwordConfirm &&
      !!registerInfo.nickname &&
      registerHelper.username === '사용 가능한 아이디입니다.' &&
      !registerHelper.password &&
      !registerHelper.passwordConfirm &&
      registerHelper.nickname === '사용 가능한 닉네임입니다.' &&
      isAgreementChecked.agreementFirst &&
      isAgreementChecked.agreementSecond &&
      isAgreementChecked.agreementThird
    );
  }, [registerInfo, registerHelper, isAgreementChecked]);

  const updateUsernameHelper = useCallback(
    async (username: string) => {
      const usernameHelper = await getUsernameHelper(username);
      setRegisterHelper((prev) => ({
        ...prev,
        username: usernameHelper.message,
      }));
    },
    [getUsernameHelper]
  );

  const updateNicknameHelper = useCallback(
    async (nickname: string) => {
      const nicknameHelper = await getNicknameHelper(nickname);
      setRegisterHelper((prev) => ({
        ...prev,
        nickname: nicknameHelper.message,
      }));
    },
    [getNicknameHelper]
  );

  useEffect(() => {
    updateUsernameHelper(registerInfo.username);
  }, [registerInfo.username, updateUsernameHelper]);

  useEffect(() => {
    setRegisterHelper((prev) => ({
      ...prev,
      password: getPasswordHelper(registerInfo.password).message,
    }));
    setRegisterHelper((prev) => ({
      ...prev,
      passwordConfirm: getPasswordConfirmHelper(registerInfo.passwordConfirm)
        .message,
    }));
  }, [
    registerInfo.password,
    registerInfo.passwordConfirm,
    getPasswordHelper,
    getPasswordConfirmHelper,
  ]);

  useEffect(() => {
    updateNicknameHelper(registerInfo.nickname);
  }, [registerInfo.nickname, updateNicknameHelper]);

  useEffect(() => {
    setIsRegisterButtonDisabled(!checkFormValidity());
  }, [registerInfo, registerHelper, isAgreementChecked, checkFormValidity]);

  useEffect(() => {
    if (session.user) {
      navigate(-1);
    }
  }, [session, navigate]);

  return (
    <>
      <RegisterPageLayout
        onChangeInput={onChangeInput}
        onChangeCheckbox={onChangeCheckbox}
        onFocusInput={onFocusInput}
        onClickClear={onClickClear}
        onClickTogglePassword={onClickTogglePassword}
        onClickRegister={onClickRegister}
        registerInfo={registerInfo}
        registerHelper={registerHelper}
        isInputHidden={isInputHidden}
        isAgreementChecked={isAgreementChecked}
        isRegisterButtonDisabled={isRegisterButtonDisabled}
      />
    </>
  );
}

export default RegisterPage;
