import { User } from '../../../lib/interface';
import styles from './MyPageInfo.module.scss';

interface BasicInfoProps {
  user: User;
}

function BasicInfo({ user }: BasicInfoProps) {
  return (
    <section id="basic-info">
      <header className={styles.title}>
        <h1>
          기본 회원정보 <span>필수</span>
        </h1>
        <button>가려진정보 보기</button>
      </header>
      <div className={styles.content}>
        <div id="basic-image" className={styles.info_grid}>
          <div
            className={styles.grid_block}
            style={{
              paddingTop: '29px',
            }}
          >
            사진
          </div>
          <div className={styles.grid_block}>
            <img
              className={styles.user_image}
              src="https://image.msscdn.net/mfile_s01/_simbols/_basic/s.png"
              alt="이미지 없음"
            />
            <span className={styles.image_text}>
              회원님을 알릴 수 있는 사진을 등록해 주세요.
              <br />
              등록된 사진은 회원님의 게시물이나 댓글들에 사용됩니다.
            </span>
          </div>
          <div className={styles.grid_block}>
            <button className={styles.grid_button}>사진 변경</button>
          </div>
        </div>
        <div id="basic-username" className={styles.info_grid}>
          <div className={styles.grid_block}>아이디</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>{user.username}</strong>
          </div>
          <div className={styles.grid_block}></div>
        </div>
        <div id="basic-password" className={styles.info_grid}>
          <div className={styles.grid_block}>비밀번호</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>********</strong>
          </div>
          <div className={styles.grid_block}>
            <button className={styles.grid_button}>비밀번호 변경</button>
          </div>
        </div>
        <div id="basic-nickname" className={styles.info_grid}>
          <div className={styles.grid_block}>닉네임</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>{user.nickname}</strong>
          </div>
          <div className={styles.grid_block}>
            <button className={styles.grid_button}>닉네임 변경</button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface AdditionalInfoProps {
  user: User;
}

function AdditionalInfo({ user }: AdditionalInfoProps) {
  return (
    <section id="additional-info">
      <header className={styles.title}>
        <h1>
          추가 회원정보 <span>선택</span>
        </h1>
      </header>
      <div className={styles.content}>
        <div id="additional-sex" className={styles.info_grid}>
          <div className={styles.grid_block}>성별</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>남자</strong>
          </div>
          <div className={styles.grid_block}></div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-body-size" className={styles.info_grid}>
          <div className={styles.grid_block}>키/몸무게</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>
              {user.height}cm / {user.weight}kg
            </strong>
          </div>
          <div className={styles.grid_block}>
            <button className={styles.grid_button}>마이 사이즈</button>
          </div>
        </div>
      </div>
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

interface MyPageInfoProps {
  user: User;
}

export default function MyPageInfo({ user }: MyPageInfoProps) {
  return (
    <div className={styles.wrapper}>
      <BasicInfo user={user} />
      <AdditionalInfo user={user} />
      <div className={styles.split}>
        <SocialInfo />
        <DescriptionInfo />
      </div>
    </div>
  );
}
