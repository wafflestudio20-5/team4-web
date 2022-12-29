import styles from './CategorySideBar.module.css';
import {
  Category,
  SubCategory,
  displayCategory,
  displayCategoryinCamelCase,
  displaySubCategory,
} from '../../lib/interface';
import { useState } from 'react';

enum Best {
  best = 'best',
}

type CategoryIncludeBest = Category | Best;

interface CategoryBoxProps {
  category: Category;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<CategoryIncludeBest | null>
  >;
  subcategorys?: SubCategory[];
}

export default function CategorySideBar() {
  const categorys: Category[] = Object.values(Category);
  const subcategorys = Object.values(SubCategory);
  const [titleCategory, setTitleCategory] = useState<string>('품목');
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryIncludeBest | null>(null);
  return (
    <div className={styles.categorySideBar}>
      <div className={styles.select}>
        <div
          className={
            titleCategory === '품목' ? styles.buttonselected : styles.button
          }
          onClick={() => {
            setTitleCategory('품목');
          }}
        >
          품목
        </div>
        <div
          className={
            titleCategory === '브랜드' ? styles.buttonselected : styles.button
          }
          onClick={() => {
            setTitleCategory('브랜드');
          }}
        >
          브랜드
        </div>
      </div>
      {titleCategory === '품목' ? (
        <>
          {selectedCategory === Best.best ? (
            <div className={styles.selectedCategorys}>
              <div
                className={styles.selectedcategoryshead}
                onClick={() => {
                  setSelectedCategory(null);
                }}
              >
                <span>인기</span>
                <span className={styles.categorysEnglish}>Best</span>
              </div>
              <div className={styles.subCategorylist}>
                {subcategorys.map((subcategory) => (
                  <div key={subcategory} className={styles.subcategory}>
                    {displaySubCategory(subcategory)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={styles.categorys}
              onClick={() => setSelectedCategory(Best.best)}
            >
              <span>인기</span>
              <span className={styles.categorysEnglish}>Best</span>
            </div>
          )}
          {categorys.map((category) =>
            selectedCategory === category ? (
              <SelectedCategoryBox
                key={category}
                category={category}
                setSelectedCategory={setSelectedCategory}
                subcategorys={subcategorys}
              ></SelectedCategoryBox>
            ) : (
              <CategoryBox
                key={category}
                category={category}
                setSelectedCategory={setSelectedCategory}
              ></CategoryBox>
            )
          )}
        </>
      ) : null}
    </div>
  );
}

function CategoryBox({ category, setSelectedCategory }: CategoryBoxProps) {
  return (
    <div
      className={styles.categorys}
      onClick={() => {
        setSelectedCategory(category);
      }}
    >
      <>
        <span>{displayCategory(category)}</span>
        <span className={styles.categorysEnglish}>
          {displayCategoryinCamelCase(category)}
        </span>
      </>
    </div>
  );
}

function SelectedCategoryBox({
  category,
  setSelectedCategory,
  subcategorys,
}: CategoryBoxProps) {
  return (
    <div className={styles.selectedCategorys}>
      <div
        className={styles.selectedcategoryshead}
        onClick={() => {
          setSelectedCategory(null);
        }}
      >
        <span>{displayCategory(category)}</span>
        <span className={styles.categorysEnglish}>
          {displayCategoryinCamelCase(category)}
        </span>
      </div>
      <div className={styles.subCategorylist}>
        {subcategorys?.map((subcategory) => (
          <div key={subcategory} className={styles.subcategory}>
            {displaySubCategory(subcategory)}
          </div>
        ))}
      </div>
    </div>
  );
}
