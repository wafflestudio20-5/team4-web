import { Link } from 'react-router-dom';
import {
  Item,
  Category,
  SubCategory,
  displayCategory,
  displaySubCategory,
} from '../../lib/interface';
import styles from './DetailPageLayout.module.scss';

interface DetailPageLayoutProps {
  item: Item;
}

export default function DetailPageLayout({ item }: DetailPageLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.category}>
        <span>
          {/* 백엔드 수정 이후에 고칠 예정 */}
          <Link to="/">
            {displayCategory(item.category.toLowerCase() as Category)}
          </Link>
          {' > '}
          <Link to="/">
            {displaySubCategory(item.subCategory.toLowerCase() as SubCategory)}
          </Link>
        </span>
      </div>
    </div>
  );
}
