import styles from './CategorySideBar.module.css';
import {
  Category,
  displayCategory,
  displayCategoryinCamelCase,
} from '../../lib/interface';

export default function CategorySideBar() {
  const categorys = Object.values(Category);

  return (
    <div className={styles.categorySideBar}>
      <div className={styles.select}>
        <div className={styles.button}>품목</div>
        <div className={styles.button}>브랜드</div>
      </div>
      <div className={styles.categorys}>
        <span>인기</span>
        <span className={styles.categorysEnglish}>Best</span>
      </div>
      {categorys.map((category) => (
        <div className={styles.categorys}>
          <span>{displayCategory(category)}</span>
          <span className={styles.categorysEnglish}>
            {displayCategoryinCamelCase(category)}
          </span>
        </div>
      ))}
    </div>
  );
}
