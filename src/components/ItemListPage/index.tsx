import ItemList from './ItemList';
import ItemListPageHeader from './ItemListPageHeader';
import styles from './index.module.css';
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';
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

  const DEFAULT_FETCH_AMOUNT = 24;
  const [sort, setSort] = useState<string | undefined>();

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
  const searchKey = type === 'search' && query ? query : undefined;

  const { data: itemsData } = useApiData(
    useApiItemListFetcher(
      type,
      category,
      subCategory,
      query ?? '',
      pageNum - 1,
      DEFAULT_FETCH_AMOUNT,
      sort
    )
  );

  const items = itemsData?.items ?? null;
  const totalPages = itemsData?.totalPages ?? null;

  console.log(totalPages);

  const [inputs, setInputs] = useState<string>('');

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputs !== '') onSubmit(e);
  };

  const onSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (inputs !== '') {
      navigate({
        pathname: '/itemlist',
        search: `?${createSearchParams({
          type: 'search',
          q: inputs,
        })}`,
      });
    }
  };

  useEffect(() => {
    setPageNum(1);
  }, [category, subCategory, searchKey]);

  useEffect(() => {
    if (searchKey) {
      setInputs(searchKey);
    } else {
      setInputs('');
    }
  }, [searchKey]);

  return (
    <div className={styles.wrap}>
      <ItemListPageHeader
        category={category}
        subCategory={subCategory}
        searchKey={searchKey}
        getCategorybySubCategory={getCategorybySubCategory}
        navigate={navigate}
        inputs={inputs}
        handleInputs={handleInputs}
        onKeyPress={onKeyPress}
        onSubmit={onSubmit}
      />
      <ItemList
        items={items}
        sort={sort}
        setSort={setSort}
        pageNum={pageNum}
        setPageNum={setPageNum}
      />
    </div>
  );
}
