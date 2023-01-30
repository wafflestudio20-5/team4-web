import { User } from '../../../lib/interface';
import styles from './MyPageInfo.module.scss';

interface AdditionalInfoProps {
  user: User;
  accessToken: string | null;
}

export default function AdditionalInfo({
  user,
  accessToken,
}: AdditionalInfoProps) {
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
            <strong className={styles.grid_strong}>{user.sex}</strong>
          </div>
          <div className={styles.grid_block}></div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-body-size" className={styles.info_grid}>
          <div className={styles.grid_block}>키 / 몸무게</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>
              {user.height}cm / {user.weight}kg
            </strong>
          </div>
          <div className={styles.grid_block}>
            <button className={styles.grid_button}>변경하기</button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-description" className={styles.info_grid}>
          <div className={styles.grid_block}>자기소개</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>{user.description}</strong>
          </div>
          <div className={styles.grid_block}>
            <button className={styles.grid_button}>변경하기</button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-insta-username" className={styles.info_grid}>
          <div className={styles.grid_block}>Instagram ID</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>{user.instaUsername}</strong>
          </div>
          <div className={styles.grid_block}>
            <button className={styles.grid_button}>변경하기</button>
          </div>
        </div>
      </div>
    </section>
  );
}
