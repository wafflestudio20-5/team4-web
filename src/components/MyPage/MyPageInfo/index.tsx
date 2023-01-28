import React, { useCallback, useEffect, useState } from 'react';
import { FileUpload, useFileUpload } from 'use-file-upload';
import { User } from '../../../lib/interface';
import styles from './MyPageInfo.module.scss';
import {
  apiCheckNickname,
  apiPatchMyInfo,
  apiPostImage,
} from '../../../lib/api';
import { Oval } from 'react-loader-spinner';

const regexUsername: RegExp = /^[a-z0-9_]+$/;

interface BasicInfoProps {
  user: User;
  accessToken: string | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function getDefaultImage(username: string): string {
  const firstAlphabetIndex = username.search(/[a-z]/);
  const firstAlphabet =
    firstAlphabetIndex > -1 ? username[firstAlphabetIndex] : 'a';
  return `//image.msscdn.net/mfile_s01/_simbols/_basic/${firstAlphabet}.png`;
}

function LoadingModal() {
  return (
    <div className={styles.modalbackground}>
      <div className={styles.modalContainer}>
        <Oval
          height={40}
          width={40}
          color="#d8d8d8"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#d8d8d8"
          strokeWidth={8}
          strokeWidthSecondary={8}
        />
      </div>
    </div>
  );
}

function BasicInfo({ user, accessToken, setIsLoading }: BasicInfoProps) {
  const [imageFile, setImageFile] = useFileUpload();
  const [image, setImage] = useState(user.image);
  const [isChangeImageClicked, setIsChangeImageClicked] = useState(false);

  const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);

  const [nickname, setNickname] = useState(user.nickname);
  const [nicknameHelper, setNicknameHelper] = useState('');
  const [isChangeNicknameClicked, setIsChangeNicknameClicked] = useState(false);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);

  const setImageFileCallBack = (file: FileUpload | [FileUpload]) => {
    const fileUpload = file as FileUpload;
    const localImage = URL.createObjectURL(fileUpload.file);
    setImage(localImage);
  };

  const onClickSetDefaultImage = () => {
    const defaultImage = getDefaultImage(user.username);
    setImage(defaultImage);
  };

  const onClickChangeImage = async () => {
    if (image === user.image) {
      setIsChangeImageClicked(false);
      return;
    }
    if (image.includes('//image.msscdn.net/mfile_s01/_simbols/_basic/')) {
      await apiPatchMyInfo({ image: image }, accessToken);
    } else if (imageFile) {
      const formData = new FormData();
      const fileUpload = imageFile as FileUpload;
      formData.append('images', fileUpload.file);

      setIsLoading(true);
      const response = await apiPostImage(formData, accessToken);
      setIsLoading(false);

      const secureImages = response.data.secureImages;
      if (secureImages.length === 1) {
        await apiPatchMyInfo({ image: secureImages[0] }, accessToken);
        window.location.reload();
      } else {
        console.log('에러 발생');
      }
    }
    window.location.reload();
  };

  const onClickChangePassword = async () => {};

  const onClickChangeNickname = useCallback(async () => {
    if (nickname === user.nickname) {
      setIsChangeNicknameClicked(false);
      return;
    }
    await apiPatchMyInfo({ nickname: nickname }, accessToken);
    window.location.reload();
  }, [nickname, user.nickname, accessToken]);

  const getNicknameHelper = useCallback(
    async (nickname: string) => {
      if (!isNicknameFocused) return { message: '' };
      if (nickname === user.nickname) return { message: '' };
      if (!nickname) return { message: '닉네임을 입력해주세요.' };
      if (nickname.length < 5)
        return { message: '닉네임은 5자 이상이어야 합니다.' };
      if (!regexUsername.test(nickname))
        return {
          message: '닉네임은 영문소문자, 숫자, 특수기호(_)만 사용 가능합니다.',
        };
      const response = await apiCheckNickname(nickname);
      return response.data.isUnique
        ? { message: '사용 가능한 닉네임입니다.' }
        : { message: '이미 사용 중인 닉네임입니다.' };
    },
    [isNicknameFocused, user.nickname]
  );

  const updateNicknameHelper = useCallback(
    async (nickname: string) => {
      const nicknameHelper = await getNicknameHelper(nickname);
      setNicknameHelper(nicknameHelper.message);
    },
    [getNicknameHelper]
  );

  useEffect(() => {
    updateNicknameHelper(nickname);
  }, [nickname, updateNicknameHelper]);

  return (
    <section id="basic-info">
      <header className={styles.title}>
        <h1>
          기본 회원정보 <span>필수</span>
        </h1>
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
            <img className={styles.user_image} src={image} alt="이미지 없음" />
            <span className={styles.image_text}>
              회원님을 알릴 수 있는 사진을 등록해 주세요.
              <br />
              등록된 사진은 회원님의 게시물이나 댓글들에 사용됩니다.
            </span>
            {isChangeImageClicked && (
              <div className={styles.button_container}>
                <button
                  className={styles.grid_button}
                  style={{ minWidth: '70px' }}
                  onClick={(e) => {
                    e.preventDefault();
                    setImageFile(
                      { accept: 'image/*', multiple: false },
                      setImageFileCallBack
                    );
                  }}
                >
                  사진 선택
                </button>
                <button
                  className={styles.grid_button}
                  onClick={onClickSetDefaultImage}
                >
                  기본 이미지로 변경
                </button>
              </div>
            )}
          </div>
          <div className={styles.grid_block}>
            {isChangeImageClicked ? (
              <div>
                <button
                  className={styles.grid_cancel_button}
                  onClick={() => {
                    setIsChangeImageClicked(false);
                    setImage(user.image);
                  }}
                >
                  취소
                </button>
                <button
                  className={styles.grid_confirm_button}
                  onClick={onClickChangeImage}
                >
                  완료
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeImageClicked(true);
                }}
              >
                사진 변경
              </button>
            )}
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
            {isChangeNicknameClicked ? (
              <div>
                <input
                  className={styles.nickname_input}
                  defaultValue={user.nickname}
                  maxLength={15}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                  onFocus={() => {
                    setIsNicknameFocused(true);
                  }}
                />
                <div
                  className={
                    nicknameHelper === '사용 가능한 닉네임입니다.'
                      ? `${styles.helper} ${styles.valid}`
                      : `${styles.helper} ${styles.invalid}`
                  }
                >
                  {nicknameHelper}
                </div>
                <ul className={styles.nickname_constraint}>
                  <li>최소 5자 이상, 최대 15자 이하로 작성해주세요.</li>
                  <li>영문소문자, 숫자, 특수기호(_)만 사용 가능합니다.</li>
                </ul>
              </div>
            ) : (
              <strong className={styles.grid_strong}>{user.nickname}</strong>
            )}
          </div>
          <div className={styles.grid_block}>
            {isChangeNicknameClicked ? (
              <div>
                <button
                  className={styles.grid_cancel_button}
                  onClick={() => {
                    setIsChangeNicknameClicked(false);
                  }}
                >
                  취소
                </button>
                <button
                  className={
                    nicknameHelper !== '' &&
                    nicknameHelper !== '사용 가능한 닉네임입니다.'
                      ? styles.grid_disabled_button
                      : styles.grid_confirm_button
                  }
                  onClick={onClickChangeNickname}
                  disabled={
                    nicknameHelper !== '' &&
                    nicknameHelper !== '사용 가능한 닉네임입니다.'
                  }
                >
                  완료
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeNicknameClicked(true);
                }}
              >
                닉네임 변경
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface AdditionalInfoProps {
  user: User;
  accessToken: string | null;
}

function AdditionalInfo({ user, accessToken }: AdditionalInfoProps) {
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

interface MyPageInfoProps {
  user: User;
  accessToken: string | null;
}

export default function MyPageInfo({ user, accessToken }: MyPageInfoProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className={styles.wrapper}>
        <BasicInfo
          user={user}
          accessToken={accessToken}
          setIsLoading={setIsLoading}
        />
        <AdditionalInfo user={user} accessToken={accessToken} />
      </div>
    </>
  );
}
