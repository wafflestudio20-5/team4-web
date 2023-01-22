import { Item } from '../../lib/interface';
import ItemPreview from './ItemPreview';
import styles from './ItemList.module.scss';

interface ItemListProps {
  items: Item[] | null;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function ItemList({
  items,
  pageNum,
  setPageNum,
}: ItemListProps) {
  return (
    <div className={styles.itemList}>
      <ItemListSort pageNum={pageNum} setPageNum={setPageNum} />
      <ItemPreviewList items={items}></ItemPreviewList>
    </div>
  );
}

function ItemListSort({
  pageNum,
  setPageNum,
}: {
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className={styles.sort}>
      <div className={styles.sortline}>
        <div className={styles.sortRuleSelected}>무신사 추천순</div>
        <div className={styles.sortRule}>낮은 가격순</div>
        <div className={styles.sortRule}>높은 가격순</div>
        <div className={styles.sortRule}>별점 순</div>
        <div className={styles.sortRule}>할인율 순</div>
        <div className={styles.sortRule}>후기 순</div>
      </div>
      <div className={styles.pageline}>
        <div className={styles.pagenumber}>
          <div
            className={styles.page}
            onClick={() => {
              setPageNum(pageNum - 1);
            }}
          >
            {'<'}
          </div>
          <div
            className={styles.page}
            onClick={() => {
              setPageNum(pageNum + 1);
            }}
          >
            {'>'}
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemPreviewList({ items }: { items: Item[] | null }) {
  return (
    <div className={styles.itemListBox}>
      {items?.map((item) => (
        <ItemPreview key={item.id} item={item} />
      ))}
    </div>
  );
}
