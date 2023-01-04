import { User } from '../../../lib/interface';
import styles from './MyPageInfo.module.scss';

interface MyPageInfoProps {
  user: User;
}

function BasicInfo() {
  return (
    <section id="basic-info">
      <header className={styles.title}>
        <h1>
          기본 회원정보 <span>필수</span>
        </h1>
        <button>가려진정보 보기</button>
      </header>
    </section>
  );
}

function AdditionalInfo() {
  return (
    <section id="additional-info">
      <header className={styles.title}>
        <h1>
          추가 회원정보 <span>선택</span>
        </h1>
      </header>
    </section>
  );
}

function SocialInfo() {
  return (
    <section id="social-info">
      <header className={styles.title}>
        <h1>소셜 로그인 연동</h1>
      </header>
    </section>
  );
}

function DescriptionInfo() {
  return (
    <section id="description-info">
      <header className={styles.title}>
        <h1>자기소개</h1>
      </header>
    </section>
  );
}

export default function MyPageInfo({ user }: MyPageInfoProps) {
  return (
    <div className={styles.wrapper}>
      <BasicInfo />
      <AdditionalInfo />
      <div className={styles.split}>
        <SocialInfo />
        <DescriptionInfo />
      </div>
    </div>
  );
}
