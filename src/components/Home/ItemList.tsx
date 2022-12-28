import styles from './itemList.module.css';
import { Item, Category, displayCategory } from '../../lib/interface';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import ItemPreview from './itemPreview';

interface ItemPreviewListProps {
  items: Item[] | null;
}

interface ItemListCategoryProps {
  categorys: Category[];
}

export default function ItemList() {
  const { data: itemsData } = useApiData(useApiItemListFetcher(null));
  const items = itemsData ?? null;
  const categorys = Object.values(Category);

  return (
    <div className={styles.itemList}>
      <ItemListCategory categorys={categorys}></ItemListCategory>
      <div className={styles.itemListBox}>
        <ItemPreviewList items={items}></ItemPreviewList>
      </div>
    </div>
  );
}

export function ItemListCategory({ categorys }: ItemListCategoryProps) {
  return (
    <div className={styles.itemListCategory}>
      {categorys.map((category) => (
        <div key={category}>
          <button>{displayCategory(category)}</button>
        </div>
      ))}
    </div>
  );
}

export function ItemPreviewList({ items }: ItemPreviewListProps) {
  return (
    <>
      {items?.map((item, idx) => (
        <ItemPreview item={item} idx={idx}></ItemPreview>
      ))}
    </>
  );
}
