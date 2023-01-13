import { Link } from 'react-router-dom';
import {
  Item,
  Category,
  SubCategory,
  displayCategory,
  displaySubCategory,
} from '../../lib/interface';
import styles from './DetailPageLayout.module.scss';

interface DetailPageHeaderProps {
  name: string;
  category: Category;
  subCategory: SubCategory;
}

function DetailPageHeader({
  name,
  category,
  subCategory,
}: DetailPageHeaderProps) {
  return (
    <>
      <div className={styles.category}>
        <span>
          {/* 백엔드 수정 이후에 고칠 예정 */}
          <Link to="/">
            {displayCategory(category.toLowerCase() as Category)}
          </Link>
          {' > '}
          <Link to="/">
            {displaySubCategory(subCategory.toLowerCase() as SubCategory)}
          </Link>
        </span>
      </div>
      <div className={styles.name}>{name}</div>
    </>
  );
}

interface DetailPageLayoutProps {
  item: Item;
}

export default function DetailPageLayout({ item }: DetailPageLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <DetailPageHeader
        name={item.name}
        category={item.category}
        subCategory={item.subCategory}
      />
    </div>
  );
}
