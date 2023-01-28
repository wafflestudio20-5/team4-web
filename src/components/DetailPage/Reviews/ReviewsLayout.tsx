import React from 'react';
import ReviewBox from '../Review';
import { Review } from '../../../lib/interface';
import styles from './ReviewsLayout.module.scss';

interface ReviewsLayoutProps {
  count: number;
  reviews: Review[] | null;
  maxPageIdx: number;
  onPageChange: (idx: number) => void;
}

export default function ReviewsLayout({
  count,
  reviews,
  maxPageIdx,
  onPageChange,
}: ReviewsLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{`구매후기(${count})`}</div>
      <div className={styles.body}>
        <ul className={styles.review_list_wrapper}>
          {reviews?.map((review, idx) => (
            <li key={idx}>
              <ReviewBox review={review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
