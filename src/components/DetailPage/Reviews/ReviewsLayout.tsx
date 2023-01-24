import React from 'react';
import ReviewBox from './ReviewBox';
import styles from './ReviewsLayout.module.scss';

interface ReviewsLayoutProps {
  count: number;
  rating: number;
}

export default function ReviewsLayout({ count, rating }: ReviewsLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{`구매후기(${count})`}</div>
      <div className={styles.body}>
        <div className={styles.review_list_wrapper}>
          <ReviewBox />
        </div>
      </div>
    </div>
  );
}
