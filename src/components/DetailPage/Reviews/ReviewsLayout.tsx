import React from 'react';
import styles from './ReviewsLayout.module.scss';

interface ReviewsLayoutProps {
  count: number;
  rating: number;
}

export default function ReviewsLayout({ count, rating }: ReviewsLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{`구매후기(${count})`}</div>
      <div></div>
    </div>
  );
}
