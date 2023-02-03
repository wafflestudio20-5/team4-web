import { Item } from '../../lib/interface';
import ItemPreview from './ItemPreview';
import styles from './ItemList.module.scss';

interface ItemListProps {
  items: Item[] | null;
  sort: string | undefined;
  setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  index: number;
  onPageSelect: (idx: number) => void;
  onSmallJumpBackwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSmallJumpForwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBigJumpBackwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBigJumpForwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  searchKey: string | undefined;
  MAXIMUM_PAGE_INDEX: number;
}

export default function ItemList({
  items,
  sort,
  setSort,
  index,
  onPageSelect,
  onSmallJumpBackwards,
  onSmallJumpForwards,
  onBigJumpBackwards,
  onBigJumpForwards,
  searchKey,
  MAXIMUM_PAGE_INDEX,
}: ItemListProps) {
  function generatePageArray(
    pageIndex: number,
    maxPageIndex: number
  ): number[] {
    const array = [];
    const base = Math.floor(pageIndex / 5);
    var idx = 0;
    while (idx < 5 && base * 5 + idx <= maxPageIndex) {
      array.push(base * 5 + idx);
      idx++;
    }
    return array;
  }

  return (
    <div className={styles.itemList}>
      <ItemListSort
        sort={sort}
        setSort={setSort}
        pageIndex={index}
        onPageSelect={onPageSelect}
        onSmallJumpBackwards={onSmallJumpBackwards}
        onSmallJumpForwards={onSmallJumpForwards}
        onBigJumpBackwards={onBigJumpBackwards}
        onBigJumpForwards={onBigJumpForwards}
        searchKey={searchKey}
        MAXIMUM_PAGE_INDEX={MAXIMUM_PAGE_INDEX}
        generatePageArray={generatePageArray}
      />
      <ItemPreviewList items={items}></ItemPreviewList>
    </div>
  );
}

function ItemListSort({
  setSort,
  sort,
  pageIndex,
  onPageSelect,
  onSmallJumpBackwards,
  onSmallJumpForwards,
  onBigJumpBackwards,
  onBigJumpForwards,
  searchKey,
  generatePageArray,
  MAXIMUM_PAGE_INDEX,
}: {
  setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  sort: string | undefined;
  pageIndex: number;
  onPageSelect: (idx: number) => void;
  onSmallJumpBackwards: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSmallJumpForwards: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onBigJumpBackwards: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onBigJumpForwards: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  searchKey: string | undefined;
  MAXIMUM_PAGE_INDEX: number;
  generatePageArray(pageIndex: number, maxPageIndex: number): number[];
}) {
  const pageArray = generatePageArray(pageIndex, MAXIMUM_PAGE_INDEX);

  return (
    <div className={styles.sort}>
      <div className={styles.sortline}>
        {!searchKey ? (
          <div className={styles.sortChoice}>
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
        ) : (
          <div className={styles.sortChoice}></div>
        )}
        <div className={styles.pageline}>
          {MAXIMUM_PAGE_INDEX !== -1 && (
            <div className={styles.page_index_box}>
              {MAXIMUM_PAGE_INDEX + 1} 페이지 중 {pageIndex + 1} 페이지
            </div>
          )}
          <div className={styles.pagenation_wrapper}>
            <div className={styles.pagenation}>
              <button onClick={onBigJumpBackwards}>{'<<'}</button>
              <button onClick={onSmallJumpBackwards}>{'<'}</button>
              {pageArray.map((pageIdx) => (
                <button
                  key={pageIdx}
                  className={`${pageIdx === pageIndex && styles.selected}`}
                  onClick={() => onPageSelect(pageIdx)}
                >
                  {pageIdx + 1}
                </button>
              ))}
              <button onClick={onSmallJumpForwards}>{'>'}</button>
              <button onClick={onBigJumpForwards}>{'>>'}</button>
            </div>
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
