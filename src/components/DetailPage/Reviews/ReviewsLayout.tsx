import React from 'react';
import ReviewBox from '../Review';
import { DEFAULT_REVIEWS_COUNT } from '.';
import { Review } from '../../../lib/interface';
import styles from './ReviewsLayout.module.scss';

interface ReviewsLayoutProps {
  count: number;
  reviews: Review[] | null;
  pageIndex: number;
  onPageSelect: (idx: number) => void;
  onSmallJumpBackwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSmallJumpForwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBigJumpBackwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBigJumpForwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function generatePageArray(pageIndex: number, maxPageIndex: number): number[] {
  const array = [];
  const base = Math.floor(pageIndex / 5);
  var idx = 0;
  while (idx < 5 && base * 5 + idx <= maxPageIndex) {
    array.push(base * 5 + idx);
    idx++;
  }
  return array;
}

export default function ReviewsLayout({
  count,
  reviews,
  pageIndex,
  onPageSelect,
  onSmallJumpBackwards,
  onSmallJumpForwards,
  onBigJumpBackwards,
  onBigJumpForwards,
}: ReviewsLayoutProps) {
  const maxPageIndex = Math.ceil(count / DEFAULT_REVIEWS_COUNT) - 1;
  const pageArray = generatePageArray(pageIndex, maxPageIndex);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{`구매후기(${count})`}</div>
      {count > 0 ? (
        <div className={styles.body}>
          <div className={styles.review_list_wrapper}>
            <ul className={styles.review_list}>
              {reviews?.map((review, idx) => (
                <li key={idx}>
                  <ReviewBox review={review} />
                </li>
              ))}
            </ul>
            <div className={styles.page_index_box}>
              {maxPageIndex + 1} 페이지 중 {pageIndex + 1} 페이지
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
      ) : (
        <div className={styles.empty_body}></div>
      )}
    </div>
  );
}
