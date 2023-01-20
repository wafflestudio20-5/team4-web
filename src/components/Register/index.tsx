import React, { useCallback, useEffect, useState } from 'react';
import RegisterPageLayout from './registerPage';
import { apiCheckNickname, apiCheckUsername, apiRegister } from '../../lib/api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Session } from '../../lib/interface';
import { RootState } from '../../store';
import { toast } from 'react-toastify';

const regexUsername: RegExp = /^[a-z0-9_]+$/;
const regexRepeat: RegExp = /(.)\1{3,}/;
const regexAlphabet: RegExp = /[a-z|A-Z]/;
const regexNumber: RegExp = /[0-9]/;
const regexSpecial: RegExp = /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/;

interface IsAgreementChecked {
  agreementAll: boolean;
  agreementFirst: boolean;
  agreementSecond: boolean;
  agreementThird: boolean;
  agreementFourth: boolean;
}

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

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });

    let helperValue = '';
    switch (name) {
      case 'username':
        helperValue = (await getUsernameHelper(value)).message;
        break;
      case 'password':
        helperValue = getPasswordHelper(value).message;
        break;
      case 'passwordConfirm':
        helperValue = getPasswordConfirmHelper(value).message;
        break;
      case 'nickname':
        helperValue = (await getNicknameHelper(value)).message;
        break;
    }
    setRegisterHelper({ ...registerHelper, [name]: helperValue });
  };

  const onChangeCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setIsAgreementChecked((prev) => ({
          ...isAgreementChecked,
          [id]: !prev[id as keyof IsAgreementChecked],
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

  const getUsernameHelper = async (username: string) => {
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
  };

  const getPasswordHelper = (password: string) => {
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
  };

  const getPasswordConfirmHelper = useCallback(
    (passwordConfirm: string) => {
      if (!registerInfo.password) return { message: '' };
      if (!passwordConfirm)
        return { message: '비밀번호 재확인은 필수정보입니다.' };
      if (passwordConfirm !== registerInfo.password)
        return { message: '비밀번호가 일치하지 않습니다.' };
      return { message: '' };
    },
    [registerInfo.password]
  );

  const getNicknameHelper = async (nickname: string) => {
    if (!nickname) return { message: '닉네임은 필수정보입니다.' };
    const response = await apiCheckNickname(nickname);
    return response.data.isUnique
      ? { message: '사용 가능한 닉네임입니다.' }
      : { message: '이미 사용 중인 닉네임입니다.' };
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

  useEffect(() => {
    setRegisterHelper((prev) => ({
      ...prev,
      passwordConfirm: getPasswordConfirmHelper(registerInfo.passwordConfirm)
        .message,
    }));
  }, [
    registerInfo.password,
    registerInfo.passwordConfirm,
    getPasswordConfirmHelper,
  ]);

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
        onClickRegister={onClickRegister}
        registerInfo={registerInfo}
        registerHelper={registerHelper}
        isAgreementChecked={isAgreementChecked}
        isRegisterButtonDisabled={isRegisterButtonDisabled}
      />
    </>
  );
}

export default RegisterPage;
