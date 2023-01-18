import styles from './SideBarCategory.module.scss';

import {
  displayCategoryIncludeBest,
  displaySubCategory,
  CategoryIncludeBest,
  SubCategoryInCategory,
} from '../../lib/interface';

interface SideBarCategoryProps {
  categorys: CategoryIncludeBest[];
  selectedCategory: {
    present: CategoryIncludeBest | null;
    before: CategoryIncludeBest | null;
  };
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<{
      present: CategoryIncludeBest | null;
      before: CategoryIncludeBest | null;
    }>
  >;
}

interface CategoryBoxProps {
  category: CategoryIncludeBest;
  selectedCategory: {
    present: CategoryIncludeBest | null;
    before: CategoryIncludeBest | null;
  };
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<{
      present: CategoryIncludeBest | null;
      before: CategoryIncludeBest | null;
    }>
  >;
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function SideBarCategory({
  categorys,
  selectedCategory,
  setSelectedCategory,
}: SideBarCategoryProps) {
  return (
    <>
      {categorys.map((category) =>
        selectedCategory.present === category ? (
          <SelectedCategoryBox
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          ></SelectedCategoryBox>
        ) : selectedCategory.before === category ? (
          <CloseCategoryBox
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          ></CloseCategoryBox>
        ) : (
          <CategoryBox
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          ></CategoryBox>
        )
      )}
    </>
  );
}

function CategoryBox({
  category,
  selectedCategory,
  setSelectedCategory,
}: CategoryBoxProps) {
  return (
    <div className={styles.categorys}>
      <div
        className={styles.categoryshead}
        onClick={() => {
          setSelectedCategory({
            present: category,
            before: selectedCategory.present,
          });
        }}
      >
        <span>{displayCategoryIncludeBest(category)}</span>
        <span className={styles.categorysEnglish}>{capitalize(category)}</span>
      </div>
    </div>
  );
}

function CloseCategoryBox({
  category,
  selectedCategory,
  setSelectedCategory,
}: CategoryBoxProps) {
  return (
    <div className={styles.categorys}>
      <div
        className={styles.closedcategoryshead}
        onClick={() => {
          setSelectedCategory({
            present: category,
            before: selectedCategory.present,
          });
        }}
      >
        <span>{displayCategoryIncludeBest(category)}</span>
        <span className={styles.categorysEnglish}>{capitalize(category)}</span>
      </div>
      <div className={styles.closedsubCategorylist}>
        {SubCategoryInCategory(category)?.map((subcategory) => (
          <div key={subcategory} className={styles.closedsubcategory}>
            {displaySubCategory(subcategory)}
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectedCategoryBox({
  category,
  selectedCategory,
  setSelectedCategory,
}: CategoryBoxProps) {
  return (
    <div className={styles.selectedCategorys}>
      <div
        className={styles.selectedcategoryshead}
        onClick={() => {
          setSelectedCategory({
            present: null,
            before: selectedCategory.present,
          });
        }}
      >
        <span>{displayCategoryIncludeBest(category)}</span>
        <span className={styles.categorysEnglish}>{capitalize(category)}</span>
      </div>
      <div className={styles.subCategorylist}>
        {SubCategoryInCategory(category)?.map((subcategory) => (
          <div key={subcategory} className={styles.subcategory}>
            {displaySubCategory(subcategory)}
          </div>
        ))}
      </div>
    </div>
  );
}
