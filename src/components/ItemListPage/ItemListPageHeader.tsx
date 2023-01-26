import { NavigateFunction, createSearchParams } from 'react-router-dom';
import {
  Category,
  SubCategory,
  displayCategory,
  displaySubCategory,
  SubCategoryInCategory,
} from '../../lib/interface';
import styles from './ItemListPageHeader.module.scss';

interface ItemListPageHeaderProps {
  category: Category | undefined;
  subCategory: SubCategory | undefined;
  searchKey: string | undefined;
  getCategorybySubCategory: (subcategory: SubCategory) => Category;
  navigate: NavigateFunction;
  inputs: string;
  handleInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;
}

export default function ItemListPageHeader({
  category,
  subCategory,
  searchKey,
  getCategorybySubCategory,
  navigate,
  inputs,
  handleInputs,
  onKeyPress,
  onSubmit,
}: ItemListPageHeaderProps) {
  return (
    <>
      <div className={styles.pagenation}>
        <div className={styles.nav_sub}>
          <span>무신사 스토어</span>
          {subCategory ? (
            <>
              <span className={styles.iconEntity}>{'>'}</span>
              <span
                className={styles.navi}
                onClick={() => {
                  navigate({
                    pathname: '/itemlist',
                    search: `?${createSearchParams({
                      type: 'category',
                      q: getCategorybySubCategory(subCategory),
                    })}`,
                  });
                }}
              >
                {displayCategory(getCategorybySubCategory(subCategory))}
              </span>
              <span className={styles.iconEntity}>{'>'}</span>
              <span
                className={styles.navi}
                onClick={() => {
                  navigate({
                    pathname: '/itemlist',
                    search: `?${createSearchParams({
                      type: 'subcategory',
                      q: subCategory,
                    })}`,
                  });
                }}
              >
                {displaySubCategory(subCategory)}
              </span>
            </>
          ) : category ? (
            <>
              <span
                className={styles.iconEntity}
                onClick={() => {
                  navigate({
                    pathname: '/itemlist',
                    search: `?${createSearchParams({
                      type: 'category',
                      q: category,
                    })}`,
                  });
                }}
              >
                {'>'}
              </span>
              <span className={styles.navi}>{displayCategory(category)}</span>
            </>
          ) : searchKey ? (
            <>
              <span className={styles.iconEntity}>{'>'}</span>
              <span>검색</span>
              <span className={styles.iconEntity}>{'>'}</span>
              <span>{searchKey}</span>
            </>
          ) : (
            <>
              <span className={styles.iconEntity}>{'>'}</span>
              <span className={styles.navi}>전체</span>
            </>
          )}
        </div>
      </div>
      <div className={styles.sortingBar}>
        <div className={styles.sortingTitle}>
          <span>대분류</span>
        </div>
        <div className={styles.sortingOption}>
          <div
            className={
              !category && !subCategory && !searchKey ? styles.select : ''
            }
          >
            <span
              onClick={() => {
                navigate({
                  pathname: '/itemlist',
                  search: `?${createSearchParams({
                    type: 'category',
                    q: 'all',
                  })}`,
                });
              }}
            >
              전체
            </span>
          </div>
          {Object.values(Category).map((cate) => {
            return (
              <div
                key={cate}
                className={
                  (subCategory &&
                    getCategorybySubCategory(subCategory) === cate) ||
                  category === cate
                    ? styles.select
                    : ''
                }
              >
                <span
                  onClick={() => {
                    navigate({
                      pathname: '/itemlist',
                      search: `?${createSearchParams({
                        type: 'category',
                        q: `${cate}`,
                      })}`,
                    });
                  }}
                >
                  {displayCategory(cate)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.sortingBar}>
        <div className={styles.sortingTitle}>
          <span>중분류</span>
        </div>
        <div className={styles.sortingOption}>
          <div className={!subCategory && !searchKey ? styles.select : ''}>
            <span
              onClick={() => {
                navigate({
                  pathname: '/itemlist',
                  search: `?${createSearchParams({
                    type: 'category',
                    q: subCategory
                      ? `${getCategorybySubCategory(subCategory)}`
                      : 'all',
                  })}`,
                });
              }}
            >
              전체
            </span>
          </div>
          {subCategory
            ? SubCategoryInCategory(getCategorybySubCategory(subCategory)).map(
                (sub) => {
                  return (
                    <div
                      key={sub}
                      className={subCategory === sub ? styles.select : ''}
                    >
                      <span
                        onClick={() => {
                          navigate({
                            pathname: '/itemlist',
                            search: `?${createSearchParams({
                              type: 'subcategory',
                              q: `${sub}`,
                            })}`,
                          });
                        }}
                      >
                        {displaySubCategory(sub)}
                      </span>
                    </div>
                  );
                }
              )
            : category
            ? SubCategoryInCategory(category).map((sub) => {
                return (
                  <div key={sub}>
                    <span
                      onClick={() => {
                        navigate({
                          pathname: '/itemlist',
                          search: `?${createSearchParams({
                            type: 'subcategory',
                            q: `${sub}`,
                          })}`,
                        });
                      }}
                    >
                      {displaySubCategory(sub)}
                    </span>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className={styles.sortingBar}>
        <div className={styles.sortingTitle}>
          <span>검색</span>
        </div>
        <div className={styles.sortingOption}>
          <div>
            <input
              value={inputs}
              onChange={handleInputs}
              onKeyPress={onKeyPress}
            ></input>
            <button onClick={onSubmit}>검색</button>
          </div>
        </div>
      </div>
    </>
  );
}
