import { useCallback, useEffect, useState } from 'react';
import { apiPatchMyInfo } from '../../../lib/api';
import { regexHeightWeight } from '../../../lib/formatters/regexFormatter';
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
  /* SEX */
  const [sex, setSex] = useState(user.sex);
  const [isChangeSexClicked, setIsChangeSexClicked] = useState(false);

  const onClickChangeSex = useCallback(async () => {
    if (sex === user.sex) {
      setIsChangeSexClicked(false);
      return;
    }
    switch (sex) {
      case 'none':
        await apiPatchMyInfo({ sex: '' }, accessToken);
        break;
      default:
        await apiPatchMyInfo({ sex: sex }, accessToken);
        break;
    }
    window.location.reload();
  }, [sex, user.sex, accessToken]);

  /* HEIGHT & WEIGHT */
  const [height, setHeight] = useState(
    user.height ? user.height.toString() : ''
  );
  const [heightHelper, setHeightHelper] = useState('');
  const [weight, setWeight] = useState(
    user.weight ? user.weight.toString() : ''
  );
  const [weightHelper, setWeightHelper] = useState('');
  const [isHeightFocused, setIsHeightFocused] = useState(false);
  const [isWeightFocused, setIsWeightFocused] = useState(false);
  const [isChangeHeightWeightClicked, setIsChangeHeightWeightClicked] =
    useState(false);

  const onClickChangeHeightWeight = useCallback(async () => {
    if (
      height === user.height?.toString() &&
      weight === user.weight?.toString()
    ) {
      setIsChangeHeightWeightClicked(false);
      setIsHeightFocused(false);
      setIsWeightFocused(false);
      return;
    }
    await apiPatchMyInfo(
      { height: Number(height), weight: Number(weight) },
      accessToken
    );
    window.location.reload();
  }, [height, weight, user.height, user.weight, accessToken]);

  const getHeightHelper = useCallback(
    (height: string) => {
      if (!isHeightFocused) return { message: '' };
      if (height === '') return { message: '' };
      if (!regexHeightWeight.test(height))
        return {
          message: '유효한 값을 입력해 주세요.',
        };
      return { message: '' };
    },
    [isHeightFocused]
  );

  const getWeightHelper = useCallback(
    (weight: string) => {
      if (!isWeightFocused) return { message: '' };
      if (weight === '') return { message: '' };
      if (!regexHeightWeight.test(weight))
        return {
          message: '유효한 값을 입력해 주세요.',
        };
      return { message: '' };
    },
    [isWeightFocused]
  );

  useEffect(() => {
    setHeightHelper(getHeightHelper(height.toString()).message);
    setWeightHelper(getWeightHelper(weight.toString()).message);
  }, [height, getHeightHelper, weight, getWeightHelper]);

  /* DESCRIPTION */
  const [description, setDescription] = useState(user.description);
  const [isChangeDescriptionClicked, setIsChangeDescriptionClicked] =
    useState(false);

  const onClickChangeDescription = useCallback(async () => {
    if (description === user.description) {
      setIsChangeDescriptionClicked(false);
      return;
    }
    await apiPatchMyInfo({ description: description }, accessToken);
    window.location.reload();
  }, [description, user.description, accessToken]);

  /* INSTAGRAM ID */
  const [instaUsername, setInstaUsername] = useState(user.instaUsername);
  const [isChangeInstaUsernameClicked, setIsChangeInstaUsernameClicked] =
    useState(false);

  const onClickChangeInstaUsername = useCallback(async () => {
    if (instaUsername === user.instaUsername) {
      setIsChangeInstaUsernameClicked(false);
      return;
    }
    await apiPatchMyInfo({ instaUsername: instaUsername }, accessToken);
    window.location.reload();
  }, [instaUsername, user.instaUsername, accessToken]);

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
            {isChangeSexClicked ? (
              <select
                name="sex"
                id="sex-select"
                onChange={(e) => {
                  setSex(e.target.value);
                }}
                defaultValue={user.sex ? user.sex : 'none'}
                style={{ fontSize: '15px' }}
              >
                <option value="none">선택 안 함</option>
                <option value="male">남자</option>
                <option value="female">여자</option>
              </select>
            ) : (
              <strong className={styles.grid_strong}>
                {user.sex === 'male'
                  ? '남자'
                  : user.sex === 'female'
                  ? '여자'
                  : '선택 안 함'}
              </strong>
            )}
          </div>
          <div className={styles.grid_block}>
            {isChangeSexClicked ? (
              <div>
                <button
                  className={styles.grid_cancel_button}
                  onClick={() => {
                    setIsChangeSexClicked(false);
                  }}
                >
                  취소
                </button>
                <button
                  className={styles.grid_confirm_button}
                  onClick={onClickChangeSex}
                >
                  완료
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeSexClicked(true);
                }}
              >
                성별 변경
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-body-size" className={styles.info_grid}>
          <div className={styles.grid_block}>키 / 몸무게</div>
          <div className={styles.grid_block}>
            {isChangeHeightWeightClicked ? (
              <>
                <div className={styles.numeric_row_wrapper}>
                  <label className={styles.label}>키</label>
                  <div className={styles.input_label_helper_wrapper}>
                    <div className={styles.input_label_wrapper}>
                      <div
                        className={
                          heightHelper
                            ? `${styles.input_wrapper} ${styles.numeric_input_wrapper} ${styles.inputWrapDanger}`
                            : `${styles.input_wrapper} ${styles.numeric_input_wrapper}`
                        }
                      >
                        <input
                          className={`${styles.input} ${styles.numeric_input}`}
                          type="text"
                          defaultValue={user.height?.toString()}
                          maxLength={3}
                          onChange={(e) => {
                            setHeight(e.target.value);
                          }}
                          onFocus={() => {
                            setIsHeightFocused(true);
                          }}
                        />
                      </div>
                      <label className={styles.label}>cm</label>
                    </div>
                    <div className={styles.helper_container}>
                      <div className={`${styles.helper} ${styles.invalid}`}>
                        {heightHelper}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.numeric_row_wrapper}>
                  <label className={styles.label}>몸무게</label>
                  <div className={styles.input_label_helper_wrapper}>
                    <div className={styles.input_label_wrapper}>
                      <div
                        className={
                          weightHelper
                            ? `${styles.input_wrapper} ${styles.numeric_input_wrapper} ${styles.inputWrapDanger}`
                            : `${styles.input_wrapper} ${styles.numeric_input_wrapper}`
                        }
                      >
                        <input
                          className={`${styles.input} ${styles.numeric_input}`}
                          type="text"
                          defaultValue={user.weight?.toString()}
                          maxLength={3}
                          onChange={(e) => {
                            setWeight(e.target.value);
                          }}
                          onFocus={() => {
                            setIsWeightFocused(true);
                          }}
                        />
                      </div>
                      <label className={styles.label}>kg</label>
                    </div>
                    <div className={styles.helper_container}>
                      <div className={`${styles.helper} ${styles.invalid}`}>
                        {weightHelper}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <strong className={styles.grid_strong}>
                {user.height} cm / {user.weight} kg
              </strong>
            )}
          </div>
          <div className={styles.grid_block}>
            {isChangeHeightWeightClicked ? (
              <div>
                <button
                  className={styles.grid_cancel_button}
                  onClick={() => {
                    setIsChangeHeightWeightClicked(false);
                    setIsHeightFocused(false);
                    setIsWeightFocused(false);
                  }}
                >
                  취소
                </button>
                <button
                  className={
                    heightHelper === '' && weightHelper === ''
                      ? styles.grid_confirm_button
                      : styles.grid_disabled_button
                  }
                  onClick={onClickChangeHeightWeight}
                  disabled={!(heightHelper === '' && weightHelper === '')}
                >
                  완료
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeHeightWeightClicked(true);
                }}
              >
                키 / 몸무게 변경
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-description" className={styles.info_grid}>
          <div className={styles.grid_block}>자기소개</div>
          <div className={styles.grid_block}>
            {isChangeDescriptionClicked ? (
              <>
                <div
                  className={`${styles.input_wrapper} ${styles.additional_input_wrapper}`}
                >
                  <input
                    className={styles.input}
                    defaultValue={user.description}
                    maxLength={40}
                    autoFocus={true}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
                <ul className={styles.constraint}>
                  <li>입력 시 본인의 옷장에 자기소개가 표시됩니다.</li>
                  <li>최대 40자 이하로 작성해주세요.</li>
                </ul>
              </>
            ) : (
              <strong className={styles.grid_strong}>{user.description}</strong>
            )}
          </div>
          <div className={styles.grid_block}>
            {isChangeDescriptionClicked ? (
              <div>
                <button
                  className={styles.grid_cancel_button}
                  onClick={() => {
                    setIsChangeDescriptionClicked(false);
                  }}
                >
                  취소
                </button>
                <button
                  className={styles.grid_confirm_button}
                  onClick={onClickChangeDescription}
                >
                  완료
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeDescriptionClicked(true);
                }}
              >
                자기소개 변경
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-insta-username" className={styles.info_grid}>
          <div className={styles.grid_block}>Instagram ID</div>
          <div className={styles.grid_block}>
            {isChangeInstaUsernameClicked ? (
              <>
                <div
                  className={`${styles.input_wrapper} ${styles.additional_input_wrapper}`}
                >
                  <input
                    className={styles.input}
                    defaultValue={user.instaUsername}
                    maxLength={30}
                    autoFocus={true}
                    onChange={(e) => {
                      setInstaUsername(e.target.value);
                    }}
                  />
                </div>
                <ul className={styles.constraint}>
                  <li>
                    입력 시 본인의 옷장에 본인의 Instagram 피드로 가는 버튼이
                    생깁니다.
                  </li>
                  <li>최대 30자 이하로 작성해주세요.</li>
                </ul>
              </>
            ) : (
              <strong className={styles.grid_strong}>
                {user.instaUsername}
              </strong>
            )}
          </div>
          <div className={styles.grid_block}>
            {isChangeInstaUsernameClicked ? (
              <div>
                <button
                  className={styles.grid_cancel_button}
                  onClick={() => {
                    setIsChangeInstaUsernameClicked(false);
                  }}
                >
                  취소
                </button>
                <button
                  className={styles.grid_confirm_button}
                  onClick={onClickChangeInstaUsername}
                >
                  완료
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeInstaUsernameClicked(true);
                }}
              >
                Instagram ID 변경
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
