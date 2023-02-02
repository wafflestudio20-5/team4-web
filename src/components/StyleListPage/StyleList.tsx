import { Style } from '../../lib/interface';
import StylePreview from './StylePreview';
import styles from './StyleList.module.scss';

interface StyleListProps {
  styleList: Style[] | null;
  sort: string | undefined;
  setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  index: number;
  onPageSelect: (idx: number) => void;
  onSmallJumpBackwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSmallJumpForwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBigJumpBackwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBigJumpForwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  MAXIMUM_PAGE_INDEX: number;
}

export default function StyleList({
  styleList,
  sort,
  setSort,
  index,
  onPageSelect,
  onSmallJumpBackwards,
  onSmallJumpForwards,
  onBigJumpBackwards,
  onBigJumpForwards,
  MAXIMUM_PAGE_INDEX,
}: StyleListProps) {
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
      <StyleListSort
        sort={sort}
        setSort={setSort}
        pageIndex={index}
        onPageSelect={onPageSelect}
        onSmallJumpBackwards={onSmallJumpBackwards}
        onSmallJumpForwards={onSmallJumpForwards}
        onBigJumpBackwards={onBigJumpBackwards}
        onBigJumpForwards={onBigJumpForwards}
        MAXIMUM_PAGE_INDEX={MAXIMUM_PAGE_INDEX}
        generatePageArray={generatePageArray}
      />
      <StylePreviewList styleList={styleList}></StylePreviewList>
    </div>
  );
}

function StyleListSort({
  setSort,
  sort,
  pageIndex,
  onPageSelect,
  onSmallJumpBackwards,
  onSmallJumpForwards,
  onBigJumpBackwards,
  onBigJumpForwards,
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
  MAXIMUM_PAGE_INDEX: number;
  generatePageArray(pageIndex: number, maxPageIndex: number): number[];
}) {
  const pageArray = generatePageArray(pageIndex, MAXIMUM_PAGE_INDEX);

  return (
    <div className={styles.sort}>
      <div className={styles.sortline}>
        <div className={styles.sortChoice}>
          <div className={sort === 'recent' || !sort ? styles.select : ''}>
            <span
              onClick={() => {
                setSort('recent');
              }}
            >
              최신순
            </span>
          </div>
          <div className={sort === 'like' ? styles.select : ''}>
            <span
              onClick={() => {
                setSort('like');
              }}
            >
              좋아요순
            </span>
          </div>
        </div>
        <div className={styles.pageline}>
          <div className={styles.page_index_box}>
            {MAXIMUM_PAGE_INDEX + 1} 페이지 중 {pageIndex + 1} 페이지
          </div>
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

function StylePreviewList({ styleList }: { styleList: Style[] | null }) {
  return (
    <>
      {styleList?.length !== 0 || !styleList ? (
        <div className={styles.itemListBox}>
          {styleList?.map((styleSingle) => (
            <StylePreview key={styleSingle.id} styleSingle={styleSingle} />
          ))}
        </div>
      ) : (
        <div className={styles.itemNullBox}>
          <div>스타일이 없습니다.</div>
        </div>
      )}
    </>
  );
}
