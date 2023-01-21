import { useState } from 'react';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import { Item, Category, displayCategory } from '../../lib/interface';
import ItemPreview from './ItemPreview';
import styles from './ItemList.module.scss';
import { useNavigate, createSearchParams } from 'react-router-dom';

interface ItemPreviewListProps {
  items: Item[] | null;
}

interface ItemListCategoryProps {
  categorys: Category[];
  selectedCategory: Category | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Category | undefined>
  >;
}

export default function ItemList() {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const { data: itemsData } = useApiData(
    useApiItemListFetcher(
      'category',
      selectedCategory,
      undefined,
      undefined,
      0,
      10
    )
  );
  const items = itemsData?.items ?? null;
  const categorys = Object.values(Category);
  const navigate = useNavigate();
  return (
    <div className={styles.itemList}>
      <ItemListCategory
        selectedCategory={selectedCategory}
        categorys={categorys}
        setSelectedCategory={setSelectedCategory}
      ></ItemListCategory>
      <ItemPreviewList items={items}></ItemPreviewList>
      <div className={styles.moreView}>
        <button
          onClick={() => {
            navigate({
              pathname: '/itemlist',
              search: `?${createSearchParams({
                type: 'category',
                q: selectedCategory ?? 'all',
              })}`,
            });
          }}
        >
          더 보기 {' >'}
        </button>
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
            onClick={() => setSelectedCategory(undefined)}
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
