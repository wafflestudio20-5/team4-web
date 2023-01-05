import styles from './registerPage.module.scss';
import {useState} from 'react';
export default function RegisterPage() {


    const [inputId, setInputId] = useState<string>("");
    const [firstInputId, setFirstInputId] = useState<boolean>(false);
    const regex = /^[a-z|0-9|\_]+$/;

    const IdCheckHook = () => {


        if (firstInputId === false) {
            return (<></>);
        }
        else {
            if (inputId?.length === 0) {
                return (<>
                    아이디는 필수정보 입니다.
                </>);
            }
            else if (inputId?.length < 5 && inputId?.length > 0){
                return (<>
                    아이디는 5자 이상이어야 합니다.</>);
            }
            else {
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

    const regs = /[a-z|A-Z|0-9|\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{4}/;
    const regEng = /[a-z|A-Z]/;
    const regNum = /[0-9]/;
    const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;

    const PasswordCheckHook = () => {
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
                if (regs.test(inputPassword) === true)
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


    return (
        <>
            <div className={styles.background}>
                <div className={styles.headerLogoArea}>
                    <svg className={styles.headerLogo}>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M39.7649 8.92841C41.4239 9.54022 42.38 9.89279 42.38 11.4667C42.38 12.911 41.3584 13.8445 39.7376 13.8445C38.1163 13.8445 36.9616 12.8665 36.9616 11.2445V11.022H34.608C34.608 14.1776 36.8508 16 39.7376 16C42.6686 16 44.7337 13.8445 44.7337 11.3777C44.7337 10.1111 44.3339 9.311 43.668 8.59989C43.0019 7.88901 42.18 7.44459 40.8033 6.93334L39.9149 6.60025C37.9608 5.86657 37.3391 5.31127 37.3391 4.20002C37.3391 2.93318 38.2717 2.15545 39.7152 2.15545C41.1364 2.15545 42.1358 2.93318 42.1358 4.35561V4.64443H44.4894C44.4894 1.79979 42.6909 0 39.7152 0C36.4731 0 34.9853 2.24442 34.9853 4.2445C34.9853 5.35532 35.3407 6.15562 35.9182 6.86672C36.4952 7.57805 37.2947 8.00011 38.4717 8.44452L39.5376 8.84445L39.7649 8.92841ZM13.812 0.222249L8.21601 9.26678L2.64239 0.222249H0V15.7778H2.22042V3.51087L7.19448 11.5778H9.23753L14.2339 3.51087V15.7778H16.4543V0.222249H13.812ZM29.7098 9.26664V0.222332H31.9527V9.24407C31.9527 13.489 29.5322 15.9999 25.8904 15.9999C22.2488 15.9999 19.8284 13.489 19.8284 9.24407V0.222332H22.071V9.26664C22.071 12.0889 23.5366 13.8221 25.8904 13.8221C28.2444 13.8221 29.7098 12.0889 29.7098 9.26664ZM47.5609 15.7777H49.826V0.222332H47.5609V15.7777ZM55.4884 15.7777V3.73338L63.5713 15.7777H66.0584V0.222332H63.8378V12.3331L55.7326 0.222332H53.2678V15.7777H55.4884ZM76.4865 11.4667C76.4865 9.8929 75.5304 9.54027 73.8718 8.92854L73.6442 8.84445L72.5785 8.44452C71.4015 8.00011 70.602 7.57805 70.0247 6.86672C69.4473 6.15562 69.0919 5.35532 69.0919 4.2445C69.0919 2.24442 70.5799 0 73.822 0C76.7975 0 78.5962 1.79979 78.5962 4.64443H76.2424V4.35561C76.2424 2.93318 75.243 2.15545 73.822 2.15545C72.3785 2.15545 71.4459 2.93318 71.4459 4.20002C71.4459 5.31127 72.0676 5.86657 74.0217 6.60025L74.9099 6.93334C76.2866 7.44459 77.1084 7.88901 77.7746 8.59989C78.4407 9.311 78.8403 10.1111 78.8403 11.3777C78.8403 13.8445 76.7751 16 73.8444 16C70.9574 16 68.7146 14.1776 68.7146 11.022H71.0684V11.2445C71.0684 12.8665 72.2231 13.8445 73.8444 13.8445C75.465 13.8445 76.4865 12.911 76.4865 11.4667ZM90.8477 11.4442H83.9195L82.1652 15.7774H79.8778L86.1622 0.221854H88.6049L94.8889 15.7774H92.6017L90.8477 11.4442ZM87.3835 2.88884L84.8077 9.24431H89.9593L87.3835 2.88884Z" fill="black"></path>
                    </svg>
                </div>
                <div className={styles.contentArea}>
                    <div className={styles.joinContainer}>
                        <div className={styles.joinForm}>
                            <div className={styles.inputIdArea}>
                                <label className={styles.inputIdLabel} htmlFor="inputId">
                                    아이디
                                    <span className={styles.inputIdDot}>
                                    </span>
                                </label>
                                <div className={styles.inputIdWrap}>
                                    <input className={styles.inputId} placeholder="영문, 숫자 5-11자" type="text" maxLength={11} id="inputId" onChange={(e)=>{
                                        setFirstInputId(true);
                                        setInputId(e.target.value);}}></input>
                                    <IdCheckHook></IdCheckHook>
                                </div>
                                <div className={styles.inputPasswordArea}>
                                    <label className={styles.inputPasswordLabel} htmlFor="inputPassword">
                                        비밀번호
                                        <span className={styles.inputPasswordDot}>
                                    </span>
                                    </label>
                                    <div className={styles.inputPasswordWrap}>
                                        <input className={styles.inputPassword} placeholder="숫자, 영문, 특수문자 조합 최소 8자" type="password" maxLength={30} id="inputPassword"
                                        onChange={(e)=>{
                                            setFirstInputPassword(true);
                                            setInputPassword(e.target.value);
                                        }}></input>
                                        <PasswordCheckHook></PasswordCheckHook>
                                    </div>
                                </div>
                                <div className={styles.inputRepeatArea}>
                                    <div className={styles.inputRepeatWrap}>
                                        <input className={styles.inputRepeat} placeholder="비밀번호 재입력"></input>

                                    </div>

                                </div>
                                <div className={styles.inputEmailArea}>
                                    <label className={styles.inputEmailLabel} htmlFor="inputEmail">
                                        이메일
                                        <span className={styles.inputEmailDot}></span>
                                    </label>
                                    <div className={styles.inputEmailWrap}>
                                        <input className={styles.inputEmail} id="inputEmail"></input>
                                    </div>
                                    <p className={styles.inputEmailHelper}>
                                        계정 분실 시 본인인증 정보로 활용됩니다.
                                    </p>
                                </div>
                                <div className={styles.inputRecommendIdArea}>
                                    <label className={styles.inputRecommendIdLabel}>
                                        친구 초대 추천인 아이디
                                    </label>
                                    <div className={styles.inputRecommendIdWrap}>
                                        <input className={styles.inputRecommendId}></input>
                                    </div>
                                </div>
                                <div className={styles.agreementForm}>
                                    <div className={styles.checkboxAll}>
                                        <input type="checkbox" id="checkboxAll"></input>
                                        <label htmlFor="checkboxAll">
                                            약관 전체 동의하기
                                        </label>
                                    </div>
                                    <div className={styles.checkboxFirst}>
                                        <input type="checkbox" id="checkboxFirst"></input>
                                        <label htmlFor="checkboxFirst">
                                            [필수]개인정보 수집 및 이용 동의
                                        </label>
                                        <button>
                                            자세히
                                        </button>
                                    </div>
                                    <div className={styles.checkboxSecond}>
                                        <input type="checkbox" id="checkboxSecond"></input>
                                        <label htmlFor="checkboxSecond">
                                            [필수]무신사, 무신사 스토어 이용 약관
                                        </label>
                                        <button>
                                            자세히
                                        </button>
                                    </div>
                                    <div className={styles.checkboxThird}>
                                        <input type="checkbox" id="checkboxThird"></input>
                                        <label htmlFor="checkboxThird">
                                            [필수]만 14세 미만 가입 제한
                                        </label>
                                    </div>
                                    <div className={styles.checkboxFourth}>
                                        <input type="checkbox" id="checkboxFourth"></input>
                                        <label htmlFor="checkboxFourth">
                                            [선택]마케팅 활용 및 광고성 정보 수신 동의
                                        </label>
                                        <button>
                                            자세히
                                        </button>
                                    </div>
                                    <div className={styles.signupButtonArea}>
                                        <button className={styles.signupButton}>
                                            본인인증하고 가입하기

                                        </button>
                                    </div>
                                    <ul className={styles.signupButtonHelper}>
                                        <li className={styles.signupButtonHelperText}>
                                            본인인증이 어려운 경우(만 14세 미만 포함),&nbsp;
                                            <a href="/login">비회원으로 구매</a>
                                            할 수 있습니다.
                                        </li>
                                    </ul>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}