import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import styles from './ClosetHeader.module.scss';
import insta from '../../../resources/image/insta.png';
import {
  useApiUserFectcher,
  useApiData,
  apiPostFollow,
  apiDeleteFollow,
  useApiGetFollowListFetcher,
} from '../../../lib/api';
import { formatUserInfoCloset } from '../../../lib/formatters/userFormatter';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { User } from '../../../lib/interface';
import close from '../../../resources/image/close.png';

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

  const [modalStatus, setModalStatus] = useState({
    followerOrFollowing: '',
    open: false,
  });

  const toggleModal = (prop: string) => {
    if (prop !== modalStatus.followerOrFollowing) {
      setModalStatus((prev) => ({
        ...prev,
        followerOrFollowing: prop,
        open: true,
      }));
      return;
    }
    setModalStatus((prev) => ({
      ...prev,
      open: !prev.open,
    }));
  };

  const closeModal = () => {
    setModalStatus((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <div className={styles.wrapper}>
      {isMe ? (
        <div
          className={styles.title}
          onClick={() => {
            navigate('/closet/my');
          }}
        >
          My Closet
        </div>
      ) : (
        <div className={styles.titleNotMe}>Closet</div>
      )}

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
                  onClick={() => {
                    navigate('/closet/style/write');
                  }}
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
              <div className={styles.num}>
                {socials?.count?.styleCount}
                {modalStatus.open && (
                  <FollowModal
                    user={user}
                    navigate={navigate}
                    closeModal={closeModal}
                    followerOrFollowing={modalStatus.followerOrFollowing}
                  />
                )}
              </div>
              <div className={styles.text}>게시글</div>
            </div>
            <div>
              <div
                className={styles.follow}
                onClick={() => {
                  toggleModal('follower');
                }}
              >
                {socials?.count?.followerCount}
              </div>
              <div className={styles.text}>팔로워</div>
            </div>
            <div>
              <div
                className={styles.follow}
                onClick={() => {
                  toggleModal('following');
                }}
              >
                {socials?.count?.followingCount}
              </div>
              <div className={styles.text}>팔로잉</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FollowModal({
  user,
  navigate,
  closeModal,
  followerOrFollowing,
}: {
  user: User;
  navigate: NavigateFunction;
  closeModal: () => void;
  followerOrFollowing: string;
}) {
  const { data, loading } = useApiData(
    useApiGetFollowListFetcher(user.id, followerOrFollowing)
  );

  return (
    <div className={styles.modal}>
      {!loading ? (
        <>
          <div className={styles.modalTitle}>
            <div className={styles.modalCount}>
              {followerOrFollowing === 'follower' ? '팔로워' : '팔로잉'}{' '}
              {data?.users.length}명
            </div>
            <div>
              <img
                src={close}
                alt={'모달 닫기 버튼'}
                onClick={() => {
                  closeModal();
                }}
              />
            </div>
          </div>
          {data && data?.users.length === 0 ? (
            <div className={styles.null}>
              <div>
                {' '}
                {followerOrFollowing === 'follower' ? '팔로워' : '팔로잉'} 없음
              </div>
            </div>
          ) : (
            data?.users?.map((user) => {
              return (
                <div
                  key={user.id}
                  className={styles.user}
                  onClick={() => {
                    navigate(`/closet/${user.id}`);
                  }}
                >
                  <div className={styles.categoryshead}>
                    <img src={user.image} alt="검색 유저 프로필" />
                    <div className={styles.usernickname}>{user.nickname}</div>
                  </div>
                </div>
              );
            })
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
