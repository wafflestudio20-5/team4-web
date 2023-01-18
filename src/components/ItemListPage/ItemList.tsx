import { useState } from 'react';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import { Item, Category, displayCategory } from '../../lib/interface';
import ItemPreview from './ItemPreview';
import styles from './ItemList.module.scss';

interface ItemPreviewListProps {
  items: Item[] | null;
}

interface ItemListCategoryProps {
  categorys: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

export default function ItemList() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data: itemsData } = useApiData(
    useApiItemListFetcher(selectedCategory, undefined, 20, 0)
  );
  const items = itemsData?.items ?? null;
  const categorys = Object.values(Category);

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
