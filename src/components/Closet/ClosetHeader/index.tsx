import { Link } from 'react-router-dom';
import styles from './ClosetHeader.module.scss';
import insta from '../../../resources/image/insta.png';
import { useApiUserFectcher, useApiData } from '../../../lib/api';

interface ClosetHeaderProps {
  parsedId: number | null;
  accessToken: string | null;
}

export default function ClosetHeader({
  parsedId,
  accessToken,
}: ClosetHeaderProps) {
  const { data: userData } = useApiData(
    useApiUserFectcher(parsedId, accessToken)
  );
  const user = userData?.user ?? null;
  const count = userData?.count ?? null;
  // const isFollow = userData?.isFollow ?? null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>My Closet</div>
      <div className={styles.main}>
        <img className={styles.image} src={user?.image} alt="이미지 없음" />
        <div className={styles.info}>
          <div className={styles.name}>
            <strong>{user?.nickname}</strong>
            <Link to="/mypage/info">회원정보변경</Link>
          </div>
          <div className={styles.userprofile}>
            <div className={styles.profiletext}>
              {user?.sex} / {user?.height} · {user?.weight}kg
            </div>
            <div className={styles.profiletext}>{user?.description}</div>
          </div>
          <div className={styles.flex}>
            <div className={styles.poststyle}>게시물 작성</div>
            <img className={styles.insta} src={insta} alt={'인스타그램으로'} />
          </div>
        </div>
        <div className={styles.userrate}>
          <div>
            <div className={styles.num}>{count?.styleCount}</div>
            <div className={styles.text}>게시물</div>
          </div>
          <div>
            <div className={styles.num}>{count?.followerCount}</div>
            <div className={styles.text}>팔로워</div>
          </div>
          <div>
            <div className={styles.num}>{count?.followingCount}</div>
            <div className={styles.text}>팔로잉</div>
          </div>
        </div>
      </div>
    </div>
  );
}
