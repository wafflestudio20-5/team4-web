import ItemList from './ItemList';
import ItemListPageHeader from './ItemListPageHeader';
import styles from './index.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import {
  Category,
  SubCategory,
  getCategorybySubCategory,
} from '../../lib/interface';
import { useEffect } from 'react';

export default function ItemListPage() {
  const navigate = useNavigate();

  const [pageNum, setPageNum] = useState<number>(1);

  const DEFAULT_FETCH_AMOUNT = 18;

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
      pageNum - 1,
      DEFAULT_FETCH_AMOUNT
    )
  );

  const items = itemsData?.items ?? null;

  useEffect(() => {
    setPageNum(1);
  }, [category, subCategory]);

  return (
    <div className={styles.wrap}>
      <ItemListPageHeader
        category={category}
        subCategory={subCategory}
        getCategorybySubCategory={getCategorybySubCategory}
        navigate={navigate}
      />
      <ItemList items={items} pageNum={pageNum} setPageNum={setPageNum} />
    </div>
  );
}
