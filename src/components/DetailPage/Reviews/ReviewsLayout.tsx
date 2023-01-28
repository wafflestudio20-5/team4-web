import React from 'react';
import ReviewBox from './ReviewBox';
import { Review } from '../../../lib/interface';
import styles from './ReviewsLayout.module.scss';

interface ReviewsLayoutProps {
  count: number;
  reviews: Review[] | null;
  maxPageIdx: number;
  accessToken: string | null;
  onPageChange: (idx: number) => void;
}

export default function ReviewsLayout({
  count,
  accessToken,
}: ReviewsLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{`구매후기(${count})`}</div>
      <div className={styles.body}>
        <div className={styles.review_list_wrapper}>
          <ReviewBox accessToken={accessToken} />
        </div>
      </div>
    </div>
  );
}
