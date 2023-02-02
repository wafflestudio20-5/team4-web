import { useState } from 'react';
import { useApiGetSearchUserFetcher, useApiData } from '../../lib/api';
import styles from './SideBarStyle.module.scss';
import close from '../../resources/image/close.png';
import { useNavigate } from 'react-router-dom';

export default function SideBarStyle() {
  const [query, setQuery] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const { data } = useApiData(useApiGetSearchUserFetcher(query, 0, 10));

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.userSearch}>
        <input
          type="text"
          value={query}
          placeholder="유저 검색"
          onChange={onChange}
        />
        <div
          className={styles.searchButton}
          onClick={() => {
            setQuery('');
          }}
        >
          <img src={close} alt="search_button" />
        </div>
      </div>
      {query === '' ? (
        <div className={styles.tap}>
          <div>추천 유저</div>
        </div>
      ) : (
        <div className={styles.tap}>
          <div>검색 결과</div>
        </div>
      )}
      {data?.users && data?.users.length === 0 ? (
        <div className={styles.null}>
          <div>"{query}" 검색 결과 없음.</div>
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
      <div className={styles.styletap}>
        <div>
          <div
            className={styles.navigatebutton}
            onClick={() => {
              navigate('/stylelist');
            }}
          >
            스타일 더 보기 {'>'}
          </div>
        </div>
      </div>
    </>
  );
}
