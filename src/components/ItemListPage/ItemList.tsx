import { useEffect, useState } from 'react';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import {
  Item,
  Category,
  SubCategory,
  displayCategory,
  stringtoEnum,
} from '../../lib/interface';
import ItemPreview from './ItemPreview';
import styles from './ItemList.module.scss';
import { useParams } from 'react-router-dom';

interface ItemPreviewListProps {
  items: Item[] | null;
}

interface ItemListCategoryProps {
  categorys: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

export default function ItemList() {
  const [paramCategory, setparamCategory] = useState<{
    category: Category | null;
    subCategory: SubCategory | undefined;
  }>({ category: null, subCategory: undefined });

  const param = useParams();
  const paramEnum = stringtoEnum(param.category);

  // useEffect(() => {
  //   if (param.category && param.category in Category) {
  //     console.log('서브카테고리');
  //   } else if (param.category && param.category in SubCategory) {
  //     console.log('서브카테고리');
  //   } else {
  //     console.log('전체');
  //   }
  // }, []);

  const { data: itemsData } = useApiData(
    useApiItemListFetcher(
      paramCategory.category,
      paramCategory.subCategory,
      20,
      0
    )
  );
  const items = itemsData?.items ?? null;

  return (
    <div className={styles.itemList}>
      {/* <ItemListCategory
        selectedCategory={selectedCategory}
        categorys={categorys}
        setSelectedCategory={setSelectedCategory}
      ></ItemListCategory> */}
      <ItemPreviewList items={items}></ItemPreviewList>
      {/* <ItemListPagenation /> */}
    </div>
  );
}

function ItemListCategory({
  categorys,
  selectedCategory,
  setSelectedCategory,
}: ItemListCategoryProps) {
  return (
    <div className={styles.itemListCategory}>
      <div className={styles.title}>
        <div>실시간 랭킹</div>
      </div>
      <div className={styles.categorycontent}>
        <div>
          <button
            key={null}
            className={
              selectedCategory === null ? styles.buttonselected : styles.button
            }
            onClick={() => setSelectedCategory(null)}
          >
            전체
          </button>
        </div>
        {categorys.map((category) => (
          <div key={category}>
            <button
              className={
                selectedCategory === category
                  ? styles.buttonselected
                  : styles.button
              }
              onClick={() => setSelectedCategory(category)}
            >
              {displayCategory(category)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemPreviewList({ items }: ItemPreviewListProps) {
  return (
    <div className={styles.itemListBox}>
      {items?.map((item) => (
        <ItemPreview key={item.id} item={item}></ItemPreview>
      ))}
    </div>
  );
}
