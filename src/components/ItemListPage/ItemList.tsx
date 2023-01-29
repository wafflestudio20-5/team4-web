import { Item } from '../../lib/interface';
import ItemPreview from './ItemPreview';
import styles from './ItemList.module.scss';

interface ItemListProps {
  items: Item[] | null;
  sort: string | undefined;
  setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  searchKey: string | undefined;
  totalPages: number | null;
}

export default function ItemList({
  items,
  sort,
  setSort,
  pageNum,
  setPageNum,
  searchKey,
  totalPages,
}: ItemListProps) {
  return (
    <div className={styles.itemList}>
      <ItemListSort
        sort={sort}
        setSort={setSort}
        pageNum={pageNum}
        setPageNum={setPageNum}
        searchKey={searchKey}
        totalPages={totalPages}
      />
      <ItemPreviewList items={items}></ItemPreviewList>
    </div>
  );
}

function ItemListSort({
  setSort,
  sort,
  pageNum,
  setPageNum,
  searchKey,
  totalPages,
}: {
  setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  sort: string | undefined;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  searchKey: string | undefined;
  totalPages: number | null;
}) {
  return (
    <div className={styles.sort}>
      {!searchKey && (
        <div className={styles.sortline}>
          <div className={!sort ? styles.select : ''}>
            <span
              onClick={() => {
                setSort(undefined);
              }}
            >
              무신사 추천순
            </span>
          </div>
          <div className={sort === 'price' ? styles.select : ''}>
            <span
              onClick={() => {
                setSort('price');
              }}
            >
              낮은 가격순
            </span>
          </div>
          <div className={sort === 'priceReverse' ? styles.select : ''}>
            <span
              onClick={() => {
                setSort('priceReverse');
              }}
            >
              높은 가격순
            </span>
          </div>
          <div className={sort === 'rating' ? styles.select : ''}>
            <span
              onClick={() => {
                setSort('rating');
              }}
            >
              별점 순
            </span>
          </div>
          <div className={sort === 'sale' ? styles.select : ''}>
            <span
              onClick={() => {
                setSort('sale');
              }}
            >
              할인율 순
            </span>
          </div>
        </div>
      )}
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
    <>
      {items?.length !== 0 || !items ? (
        <div className={styles.itemListBox}>
          {items?.map((item) => (
            <ItemPreview key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className={styles.itemNullBox}>
          <div>조건에 맞는 상품이 없습니다.</div>
        </div>
      )}
    </>
  );
}
