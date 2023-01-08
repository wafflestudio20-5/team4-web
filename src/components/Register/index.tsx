import React, {useEffect, useState} from 'react';
import RegisterPage from "./registerPage";
import {apiRegister} from "../../lib/api";

function RegisterPagePage() {



    const [input, setInput] = useState({
        id: "",
        password: "",
        repassword: "",
        nickname: "",
    })
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
        if (firstInputId === false)
        {
            return {message: ""};
        }
        else
        {
            if (input.id?.length === 0)
            {
                return {message: "아이디는 필수정보 입니다."};
            }
            else if (input.id?.length < 5 && input.id?.length > 0)
            {
                return {message: "아이디는 5자 이상이어야 합니다."};
            }
            else
            {
                if (regex.test(input.id) === true)
                {
                    return {message: "사용 가능한 아이디입니다."}; //중복체크해야함
                }
                else
                {
                    return {message: "아이디는 영문소문자, 숫자, 특수기호(_)만 사용 가능합니다."};
                }
            }
        }
    }

    const [firstInputPassword, setFirstInputPassword] = useState<boolean>(false);


    const regEng = /[a-z|A-Z]/;
    const regNum = /[0-9]/;
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
    const regRep = /(.)\1{3}/;

    const PasswordCheck = () => {
        if (firstInputPassword === false)
        {
            return {message: ""};
        }
        else {
            if (input.password?.length === 0)
            {
                return {message: "비밀번호는 필수정보 입니다."};
            }
            else if (input.password?.length < 8)
            {
                return {message: "8~30자 이내로 입력해 주십시오."};
            }
            else
            {
                if (regRep.test(input.password) === true)
                {
                    return {message: "동일문자를 반복해서 4자 이상 사용할 수 없습니다."};
                }
                else
                {
                    if (regEng.test(input.password) === true && regNum.test(input.password) === false && regExp.test(input.password) === false)
                    {
                        return {message: "숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오."};
                    }
                    else if (regEng.test(input.password) === false && regNum.test(input.password) === true && regExp.test(input.password) === true)
                    {
                        return {message: "숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오."};
                    }
                    else if (regEng.test(input.password) === false && regNum.test(input.password) === false && regExp.test(input.password) === true)
                    {
                        return {message: "숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오."};
                    }
                    else
                    {
                        return {message: ""};
                    }
                }
            }
        }
    }


    const [firstInputRePassword, setFirstInputRePassword] = useState<boolean>(false);

    const RePasswordCheck = () => {
        if (firstInputRePassword === false)
        {
            return(<></>);
        }
        else
        {
            if (input.repassword.length === 0)
            {
                return(<>비밀번호 재확인은 필수정보입니다.</>);
            }
            else if (input.password === input.repassword)
            {
                return (<></>);
            }
            else
            {
                return (<>비밀번호가 일치하지 않습니다.</>);
            }

        }

    }

    const NicknameCheck = () => {
        if (input.nickname.length === 0)
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
            apiRegister(input.id, input.password, input.nickname)
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
        if (input.id.length >= 5)
        {
            if (regex.test(input.id) === true)
            {
                if (input.password.length >= 8)
                {
                    if (regRep.test(input.password) === false)
                    {
                        if (regEng.test(input.password) === true && regNum.test(input.password) === false && regExp.test(input.password) === false)
                        {
                            setRegisterButtonActivate(false);
                        }
                        else if (regEng.test(input.password) === false && regNum.test(input.password) === true && regExp.test(input.password) === true)
                        {
                            setRegisterButtonActivate(false);
                        }
                        else if (regEng.test(input.password) === false && regNum.test(input.password) === false && regExp.test(input.password) === true)
                        {
                            setRegisterButtonActivate(false);
                        }
                        else
                        {
                            if (input.password === input.repassword)
                            {
                                if (input.nickname.length > 0)
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

    }, [input, firstCheck, secondCheck, thirdCheck])


    return (
        <>
            <RegisterPage
                setFirstInputId={setFirstInputId}
                IdCheck={IdCheck}
                firstCheck={firstCheck}
                secondCheck={secondCheck}
                thirdCheck={thirdCheck}
                fourthCheck={fourthCheck}
                setFirstInputPassword={setFirstInputPassword}
                PasswordCheck={PasswordCheck}
                setFirstInputRePassword={setFirstInputRePassword}
                RePasswordCheck={RePasswordCheck}
                NicknameCheck={NicknameCheck}
                allCheck={allCheck}
                allBtnEvent={allBtnEvent}
                firstBtnEvent={firstBtnEvent}
                secondBtnEvent={secondBtnEvent}
                thirdBtnEvent={thirdBtnEvent}
                fourthBtnEvent={fourthBtnEvent}
                registerButtonActivate={registerButtonActivate}
                registerButtonFunction={registerButtonFunction}
                input={input}
                onChange={onChange}

            />
        </>
    );
}

export default RegisterPagePage;