import { useSearchParams } from 'react-router-dom';
import ItemPreview from './ItemPreview';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import { Item, Category, SubCategory } from '../../lib/interface';
import styles from './ItemList.module.scss';

const DEFAULT_FETCH_AMOUNT = 20;

export default function ItemList() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get('type');
  const query = searchParams.get('q');

  const category =
    type === 'category' && query
      ? Category[query as keyof typeof Category]
      : undefined;
  const subCategory =
    type === 'subcategory' && query
      ? SubCategory[query as keyof typeof SubCategory]
      : undefined;

  const { data: itemsData } = useApiData(
    useApiItemListFetcher(
      type,
      category,
      subCategory,
      query ?? '',
      0,
      DEFAULT_FETCH_AMOUNT
    )
  );

  const items = itemsData?.items ?? null;

  return (
    <div className={styles.itemList}>
      <ItemPreviewList items={items} />
      {/* <ItemListPagenation /> */}
    </div>
  );
}

interface ItemPreviewListProps {
  items: Item[] | null;
}

function ItemPreviewList({ items }: ItemPreviewListProps) {
  return (
    <div className={styles.itemListBox}>
      {items?.map((item) => (
        <ItemPreview key={item.id} item={item} />
      ))}
    </div>
  );
}
