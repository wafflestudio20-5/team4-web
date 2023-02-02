import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { setClose, setSuspend } from '../../store/slices/modal';
import {
  useApiData,
  useApiStyleFetcher,
  apiPostFollow,
  apiDeleteFollow,
  apiPostLike,
  apiDeleteLike,
} from '../../lib/api';
import StyleModalLayout from './StyleModalLayout';

export default function StyleModal() {
  /***
   *
   * 모달 상태, 애니메이션 관리
   *
   */
  const [visible, setVisible] = useState<boolean>(false);

  const outside = useRef(null);

  const { open, styleId } = useSelector((state: RootState) => {
    return state.modal;
  });

  const dispatch = useDispatch();

  const onClose = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    dispatch(setClose());
  };

  const onOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (outside.current === e.target) {
      onClose(e);
    }
  };

  useEffect(() => {
    if (!visible && open) {
      setVisible(true);
    }
    if (visible && !open) {
      setTimeout(() => setVisible(false), 500);
    }
  }, [visible, open]);

  /***
   *
   * 스타일 데이터 불러오기
   *
   */
  const { accessToken } = useSelector((state: RootState) => {
    return state.session;
  });

  const { data, error } = useApiData(useApiStyleFetcher(styleId, accessToken));

  // error이 null이거나 undefined라면 아무런 효과도 일어나지 않습니다.
  useEffect(() => {
    if (error) {
      const payload = error.payload as AxiosError;
      console.log(payload);
      if (payload.response?.status === 404) {
        toast('해당하는 스타일을 찾을 수 없습니다.');
        dispatch(setClose());
      }
    }
  }, [error, dispatch]);

  /***
   *
   * 팔로우, 좋아요 관련 로직
   *
   */

  interface Socials {
    likedCount: number;
    isFollowed: boolean;
    isLiked: boolean;
  }

  const [socials, setSocials] = useState<Socials | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setSocials({
        likedCount: data.likedCount,
        isFollowed: data.isFollow,
        isLiked: data.isLike,
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const userId = data?.style.user.id;

  const onFollow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!userId) {
      toast('요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      return;
    }
    apiPostFollow(userId, accessToken)
      .then(() => {
        if (socials)
          setSocials({
            ...socials,
            isFollowed: true,
          });
      })
      .catch((error) => {
        toast('요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const onUnfollow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!userId) {
      toast('요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      return;
    }
    apiDeleteFollow(userId, accessToken)
      .then(() => {
        if (socials)
          setSocials({
            ...socials,
            isFollowed: false,
          });
      })
      .catch((error) => {
        toast('요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const location = useLocation();

  const onLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!styleId) {
      toast('요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      return;
    }
    if (!accessToken) {
      toast('로그인 후 사용할 수 있는 기능입니다.');
      navigate('/login');
      dispatch(setSuspend(location.key));
      return;
    }
    apiPostLike(styleId, accessToken)
      .then(() => {
        if (socials)
          setSocials({
            ...socials,
            likedCount: socials.likedCount + 1,
            isLiked: true,
          });
      })
      .catch((error) => {
        toast('요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      });
  };

  const onUnlike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!styleId) {
      toast('요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      return;
    }
    if (!accessToken) {
      toast('로그인 후 사용할 수 있는 기능입니다.');
      navigate('/login');
      dispatch(setSuspend(location.key));
      return;
    }
    apiDeleteLike(styleId, accessToken)
      .then(() => {
        if (socials)
          setSocials({
            ...socials,
            likedCount: socials.likedCount - 1,
            isLiked: false,
          });
      })
      .catch((error) => {
        toast('요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.');
      });
  };

  /***
   *
   * 유저, 아이템 클릭 시 관련 페이지로 이동
   *
   */

  const onUserClick = (userId: number) => {
    navigate(`/closet/${userId}`);
    dispatch(setSuspend(location.key));
  };

  const onItemClick = (itemId: number) => {
    navigate(`/goods/${itemId}`);
    dispatch(setSuspend(location.key));
  };

  if (data && socials !== undefined) {
    return (
      <StyleModalLayout
        open={open}
        visible={visible}
        outside={outside}
        onClose={onClose}
        onOuterClick={onOuterClick}
        style={data.style}
        isLoggedIn={accessToken !== null}
        likedCount={socials.likedCount}
        isLiked={socials.isLiked}
        isFollowed={socials.isFollowed}
        onLike={onLike}
        onUnlike={onUnlike}
        onFollow={onFollow}
        onUnfollow={onUnfollow}
        onUserClick={onUserClick}
        onItemClick={onItemClick}
      />
    );
  }
}
