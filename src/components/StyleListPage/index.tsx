import { useState } from 'react';
import StyleList from './StyleList';
import StyleListPageHeader from './StylelistPageHeader';
import { useApiData, useApiStyleListFetcher } from '../../lib/api';
import styles from './index.module.css';

export default function ItemListPage() {
  const [index, setIndex] = useState(0);

  const [sort, setSort] = useState<string | undefined>();

  const { data: styleData } = useApiData(
    useApiStyleListFetcher(index, 24, sort)
  );
  const styleList = styleData?.styles ?? null;
  const totalPages = styleData?.totalPages ?? 1;

  const MAXIMUM_PAGE_INDEX = totalPages - 1;

  const onPageSelect = (idx: number) => {
    setIndex(idx);
  };

  const onSmallJumpBackwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (0 < index) setIndex(index - 1);
  };

  const onSmallJumpForwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (index < MAXIMUM_PAGE_INDEX) setIndex(index + 1);
  };

  const onBigJumpBackwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bigIndex = Math.floor(index / 5);
    if (0 < bigIndex) setIndex(bigIndex * 5 - 1);
  };

  const onBigJumpForwards = (e: React.MouseEvent<HTMLButtonElement>) => {
    const bigIndex = Math.floor(index / 5);
    const maximumBigIndex = Math.floor(MAXIMUM_PAGE_INDEX / 5);
    if (bigIndex < maximumBigIndex) setIndex((bigIndex + 1) * 5);
  };

  return (
    <div className={styles.wrap}>
      <StyleListPageHeader />
      <StyleList
        styleList={styleList}
        sort={sort}
        setSort={setSort}
        index={index}
        onPageSelect={onPageSelect}
        onSmallJumpBackwards={onSmallJumpBackwards}
        onSmallJumpForwards={onSmallJumpForwards}
        onBigJumpBackwards={onBigJumpBackwards}
        onBigJumpForwards={onBigJumpForwards}
        MAXIMUM_PAGE_INDEX={MAXIMUM_PAGE_INDEX}
      />
    </div>
  );
}
