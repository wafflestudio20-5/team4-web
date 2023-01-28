import { useState, useEffect } from 'react';
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import ItemList from './ItemList';
import ItemListPageHeader from './ItemListPageHeader';
import { useApiData, useApiItemListFetcher } from '../../lib/api';
import {
  Category,
  SubCategory,
  getCategorybySubCategory,
} from '../../lib/interface';
import styles from './index.module.css';

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

  useEffect(() => {
    if (type === 'search' && (!searchKey || searchKey.trim().length === 0)) {
      toast('유효하지 않은 검색입니다.');
      navigate(-1);
    }
  }, [type, searchKey, navigate]);

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
        searchKey={searchKey}
        totalPages={totalPages}
      />
    </div>
  );
}
