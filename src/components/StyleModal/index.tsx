import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '../../store';
import { setClose } from '../../store/slices/modal';
import {
  useApiData,
  useApiStyleFetcher,
  apiPostFollow,
  apiDeleteFollow,
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

  console.log(`open: ${open}, visible: ${visible}`);

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

  const [isFollowed, setIsFollowed] = useState<boolean | undefined>(undefined);
  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setIsFollowed(data.isFollow);
      setIsLiked(data.isLike);
    }
  }, [data]);

  const userId = data?.style.user.id;

  const onFollow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!userId) {
      toast('요청에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    apiPostFollow(userId, accessToken)
      .then(() => {
        setIsFollowed(true);
      })
      .catch((error) => {
        toast('요청에 실패했습니다. 다시 시도해주세요.');
      });
  };

  const onUnfollow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!userId) {
      toast('요청에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    apiDeleteFollow(userId, accessToken)
      .then(() => {
        setIsFollowed(false);
      })
      .catch((error) => {
        toast('요청에 실패했습니다. 다시 시도해주세요.');
      });
  };

  const onLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLiked(true);
  };

  const onUnlike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsLiked(false);
  };

  if (data && isFollowed !== undefined && isLiked !== undefined) {
    return (
      <StyleModalLayout
        open={open}
        visible={visible}
        outside={outside}
        onClose={onClose}
        onOuterClick={onOuterClick}
        style={data.style}
        likedCount={data.likedCount}
        isLoggedIn={accessToken !== null}
        isLiked={isLiked}
        isFollowed={isFollowed}
        onLike={onLike}
        onUnlike={onUnlike}
        onFollow={onFollow}
        onUnfollow={onUnfollow}
      />
    );
  }
}
