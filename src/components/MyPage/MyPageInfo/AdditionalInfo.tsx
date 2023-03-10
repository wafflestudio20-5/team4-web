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
          message: '????????? ?????? ????????? ?????????.',
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
          message: '????????? ?????? ????????? ?????????.',
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
          ?????? ???????????? <span>??????</span>
        </h1>
      </header>
      <div className={styles.content}>
        <div id="additional-sex" className={styles.info_grid}>
          <div className={styles.grid_block}>??????</div>
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
                <option value="none">?????? ??? ???</option>
                <option value="male">??????</option>
                <option value="female">??????</option>
              </select>
            ) : (
              <strong className={styles.grid_strong}>
                {user.sex === 'male'
                  ? '??????'
                  : user.sex === 'female'
                  ? '??????'
                  : '?????? ??? ???'}
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
                  ??????
                </button>
                <button
                  className={styles.grid_confirm_button}
                  onClick={onClickChangeSex}
                >
                  ??????
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeSexClicked(true);
                }}
              >
                ?????? ??????
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-body-size" className={styles.info_grid}>
          <div className={styles.grid_block}>??? / ?????????</div>
          <div className={styles.grid_block}>
            {isChangeHeightWeightClicked ? (
              <>
                <div className={styles.numeric_row_wrapper}>
                  <label className={styles.label}>???</label>
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
                  <label className={styles.label}>?????????</label>
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
                  ??????
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
                  ??????
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeHeightWeightClicked(true);
                }}
              >
                ??? / ????????? ??????
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div id="additional-description" className={styles.info_grid}>
          <div className={styles.grid_block}>????????????</div>
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
                  <li>?????? ??? ????????? ????????? ??????????????? ???????????????.</li>
                  <li>?????? 40??? ????????? ??????????????????.</li>
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
                  ??????
                </button>
                <button
                  className={styles.grid_confirm_button}
                  onClick={onClickChangeDescription}
                >
                  ??????
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeDescriptionClicked(true);
                }}
              >
                ???????????? ??????
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
                    ?????? ??? ????????? ????????? ????????? Instagram ????????? ?????? ?????????
                    ????????????.
                  </li>
                  <li>?????? 30??? ????????? ??????????????????.</li>
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
                  ??????
                </button>
                <button
                  className={styles.grid_confirm_button}
                  onClick={onClickChangeInstaUsername}
                >
                  ??????
                </button>
              </div>
            ) : (
              <button
                className={styles.grid_button}
                onClick={() => {
                  setIsChangeInstaUsernameClicked(true);
                }}
              >
                Instagram ID ??????
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
