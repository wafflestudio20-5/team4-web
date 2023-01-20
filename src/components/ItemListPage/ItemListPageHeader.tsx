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
  getCategorybySubCategory: (subcategory: SubCategory) => Category;
  navigate: NavigateFunction;
}

export default function ItemListPageHeader({
  category,
  subCategory,
  getCategorybySubCategory,
  navigate,
}: ItemListPageHeaderProps) {
  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <>
      <div className={styles.pagenation}>
        <div className={styles.nav_sub}>
          <span
            className={styles.navi}
            onClick={() => {
              navigate('/');
            }}
          >
            무신사 스토어
          </span>
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
          ) : (
            <>
              <span className={styles.iconEntity}>{'>'}</span>
              <span className={styles.navi}>전체</span>
            </>
          )}
        </div>
      </div>
      <div className={styles.rightContents}>
        <h2 className={styles.titlePage}>
          {subCategory
            ? capitalize(getCategorybySubCategory(subCategory))
            : category
            ? capitalize(category)
            : '전체'}
        </h2>
      </div>
      <div className={styles.sortingBar}>
        <div className={styles.sortingTitle}>
          <span>대분류</span>
        </div>
        <div className={styles.sortingOption}>
          <div>전체</div>
          {Object.values(Category).map((category) => {
            return <div>{displayCategory(category)}</div>;
          })}
        </div>
      </div>
      <div className={styles.sortingBar}>
        <div className={styles.sortingTitle}>
          <span>중분류</span>
        </div>
        <div className={styles.sortingOption}>
          <div>전체</div>
          {subCategory
            ? SubCategoryInCategory(getCategorybySubCategory(subCategory)).map(
                (sub) => {
                  return <div>{displaySubCategory(sub)}</div>;
                }
              )
            : null}
        </div>
      </div>
      <div className={styles.sortingBar}>
        <div className={styles.sortingTitle}>
          <span>검색</span>
        </div>
        <div className={styles.sortingOption}>
          <div>
            <input></input>
            <button>검색</button>
          </div>
        </div>
      </div>
    </>
  );
}
