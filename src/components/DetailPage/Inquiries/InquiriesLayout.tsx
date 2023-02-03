import React from 'react';
import InquiryBox from '../Inquiry';
import { Inquiry } from '../../../lib/interface';
import styles from './InquiriesLayout.module.scss';

interface InquiriesLayoutProps {
  inquiries: Inquiry[] | null;
  pageIndex: number;
  maxPageIndex: number;
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

export default function InquiriesLayout({
  inquiries,
  pageIndex,
  maxPageIndex,
  onPageSelect,
  onSmallJumpBackwards,
  onSmallJumpForwards,
  onBigJumpBackwards,
  onBigJumpForwards,
}: InquiriesLayoutProps) {
  const count = inquiries ? inquiries.length : 0;
  const pageArray = generatePageArray(pageIndex, maxPageIndex);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        Q & A
        <span className={styles.small_title}>
          상품 문의 <strong>{`(총 ${count}건)`}</strong>
        </span>
      </div>
      {count > 0 ? (
        <div className={styles.body}>
          <div className={styles.inquiry_list}>
            <div className={`${styles.inquiry_grid} ${styles.inquiry_header}`}>
              <span>번호</span>
              <span>답변여부</span>
              <span>구분</span>
              <span>내용</span>
              <span>작성자</span>
              <span>등록일자</span>
            </div>
            <ul>
              {inquiries?.map((inquiry, idx) => (
                <li key={idx}>
                  <InquiryBox inquiry={inquiry} />
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
        <div className={styles.empty_body} />
      )}
    </div>
  );
}
