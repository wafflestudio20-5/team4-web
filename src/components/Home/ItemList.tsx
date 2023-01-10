import { useState } from 'react';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import { Item, Category, displayCategory } from '../../lib/interface';
import ItemPreview from './ItemPreview';
import styles from './ItemList.module.css';

interface ItemPreviewListProps {
  items: Item[] | null;
}

interface ItemListCategoryProps {
  categorys: Category[];
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
}

const ITEMS_FETCH_AMOUNT = 16;

export default function ItemList() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data: itemsData } = useApiData(
    useApiItemListFetcher({
      count: ITEMS_FETCH_AMOUNT,
      category: selectedCategory ?? undefined,
    })
  );
  const items = itemsData?.items ?? null;
  const categorys = Object.values(Category);

  return (
    <div className={styles.itemList}>
      <ItemListCategory
        selectedCategory={selectedCategory}
        categorys={categorys}
        setSelectedCategory={setSelectedCategory}
      ></ItemListCategory>
      <div className={styles.itemListBox}>
        <ItemPreviewList items={items}></ItemPreviewList>
      </div>
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
      <div className={styles.title}>실시간 랭킹</div>
      <div className={styles.categorycontent}>
        <div className={styles.subtitle}>상품</div>
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
    <>
      {items?.map((item, idx) => (
        <ItemPreview key={item.id} item={item} idx={idx}></ItemPreview>
      ))}
    </>
  );
}
