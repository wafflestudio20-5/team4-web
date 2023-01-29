import { Style } from '../../lib/interface';
import StylePreview from './StylePreview';
import styles from './StyleList.module.scss';

interface StyleListProps {
  styleList: Style[] | null;
  sort: string | undefined;
  setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number | null;
}

export default function StyleList({
  styleList,
  sort,
  setSort,
  pageNum,
  setPageNum,
  totalPages,
}: StyleListProps) {
  return (
    <div className={styles.itemList}>
      <StyleListSort
        sort={sort}
        setSort={setSort}
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
      />
      <StylePreviewList styleList={styleList}></StylePreviewList>
    </div>
  );
}

function StyleListSort({
  setSort,
  sort,
  pageNum,
  setPageNum,
  totalPages,
}: {
  setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
  sort: string | undefined;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number | null;
}) {
  return (
    <div className={styles.sort}>
      <div className={styles.sortline}>
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
