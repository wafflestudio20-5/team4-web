import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyleList from './StyleList';
import StyleListPageHeader from './StylelistPageHeader';
import { useApiData, useApiStyleListFetcher } from '../../lib/api';
import styles from './index.module.css';

export default function ItemListPage() {
  const navigate = useNavigate();

  const [pageNum, setPageNum] = useState<number>(1);

  const [sort, setSort] = useState<string | undefined>();

  const { data: styleData } = useApiData(useApiStyleListFetcher(0, 24, sort));
  const styleList = styleData?.styles ?? null;
  const totalPages = styleData?.totalPages ?? null;

  return (
    <div className={styles.wrap}>
      <StyleListPageHeader navigate={navigate} />
      <StyleList
        styleList={styleList}
        sort={sort}
        setSort={setSort}
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
      />
    </div>
  );
}
