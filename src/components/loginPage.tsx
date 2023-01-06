import styles from './loginPage.module.scss';
import {useState} from 'react';
import {apiLogin} from "../lib/api";

export default function LoginPage() {

    const [inputId, setInputId] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");



    return (<div className={styles.background}>

<div className={styles.middleWhiteBox}>
    <section className={styles.header}>
    <div className={styles.loginTextBox}>
        <div className={styles.loginTextBox_text}>로그인</div>
    </div>
    </section>
    <div className={styles.content}>
        <div className={styles.commonTabUnderline}>
            <div className={styles.loginTab}>
                <span>가입 회원</span>
            </div>
            <div className={styles.buySearchTab}>
                <span>비회원 구매하기</span>
            </div>
        </div>
        <div className={styles.loginArea}>
            <div className={styles.loginForm}>
                <div className={styles.idInputWrap}>
                    <input className={styles.idInput} placeholder="아이디"
                           onChange={(e)=>{setInputId(e.target.value);}}></input>
                </div>
                <div className={styles.passwordInputWrap}>
                    <input className={styles.passwordInput} placeholder="비밀번호" type="password"
                    onChange={(e)=>{setInputPassword(e.target.value);}}></input>
                </div>
                <button className={styles.loginButton} onClick={()=>{
                    apiLogin(inputId, inputPassword)
                        .then((r) => {console.log(r);})
                        .catch((error)=>{console.log(error);});
                }}>
                    로그인
                </button>
                <div className={styles.loginUtility}>
                    <div className={styles.loginCheckbox}>
                        <input type="checkbox" id="autoLoginCheckbox">
                        </input>
                        <label htmlFor="autoLoginCheckbox" className={styles.labelCheckBox}>자동 로그인</label>
                    </div>
                    <span className={styles.findDiv}>
                        <button className={styles.findId}>아이디 찾기</button>
                        <button className={styles.findPassword}>비밀번호 찾기</button>
                    </span>
                </div>
                <div className={styles.loginSocialArea}>
                    <div className={styles.loginKakao} onClick={()=>{
                        window.open("http://localhost:8080/oauth2/authorization/kakao");
                    }}>
                        <svg className={styles.kakaoLogo}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 7C10.029 7 6 10.129 6 13.989C6 16.389 7.559 18.505 9.932 19.764L8.933 23.431C8.845 23.754 9.213 24.013 9.497 23.826L13.874 20.921C14.243 20.958 14.618 20.978 15 20.978C19.971 20.978 24 17.849 24 13.989C24 10.129 19.971 7 15 7Z" fill="black"></path>
                        </svg>
                        <span className={styles.kakaoText}>카카오 로그인</span>
                    </div>
                    <div className={styles.loginApple}>
                        <svg className={styles.appleLogo}>
                            <path fillRule="evenodd" clipRule="evenodd" d="M17.6734 6.53179C17.0545 7.30483 16.0153 7.88462 15.1863 7.88462C15.0929 7.88462 14.9995 7.87254 14.9411 7.86046C14.9294 7.81214 14.9061 7.6672 14.9061 7.52225C14.9061 6.53179 15.3848 5.56548 15.9102 4.94946C16.5758 4.14018 17.685 3.53624 18.6074 3.5C18.6308 3.60871 18.6425 3.74158 18.6425 3.87444C18.6425 4.85283 18.2338 5.83121 17.6734 6.53179ZM13.6127 22.1399C13.1966 22.3248 12.8023 22.5 12.2673 22.5C11.123 22.5 10.329 21.4129 9.41827 20.0842C8.35574 18.514 7.4917 16.0861 7.4917 13.7912C7.4917 10.095 9.81526 8.13827 12.1038 8.13827C12.7718 8.13827 13.3821 8.39164 13.9248 8.61693C14.3592 8.79728 14.7503 8.95963 15.0929 8.95963C15.3901 8.95963 15.7604 8.80823 16.1921 8.63177C16.795 8.38531 17.5175 8.08996 18.3272 8.08996C18.841 8.08996 20.7208 8.13827 21.9585 9.97425C21.9514 9.97996 21.9363 9.99029 21.9142 10.0053C21.6097 10.2133 19.9852 11.3227 19.9852 13.5979C19.9852 16.4123 22.3555 17.4148 22.4372 17.439C22.4351 17.4444 22.4303 17.4599 22.4226 17.4845C22.3447 17.7339 21.9733 18.9232 21.1762 20.1325C20.3939 21.2921 19.5649 22.4758 18.3272 22.4758C17.7172 22.4758 17.3285 22.2978 16.9272 22.1139C16.4989 21.9177 16.0562 21.7149 15.3148 21.7149C14.5693 21.7149 14.0774 21.9334 13.6127 22.1399Z" fill="black"></path>

                        </svg>
                        <span className={styles.appleText}>Apple 로그인</span>

                    </div>
                </div>
                <div className={styles.loginBottom}>
                    <span className={styles.loginBottomText}>
                        가입만 해도 즉시 15% 할인
                    </span>
                    <span className={styles.loginBottomButton}>
                        회원가입
                    </span>
                </div>
            </div>

        </div>
    </div>
</div>

    </div>);
}