import { Inquiry } from '../../../lib/interface';
import { formatInquiryType } from '../../../lib/formatters/inquiryFormatter';
import { formatDate2 } from '../../../lib/formatters/dateTimeFormatter';
import styles from './InquiryBoxLayout.module.scss';
import React from 'react';

interface InquiryBoxLayoutProps {
  inquiry: Inquiry;
  verbose: boolean;
  onSwitch: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export default function InquiryBoxLayout({
  inquiry,
  verbose,
  onSwitch,
}: InquiryBoxLayoutProps) {
  return (
    <>
      <div className={styles.inquiry_grid}>
        <span className={styles.inquiry_number}>{inquiry.id}</span>
        <span className={styles.inquiry_status}>
          {inquiry.isAnswered ? '답변완료' : '답변예정'}
        </span>
        <span className={styles.inquiry_type}>
          {formatInquiryType(inquiry.type)}
        </span>
        <span onClick={onSwitch} className={styles.inquiry_title}>
          {inquiry.isSecret ? '상품 관련 문의입니다. ' : inquiry.title}
          {inquiry.isSecret && <span className={styles.key} />}
        </span>
        <span className={styles.inquiry_writer}>{inquiry.user.nickname}</span>
        <span className={styles.inquiry_created_date}>
          {formatDate2(inquiry.createdDateTime)}
        </span>
      </div>
      {verbose && (
        <>
          <div className={styles.inquiry_block} style={{ fontWeight: 700 }}>
            <span>{inquiry.item.name}</span>
          </div>
          <div className={styles.inquiry_block}>
            <span>{inquiry.content}</span>
          </div>
          {inquiry.comment && (
            <div
              className={styles.inquiry_block}
              style={{ background: '#f3f3f3' }}
            >
              <span>안녕하세요 고객님 라퍼지스토어입니다.</span>
            </div>
          )}
        </>
      )}
    </>
  );
}
