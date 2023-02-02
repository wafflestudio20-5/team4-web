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

  const [index, setIndex] = useState(0);

  const { data: itemsData } = useApiData(
    useApiItemListFetcher(
      type,
      category,
      subCategory,
      query ?? '',
      index,
      DEFAULT_FETCH_AMOUNT,
      sort
    )
  );

  const items = itemsData?.items ?? null;
  const totalPages = itemsData?.totalPages ?? 1;

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
    setIndex(0);
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
        index={index}
        onPageSelect={onPageSelect}
        onSmallJumpBackwards={onSmallJumpBackwards}
        onSmallJumpForwards={onSmallJumpForwards}
        onBigJumpBackwards={onBigJumpBackwards}
        onBigJumpForwards={onBigJumpForwards}
        searchKey={searchKey}
        MAXIMUM_PAGE_INDEX={MAXIMUM_PAGE_INDEX}
      />
    </div>
  );
}
