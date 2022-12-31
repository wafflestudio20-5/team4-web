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
  subcategorys?: SubCategory[];
}

export default function CategorySideBar() {
  const categorys: Category[] = Object.values(Category);
  const subcategorys = Object.values(SubCategory);
  const [titleCategory, setTitleCategory] = useState<string>('품목');
  const [selectedCategory, setSelectedCategory] = useState<{
    present: CategoryIncludeBest | null;
    before: CategoryIncludeBest | null;
  }>({ present: null, before: null });
  console.log(selectedCategory);

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
          {selectedCategory.present === Best.best ? (
            <>
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
            </>
          ) : selectedCategory.before === Best.best ? (
            <div className={styles.categorys}>
              <div
                className={styles.closedcategoryshead}
                onClick={() => {
                  setSelectedCategory({
                    present: Best.best,
                    before: selectedCategory.present,
                  });
                }}
              >
                <span> 인기</span>
                <span className={styles.categorysEnglish}>Best</span>
              </div>
              <div className={styles.closedsubCategorylist}>
                {subcategorys?.map((subcategory) => (
                  <div key={subcategory} className={styles.closedsubcategory}>
                    {displaySubCategory(subcategory)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.categorys}>
              <div
                className={styles.categoryshead}
                onClick={() => {
                  setSelectedCategory({
                    present: Best.best,
                    before: selectedCategory.present,
                  });
                }}
              >
                <span>인기</span>
                <span className={styles.categorysEnglish}>Best</span>
              </div>
            </div>
          )}
          {categorys.map((category) =>
            selectedCategory.present === category ? (
              <SelectedCategoryBox
                key={category}
                category={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                subcategorys={subcategorys}
              ></SelectedCategoryBox>
            ) : selectedCategory.before === category ? (
              <CloseCategoryBox
                key={category}
                category={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                subcategorys={subcategorys}
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
      ) : null}
    </div>
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
        <span>{displayCategory(category)}</span>
        <span className={styles.categorysEnglish}>
          {displayCategoryinCamelCase(category)}
        </span>
      </div>
    </div>
  );
}

function CloseCategoryBox({
  category,
  selectedCategory,
  setSelectedCategory,
  subcategorys,
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
        <span>{displayCategory(category)}</span>
        <span className={styles.categorysEnglish}>
          {displayCategoryinCamelCase(category)}
        </span>
      </div>
      <div className={styles.closedsubCategorylist}>
        {subcategorys?.map((subcategory) => (
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
  subcategorys,
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
