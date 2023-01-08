import React, {useEffect, useState} from 'react';
import RegisterPage from "./registerPage";
import {apiRegister} from "../../lib/api";

function RegisterPagePage() {


    const [inputId, setInputId] = useState<string>("");
    const [firstInputId, setFirstInputId] = useState<boolean>(false);
    const regex: RegExp = /^[a-z|0-9|\_]+$/;
    const IdCheck = () => {
        if (firstInputId === false)
        {
            return (<></>);
        }
        else
        {
            if (inputId?.length === 0)
            {
                return (<>
                    아이디는 필수정보 입니다.
                </>);
            }
            else if (inputId?.length < 5 && inputId?.length > 0)
            {
                return (<>
                    아이디는 5자 이상이어야 합니다.</>);
            }
            else
            {
                if (regex.test(inputId) === true)
                {
                    return (<>
                        사용 가능한 아이디입니다.</>); //중복체크해야함
                }
                else
                {
                    return (<>
                        아이디는 영문소문자, 숫자, 특수기호(_)만 사용 가능합니다.</>);
                }
            }
        }
    }
    const [inputPassword, setInputPassword] = useState<string>("");
    const [firstInputPassword, setFirstInputPassword] = useState<boolean>(false);


    const regEng = /[a-z|A-Z]/;
    const regNum = /[0-9]/;
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
    const regRep = /(.)\1{3}/;

    const PasswordCheck = () => {
        if (firstInputPassword === false)
        {
            return (<></>);
        }
        else {
            if (inputPassword?.length === 0)
            {
                return (<>비밀번호는 필수정보 입니다.</>);
            }
            else if (inputPassword?.length < 8)
            {
                return (<>8~30자 이내로 입력해 주십시오.</>);
            }
            else
            {
                if (regRep.test(inputPassword) === true)
                {
                    return (<>동일문자를 반복해서 4자 이상 사용할 수 없습니다.</>);
                }
                else
                {
                    if (regEng.test(inputPassword) === true && regNum.test(inputPassword) === false && regExp.test(inputPassword) === false)
                    {
                        return (<>숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오.</>);
                    }
                    else if (regEng.test(inputPassword) === false && regNum.test(inputPassword) === true && regExp.test(inputPassword) === true)
                    {
                        return (<>숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오.</>);
                    }
                    else if (regEng.test(inputPassword) === false && regNum.test(inputPassword) === false && regExp.test(inputPassword) === true)
                    {
                        return (<>숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오.</>);
                    }
                    else
                    {
                        return (<></>);
                    }
                }
            }
        }
    }

    const [inputRePassword, setInputRePassword] = useState<string>("");
    const [firstInputRePassword, setFirstInputRePassword] = useState<boolean>(false);

    const RePasswordCheck = () => {
        if (firstInputRePassword === false)
        {
            return(<></>);
        }
        else
        {
            if (inputRePassword.length === 0)
            {
                return(<>비밀번호 재확인은 필수정보입니다.</>);
            }
            else if (inputPassword === inputRePassword)
            {
                return (<></>);
            }
            else
            {
                return (<>비밀번호가 일치하지 않습니다.</>);
            }

        }

    }
    const [inputNickname, setInputNickname] = useState<string>("");
    const NicknameCheck = () => {
        if (inputNickname.length === 0)
        {
            return(<>닉네임은 필수정보입니다.</>);
        }
        else
        {
            return(<></>);
        }
    }
    const [allCheck, setAllCheck] = useState<boolean>(false);
    const [firstCheck, setFirstCheck] = useState<boolean>(false);
    const [secondCheck, setSecondCheck] = useState<boolean>(false);
    const [thirdCheck, setThirdCheck] = useState<boolean>(false);
    const [fourthCheck, setFourthCheck] = useState<boolean>(false);

    const allBtnEvent =()=>{
        if(allCheck === false) {
            setAllCheck(true);
            setFirstCheck(true);
            setSecondCheck(true);
            setThirdCheck(true);
            setFourthCheck(true);
        }else {
            setAllCheck(false);
            setFirstCheck(false);
            setSecondCheck(false);
            setThirdCheck(false);
            setFourthCheck(false);
        }
    }

    const firstBtnEvent =()=>{
        if(firstCheck === false) {
            setFirstCheck(true)
        }else {
            setFirstCheck(false)
        }
    }

    const secondBtnEvent =()=>{
        if(secondCheck === false) {
            setSecondCheck(true)
        }else {
            setSecondCheck(false)
        }
    }

    const thirdBtnEvent =()=>{
        if(thirdCheck === false) {
            setThirdCheck(true)
        }else {
            setThirdCheck(false)
        }
    }

    const fourthBtnEvent =()=>{
        if(fourthCheck === false) {
            setFourthCheck(true)
        }else {
            setFourthCheck(false)
        }
    }
    const [registerButtonActivate, setRegisterButtonActivate] = useState<boolean>(false);
    const registerButtonFunction = () => {
        if (registerButtonActivate === true)
        {
            apiRegister(inputId, inputPassword, inputNickname)
                .then((r) => {
                    console.log(r);
                })
                .catch((error)=>{
                    console.log(error);
                });
        }
    }
    useEffect(()=>{
        if(firstCheck === true && secondCheck === true && thirdCheck === true && fourthCheck === true)
        {
            setAllCheck(true)
        } else {
            setAllCheck(false)
        }
    }, [firstCheck, secondCheck, thirdCheck, fourthCheck])


    useEffect(()=>{
        if (inputId.length >= 5)
        {
            if (regex.test(inputId) === true)
            {
                if (inputPassword.length >= 8)
                {
                    if (regRep.test(inputPassword) === false)
                    {
                        if (regEng.test(inputPassword) === true && regNum.test(inputPassword) === false && regExp.test(inputPassword) === false)
                        {
                            setRegisterButtonActivate(false);
                        }
                        else if (regEng.test(inputPassword) === false && regNum.test(inputPassword) === true && regExp.test(inputPassword) === true)
                        {
                            setRegisterButtonActivate(false);
                        }
                        else if (regEng.test(inputPassword) === false && regNum.test(inputPassword) === false && regExp.test(inputPassword) === true)
                        {
                            setRegisterButtonActivate(false);
                        }
                        else
                        {
                            if (inputPassword === inputRePassword)
                            {
                                if (inputNickname.length > 0)
                                {
                                    if (firstCheck === true && secondCheck === true && thirdCheck === true)
                                    {

                                        setRegisterButtonActivate(true);
                                    }
                                    else
                                    {
                                        setRegisterButtonActivate(false);
                                    }
                                }
                                else
                                {
                                    setRegisterButtonActivate(false);
                                }

                            }
                            else
                            {
                                setRegisterButtonActivate(false);
                            }
                        }
                    }
                    else
                    {
                        setRegisterButtonActivate(false);
                    }
                }
                else
                {
                    setRegisterButtonActivate(false);
                }
            }
            else
            {
                setRegisterButtonActivate(false);
            }

        }
        else
        {
            setRegisterButtonActivate(false);
        }

    }, [inputId, inputPassword, inputRePassword, inputNickname, firstCheck, secondCheck, thirdCheck])


    return (
        <>
            <RegisterPage
                setInputId={setInputId}
                setFirstInputId={setFirstInputId}
                IdCheck={IdCheck}
                firstCheck={firstCheck}
                secondCheck={secondCheck}
                thirdCheck={thirdCheck}
                fourthCheck={fourthCheck}
                setFirstInputPassword={setFirstInputPassword}
                setInputPassword={setInputPassword}
                PasswordCheck={PasswordCheck}
                setFirstInputRePassword={setFirstInputRePassword}
                setInputRePassword={setInputRePassword}
                RePasswordCheck={RePasswordCheck}
                setInputNickname={setInputNickname}
                NicknameCheck={NicknameCheck}
                allCheck={allCheck}
                allBtnEvent={allBtnEvent}
                firstBtnEvent={firstBtnEvent}
                secondBtnEvent={secondBtnEvent}
                thirdBtnEvent={thirdBtnEvent}
                fourthBtnEvent={fourthBtnEvent}
                registerButtonActivate={registerButtonActivate}
                registerButtonFunction={registerButtonFunction}

            />
        </>
    );
}

export default RegisterPagePage;