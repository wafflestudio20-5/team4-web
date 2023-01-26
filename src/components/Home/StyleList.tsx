import { useState } from 'react';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import { Item, Category, displayCategory } from '../../lib/interface';
import ItemPreview from './ItemPreview';
import styles from './StyleList.module.scss';
import { useNavigate, createSearchParams } from 'react-router-dom';

interface StylePreviewListProps {
  items: Item[] | null;
}

export default function StyleList() {
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
      10,
      undefined
    )
  );
  const items = itemsData?.items ?? null;
  const categorys = Object.values(Category);
  const navigate = useNavigate();
  return (
    <div className={styles.itemList}>
      <div className={styles.itemListCategory}>
        <div className={styles.title}>
          <div>스타일</div>
        </div>
      </div>
      <StylePreviewList items={items}></StylePreviewList>
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

function StylePreviewList({ items }: StylePreviewListProps) {
  return (
    <div className={styles.itemListBox}>
      {items?.map((item) => (
        <ItemPreview key={item.id} item={item}></ItemPreview>
      ))}
    </div>
  );
}
