import { User } from '../../../lib/interface';
import {
  apiCheckNickname,
  apiCheckPassword,
  apiPatchMyInfo,
  apiPostImage,
} from '../../../lib/api';
import {
  regexAlphabet,
  regexNumber,
  regexRepeat,
  regexSpecial,
  regexUsername,
} from '../../../lib/formatters/regexFormatter';
import { FileUpload, useFileUpload } from 'use-file-upload';
import { useCallback, useEffect, useState } from 'react';
import styles from './MyPageInfo.module.scss';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

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

export default function BasicInfo({
  user,
  accessToken,
  setIsLoading,
}: BasicInfoProps) {
  /* IMAGE */
  const [imageFile, setImageFile] = useFileUpload();
  const [image, setImage] = useState(user.image);
  const [isChangeImageClicked, setIsChangeImageClicked] = useState(false);

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
        console.log('?????? ??????');
      }
    }
    window.location.reload();
  };

  /* PASSWORD */
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const [passwordHelper, setPasswordHelper] = useState('');
  const [newPasswordHelper, setNewPasswordHelper] = useState('');
  const [newPasswordConfirmHelper, setNewPasswordConfirmHelper] = useState('');

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNewPasswordFocused, setIsNewPasswordFocused] = useState(false);

  const [isInputHidden, setIsInputHidden] = useState({
    password: true,
    newPassword: true,
    newPasswordConfirm: true,
  });

  const [isChangePasswordClicked, setIsChangePasswordClicked] = useState(false);

  const onClickChangePassword = useCallback(async () => {
    try {
      await apiCheckPassword(password, accessToken);
      await apiPatchMyInfo({ password: newPassword }, accessToken);
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.code === 'ERR_BAD_REQUEST') {
        toast('?????? ??????????????? ???????????? ????????????.');
        setPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
        setIsPasswordFocused(false);
        setIsNewPasswordFocused(false);
        return;
      } else toast('[?????? ??????] ????????? ????????? ??? ????????????.');
    }
    window.location.reload();
  }, [password, newPassword, accessToken]);

  const getPasswordHelper = useCallback(
    (password: string) => {
      if (!isPasswordFocused) return { message: '' };
      if (!password) return { message: '?????? ???????????????.' };
      if (password.length < 8)
        return { message: '8~30??? ????????? ????????? ????????????.' };
      if (regexRepeat.test(password))
        return {
          message: '??????????????? ???????????? 4??? ?????? ????????? ??? ????????????.',
        };
      const combinationCount =
        Number(regexNumber.test(password)) +
        Number(regexAlphabet.test(password)) +
        Number(regexSpecial.test(password));
      if (combinationCount < 2)
        return {
          message:
            '??????, ?????? ????????????, ???????????? ??? ????????? ???????????? ????????? ????????????.',
        };
      return { message: '' };
    },
    [isPasswordFocused]
  );

  const getNewPasswordHelper = useCallback(
    (newPassword: string) => {
      if (!isNewPasswordFocused) return { message: '' };
      if (!newPassword) return { message: '?????? ???????????????.' };
      if (newPassword.length < 8)
        return { message: '8~30??? ????????? ????????? ????????????.' };
      if (regexRepeat.test(newPassword))
        return {
          message: '??????????????? ???????????? 4??? ?????? ????????? ??? ????????????.',
        };
      const combinationCount =
        Number(regexNumber.test(newPassword)) +
        Number(regexAlphabet.test(newPassword)) +
        Number(regexSpecial.test(newPassword));
      if (combinationCount < 2)
        return {
          message:
            '??????, ?????? ????????????, ???????????? ??? ????????? ???????????? ????????? ????????????.',
        };
      if (newPassword === password)
        return {
          message: '???????????? ?????? ??????????????? ???????????????.',
        };
      return { message: '' };
    },
    [isNewPasswordFocused, password]
  );

  const getPasswordConfirmHelper = useCallback(
    (passwordConfirm: string) => {
      if (!isNewPasswordFocused) return { message: '' };
      if (!passwordConfirm) return { message: '?????? ???????????????.' };
      if (passwordConfirm !== newPassword)
        return { message: '??????????????? ???????????? ????????????.' };
      return { message: '' };
    },
    [newPassword, isNewPasswordFocused]
  );

  const onClickTogglePassword = (input: string) => {
    switch (input) {
      case 'password':
        setIsInputHidden((prev) => ({ ...prev, password: !prev.password }));
        break;
      case 'newPassword':
        setIsInputHidden((prev) => ({
          ...prev,
          newPassword: !prev.newPassword,
        }));
        break;
      case 'newPasswordConfirm':
        setIsInputHidden((prev) => ({
          ...prev,
          newPasswordConfirm: !prev.newPasswordConfirm,
        }));
        break;
    }
  };

  const checkPasswordInputs = useCallback(() => {
    return (password &&
      newPassword &&
      newPasswordConfirm &&
      passwordHelper === '' &&
      newPasswordHelper === '' &&
      newPasswordConfirmHelper === '') as boolean;
  }, [
    password,
    passwordHelper,
    newPassword,
    newPasswordHelper,
    newPasswordConfirm,
    newPasswordConfirmHelper,
  ]);

  useEffect(() => {
    setPasswordHelper(getPasswordHelper(password).message);
  }, [password, getPasswordHelper]);

  useEffect(() => {
    setNewPasswordHelper(getNewPasswordHelper(newPassword).message);
    setNewPasswordConfirmHelper(
      getPasswordConfirmHelper(newPasswordConfirm).message
    );
  }, [
    newPassword,
    newPasswordConfirm,
    getNewPasswordHelper,
    getPasswordConfirmHelper,
  ]);

  /* NICKNAME */
  const [nickname, setNickname] = useState(user.nickname);
  const [nicknameHelper, setNicknameHelper] = useState('');
  const [isChangeNicknameClicked, setIsChangeNicknameClicked] = useState(false);
  const [isNicknameFocused, setIsNicknameFocused] = useState(false);

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
      if (!nickname) return { message: '???????????? ??????????????????.' };
      if (nickname.length < 5)
        return { message: '???????????? 5??? ??????????????? ?????????.' };
      if (!regexUsername.test(nickname))
        return {
          message: '???????????? ???????????????, ??????, ????????????(_)??? ?????? ???????????????.',
        };
      const response = await apiCheckNickname(nickname);
      return response.data.isUnique
        ? { message: '?????? ????????? ??????????????????.' }
        : { message: '?????? ?????? ?????? ??????????????????.' };
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
          ?????? ???????????? <span>??????</span>
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
            ??????
          </div>
          <div className={styles.grid_block}>
            <img className={styles.user_image} src={image} alt="????????? ??????" />
            <span className={styles.image_text}>
              ???????????? ?????? ??? ?????? ????????? ????????? ?????????.
              <br />
              ????????? ????????? ???????????? ??????????????? ???????????? ???????????????.
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
                  ?????? ??????
                </button>
                <button
                  className={styles.grid_button}
                  onClick={onClickSetDefaultImage}
                >
                  ?????? ???????????? ??????
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
                  ??????
                </button>
                <button
                  className={styles.grid_confirm_button}
                  onClick={onClickChangeImage}
                >
                  ??????
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeImageClicked(true);
                }}
              >
                ?????? ??????
              </button>
            )}
          </div>
        </div>
        <div id="basic-username" className={styles.info_grid}>
          <div className={styles.grid_block}>?????????</div>
          <div className={styles.grid_block}>
            <strong className={styles.grid_strong}>{user.username}</strong>
          </div>
          <div className={styles.grid_block}></div>
        </div>
        <div id="basic-password" className={styles.info_grid}>
          <div className={styles.grid_block}>????????????</div>
          <div className={styles.grid_block}>
            {isChangePasswordClicked ? (
              <>
                <div className={styles.password_row_wrapper}>
                  <label className={styles.password_label}>?????? ????????????</label>
                  <div className={styles.input_helper_wrapper}>
                    <div
                      className={
                        passwordHelper
                          ? `${styles.input_wrapper} ${styles.inputWrapDanger}`
                          : styles.input_wrapper
                      }
                    >
                      <input
                        className={styles.input}
                        type={isInputHidden.password ? 'password' : 'text'}
                        value={password}
                        maxLength={30}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                        onFocus={() => {
                          setIsPasswordFocused(true);
                        }}
                      />
                      {password && (
                        <button
                          className={
                            isInputHidden.password
                              ? styles.show_password_button
                              : styles.hide_password_button
                          }
                          onClick={(e) => {
                            onClickTogglePassword('password');
                          }}
                        ></button>
                      )}
                    </div>
                    <div className={styles.helper_container}>
                      <div className={`${styles.helper} ${styles.invalid}`}>
                        {passwordHelper}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.password_row_wrapper}>
                  <label className={styles.password_label}>??? ????????????</label>
                  <div className={styles.input_helper_wrapper}>
                    <div
                      className={
                        newPasswordHelper
                          ? `${styles.input_wrapper} ${styles.inputWrapDanger}`
                          : styles.input_wrapper
                      }
                    >
                      <input
                        className={styles.input}
                        type={isInputHidden.newPassword ? 'password' : 'text'}
                        maxLength={30}
                        value={newPassword}
                        placeholder="??????, ??????, ???????????? ?????? ?????? 8???"
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                        onFocus={() => {
                          setIsNewPasswordFocused(true);
                        }}
                      />
                      {newPassword && (
                        <button
                          className={
                            isInputHidden.newPassword
                              ? styles.show_password_button
                              : styles.hide_password_button
                          }
                          onClick={(e) => {
                            onClickTogglePassword('newPassword');
                          }}
                        ></button>
                      )}
                    </div>
                    <div className={styles.helper_container}>
                      <div className={`${styles.helper} ${styles.invalid}`}>
                        {newPasswordHelper}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.password_row_wrapper}>
                  <label className={styles.password_label}>
                    ??? ???????????? ?????????
                  </label>
                  <div className={styles.input_helper_wrapper}>
                    <div
                      className={
                        newPasswordConfirmHelper
                          ? `${styles.input_wrapper} ${styles.inputWrapDanger}`
                          : styles.input_wrapper
                      }
                    >
                      <input
                        className={styles.input}
                        type={
                          isInputHidden.newPasswordConfirm ? 'password' : 'text'
                        }
                        value={newPasswordConfirm}
                        maxLength={30}
                        onChange={(e) => {
                          setNewPasswordConfirm(e.target.value);
                        }}
                      />
                      {newPasswordConfirm && (
                        <button
                          className={
                            isInputHidden.newPasswordConfirm
                              ? styles.show_password_button
                              : styles.hide_password_button
                          }
                          onClick={(e) => {
                            onClickTogglePassword('newPasswordConfirm');
                          }}
                        ></button>
                      )}
                    </div>
                    <div className={styles.helper_container}>
                      <div className={`${styles.helper} ${styles.invalid}`}>
                        {newPasswordConfirmHelper}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <strong className={styles.grid_strong}>********</strong>
            )}
          </div>
          <div className={styles.grid_block}>
            {isChangePasswordClicked ? (
              <div>
                <button
                  className={styles.grid_cancel_button}
                  onClick={() => {
                    setIsChangePasswordClicked(false);
                    setPassword('');
                    setNewPassword('');
                    setNewPasswordConfirm('');
                    setIsPasswordFocused(false);
                    setIsNewPasswordFocused(false);
                  }}
                >
                  ??????
                </button>
                <button
                  className={
                    checkPasswordInputs()
                      ? styles.grid_confirm_button
                      : styles.grid_disabled_button
                  }
                  onClick={onClickChangePassword}
                  disabled={!checkPasswordInputs()}
                >
                  ??????
                </button>
              </div>
            ) : (
              // Can change password only if the user is not logged in via social service
              !user.socialKey && (
                <button
                  className={styles.grid_button}
                  onClick={() => {
                    setIsChangePasswordClicked(true);
                  }}
                >
                  ???????????? ??????
                </button>
              )
            )}
          </div>
        </div>
        <div id="basic-nickname" className={styles.info_grid}>
          <div className={styles.grid_block}>?????????</div>
          <div className={styles.grid_block}>
            {isChangeNicknameClicked ? (
              <>
                <div
                  className={
                    nicknameHelper &&
                    nicknameHelper !== '?????? ????????? ??????????????????.'
                      ? `${styles.input_wrapper} ${styles.inputWrapDanger}`
                      : styles.input_wrapper
                  }
                >
                  <input
                    className={styles.input}
                    defaultValue={user.nickname}
                    maxLength={15}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                    onFocus={() => {
                      setIsNicknameFocused(true);
                    }}
                  />
                </div>
                <div className={styles.helper_container}>
                  <div
                    className={
                      nicknameHelper === '?????? ????????? ??????????????????.'
                        ? `${styles.helper} ${styles.valid}`
                        : `${styles.helper} ${styles.invalid}`
                    }
                  >
                    {nicknameHelper}
                  </div>
                </div>
                <ul className={styles.constraint}>
                  <li>?????? 5??? ??????, ?????? 15??? ????????? ??????????????????.</li>
                  <li>?????? ?????????, ??????, ????????????(_)??? ?????? ???????????????.</li>
                </ul>
              </>
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
                    setIsNicknameFocused(false);
                  }}
                >
                  ??????
                </button>
                <button
                  className={
                    nicknameHelper !== '' &&
                    nicknameHelper !== '?????? ????????? ??????????????????.'
                      ? styles.grid_disabled_button
                      : styles.grid_confirm_button
                  }
                  onClick={onClickChangeNickname}
                  disabled={
                    nicknameHelper !== '' &&
                    nicknameHelper !== '?????? ????????? ??????????????????.'
                  }
                >
                  ??????
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeNicknameClicked(true);
                }}
              >
                ????????? ??????
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
