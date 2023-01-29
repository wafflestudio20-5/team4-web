import { NavigateFunction } from 'react-router-dom';
import styles from './StyleListPageHeader.module.scss';

interface ItemListPageHeaderProps {
  navigate: NavigateFunction;
}

export default function ItemListPageHeader({
  navigate,
}: ItemListPageHeaderProps) {
  return (
    <div className={styles.pagenation}>
      <div className={styles.nav_sub}>
        <span>무신사 스토어</span>
        <span className={styles.iconEntity}>{'>'}</span>
        <span
          className={styles.navi}
          // onClick={() => {
          //   navigate({
          //     pathname: '/itemlist',
          //     search: `?${createSearchParams({
          //       type: 'category',
          //       q: getCategorybySubCategory(subCategory),
          //     })}`,
          //   });
          // }}
        >
          스타일
        </span>
      </div>
    </div>
  );
}
