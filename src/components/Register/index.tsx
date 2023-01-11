import React, { useEffect, useState } from 'react';
import RegisterPageLayout from './registerPage';
import { apiRegister } from '../../lib/api';

function RegisterPage() {
  const [input, setInput] = useState({
    id: '',
    password: '',
    repassword: '',
    nickname: '',
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  const [firstInputId, setFirstInputId] = useState<boolean>(false);
  const regex: RegExp = /^[a-z|0-9|\_]+$/;
  const IdCheck = () => {
    if (firstInputId === false) {
      return { message: '' };
    } else {
      if (input.id?.length === 0) {
        return { message: '아이디는 필수정보 입니다.' };
      } else if (input.id?.length < 5 && input.id?.length > 0) {
        return { message: '아이디는 5자 이상이어야 합니다.' };
      } else {
        if (regex.test(input.id) === true) {
          return { message: '사용 가능한 아이디입니다.' }; //중복체크해야함
        } else {
          return {
            message:
              '아이디는 영문소문자, 숫자, 특수기호(_)만 사용 가능합니다.',
          };
        }
      }
    }
  };

  const [firstInputPassword, setFirstInputPassword] = useState<boolean>(false);

  const regEng = /[a-z|A-Z]/;
  const regNum = /[0-9]/;
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
  const regRep = /(.)\1{3}/;

  const PasswordCheck = () => {
    if (firstInputPassword === false) {
      return { message: '' };
    } else {
      if (input.password?.length === 0) {
        return { message: '비밀번호는 필수정보 입니다.' };
      } else if (input.password?.length < 8) {
        return { message: '8~30자 이내로 입력해 주십시오.' };
      } else {
        if (regRep.test(input.password) === true) {
          return {
            message: '동일문자를 반복해서 4자 이상 사용할 수 없습니다.',
          };
        } else {
          if (
            regEng.test(input.password) === true &&
            regNum.test(input.password) === false &&
            regExp.test(input.password) === false
          ) {
            return {
              message:
                '숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오.',
            };
          } else if (
            regEng.test(input.password) === false &&
            regNum.test(input.password) === true &&
            regExp.test(input.password) === true
          ) {
            return {
              message:
                '숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오.',
            };
          } else if (
            regEng.test(input.password) === false &&
            regNum.test(input.password) === false &&
            regExp.test(input.password) === true
          ) {
            return {
              message:
                '숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오.',
            };
          } else {
            setFirstInputPassword(false);
            return { message: '' };
          }
        }
      }
    }
  };

  const [firstInputRePassword, setFirstInputRePassword] =
    useState<boolean>(false);

  const RePasswordCheck = () => {
    if (firstInputRePassword === false) {
      return { message: '' };
    } else {
      if (input.repassword.length === 0) {
        return { message: '비밀번호 재확인은 필수정보입니다.' };
      } else if (input.password === input.repassword) {
        return { message: '' };
      } else {
        return { message: '비밀번호가 일치하지 않습니다.' };
      }
    }
  };

  const NicknameCheck = () => {
    if (input.nickname.length === 0) {
      return { message: '닉네임은 필수정보입니다.' };
    } else {
      return { message: '' };
    }
  };

  const [check, setCheck] = useState({
    all: false,
    first: false,
    second: false,
    third: false,
    fourth: false,
  });

  const allBtnEvent = () => {
    if (check.all === false) {
      setCheck({
        all: true,
        first: true,
        second: true,
        third: true,
        fourth: true,
      });
    } else {
      setCheck({
        all: false,
        first: false,
        second: false,
        third: false,
        fourth: false,
      });
    }
  };

  const firstBtnEvent = () => {
    if (check.first === false) {
      setCheck({ ...check, first: true });
    } else {
      setCheck({ ...check, first: false });
    }
  };

  const secondBtnEvent = () => {
    if (check.second === false) {
      setCheck({ ...check, second: true });
    } else {
      setCheck({ ...check, second: false });
    }
  };

  const thirdBtnEvent = () => {
    if (check.third === false) {
      setCheck({ ...check, third: true });
    } else {
      setCheck({ ...check, third: false });
    }
  };

  const fourthBtnEvent = () => {
    if (check.fourth === false) {
      setCheck({ ...check, fourth: true });
    } else {
      setCheck({ ...check, fourth: false });
    }
  };
  const [registerButtonActivate, setRegisterButtonActivate] =
    useState<boolean>(false);
  const registerButtonFunction = () => {
    if (registerButtonActivate === true) {
      apiRegister({
        username: input.id,
        password: input.password,
        nickname: input.nickname,
      })
        .then((r) => {
          console.log(r);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    if (
      check.first === true &&
      check.second === true &&
      check.third === true &&
      check.fourth === true
    ) {
      setCheck({ ...check, all: true });
    } else {
      setCheck({ ...check, all: false });
    }
  }, [check.first, check.second, check.third, check.fourth]);

  useEffect(() => {
    if (input.id.length >= 5) {
      if (regex.test(input.id) === true) {
        if (input.password.length >= 8) {
          if (regRep.test(input.password) === false) {
            if (
              regEng.test(input.password) === true &&
              regNum.test(input.password) === false &&
              regExp.test(input.password) === false
            ) {
              setRegisterButtonActivate(false);
            } else if (
              regEng.test(input.password) === false &&
              regNum.test(input.password) === true &&
              regExp.test(input.password) === true
            ) {
              setRegisterButtonActivate(false);
            } else if (
              regEng.test(input.password) === false &&
              regNum.test(input.password) === false &&
              regExp.test(input.password) === true
            ) {
              setRegisterButtonActivate(false);
            } else {
              if (input.password === input.repassword) {
                if (input.nickname.length > 0) {
                  if (
                    check.first === true &&
                    check.second === true &&
                    check.third === true
                  ) {
                    setRegisterButtonActivate(true);
                  } else {
                    setRegisterButtonActivate(false);
                  }
                } else {
                  setRegisterButtonActivate(false);
                }
              } else {
                setRegisterButtonActivate(false);
              }
            }
          } else {
            setRegisterButtonActivate(false);
          }
        } else {
          setRegisterButtonActivate(false);
        }
      } else {
        setRegisterButtonActivate(false);
      }
    } else {
      setRegisterButtonActivate(false);
    }
  }, [input, check.first, check.second, check.third]);

  return (
    <>
      <RegisterPageLayout
        setFirstInputId={setFirstInputId}
        IdCheck={IdCheck}
        setFirstInputPassword={setFirstInputPassword}
        PasswordCheck={PasswordCheck}
        setFirstInputRePassword={setFirstInputRePassword}
        RePasswordCheck={RePasswordCheck}
        NicknameCheck={NicknameCheck}
        allBtnEvent={allBtnEvent}
        firstBtnEvent={firstBtnEvent}
        secondBtnEvent={secondBtnEvent}
        thirdBtnEvent={thirdBtnEvent}
        fourthBtnEvent={fourthBtnEvent}
        registerButtonActivate={registerButtonActivate}
        registerButtonFunction={registerButtonFunction}
        input={input}
        onChange={onChange}
        check={check}
        firstInputPassword={firstInputPassword}
      />
    </>
  );
}

export default RegisterPage;
