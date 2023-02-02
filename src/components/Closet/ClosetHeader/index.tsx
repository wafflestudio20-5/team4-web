import { Link, useNavigate } from 'react-router-dom';
import styles from './ClosetHeader.module.scss';
import insta from '../../../resources/image/insta.png';
import {
  useApiUserFectcher,
  useApiData,
  apiPostFollow,
  apiDeleteFollow,
} from '../../../lib/api';
import { formatUserInfoCloset } from '../../../lib/formatters/userFormatter';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

interface ClosetHeaderProps {
  parsedId: number | null;
  accessToken: string | null;
  isMe: boolean;
}

export default function ClosetHeader({
  parsedId,
  accessToken,
  isMe,
}: ClosetHeaderProps) {
  const navigate = useNavigate();

  const { data } = useApiData(useApiUserFectcher(parsedId, accessToken));
  const user = data?.user ?? null;

  interface Socials {
    count: {
      styleCount: number;
      followerCount: number;
      followingCount: number;
    };
    isFollow: boolean;
  }

  const [socials, setSocials] = useState<Socials | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setSocials({ count: data.count, isFollow: data.isFollow });
    }
  }, [data]);

  const FollowUser = (id: number, token: string | null) => {
    if (!token) {
      navigate('/login');
      return;
    }
    apiPostFollow(id, token)
      .then(() => {
        if (socials) {
          setSocials({
            ...socials,
            count: {
              styleCount: socials.count.styleCount,
              followerCount: socials.count.followerCount + 1,
              followingCount: socials.count.followingCount,
            },
            isFollow: true,
          });
        }
      })
      .catch(() => {
        toast('다시 시도해주세요');
      });
  };
  const unFollowUser = (id: number, token: string | null) => {
    if (!token) {
      navigate('/login');
      return;
    }
    apiDeleteFollow(id, token)
      .then(() => {
        if (socials) {
          setSocials({
            ...socials,
            count: {
              styleCount: socials.count.styleCount,
              followerCount: socials.count.followerCount - 1,
              followingCount: socials.count.followingCount,
            },
            isFollow: false,
          });
        }
      })
      .catch(() => {
        toast('다시 시도해주세요');
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>My Closet</div>
      {user && (
        <div className={styles.main}>
          <img className={styles.image} src={user?.image} alt="이미지 없음" />
          <div className={styles.info}>
            <div className={styles.name}>
              <strong>{user?.nickname}</strong>
              {isMe && <Link to="/mypage/info">회원정보변경</Link>}
            </div>
            <div className={styles.userprofile}>
              <div className={styles.profiletext}>
                {formatUserInfoCloset(user?.sex, user?.height, user?.weight)}
              </div>
              <div className={styles.profiletext}>
                {user?.description ? user?.description : ''}
              </div>
            </div>
            <div className={styles.flex}>
              {isMe ? (
                <div
                  className={styles.poststyle}
                  // onClick={() => {
                  //   navigate(스타일 작성 페이지);
                  // }}
                >
                  게시물 작성
                </div>
              ) : socials?.isFollow ? (
                <div
                  className={styles.poststyle}
                  onClick={() => {
                    unFollowUser(user.id, accessToken);
                  }}
                >
                  팔로잉
                </div>
              ) : (
                <div
                  className={styles.followstyle}
                  onClick={() => {
                    FollowUser(user.id, accessToken);
                  }}
                >
                  팔로우
                </div>
              )}
              {user?.instaUsername && (
                <img
                  className={styles.insta}
                  src={insta}
                  alt={'인스타그램으로'}
                  onClick={() => {
                    window.open(
                      `https://www.instagram.com/${user.instaUsername}/`
                    );
                  }}
                />
              )}
            </div>
          </div>
          <div className={styles.userrate}>
            <div>
              <div className={styles.num}>{socials?.count?.styleCount}</div>
              <div className={styles.text}>게시물</div>
            </div>
            <div>
              <div className={styles.num}>{socials?.count?.followerCount}</div>
              <div className={styles.text}>팔로워</div>
            </div>
            <div>
              <div className={styles.num}>{socials?.count?.followingCount}</div>
              <div className={styles.text}>팔로잉</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
