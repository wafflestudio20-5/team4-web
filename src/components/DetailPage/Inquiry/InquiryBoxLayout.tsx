import { Inquiry } from '../../../lib/interface';
import { formatInquiryType } from '../../../lib/formatters/inquiryFormatter';
import { formatDate2 } from '../../../lib/formatters/dateTimeFormatter';
import styles from './InquiryBoxLayout.module.scss';

interface InquiryBoxLayoutProps {
  inquiry: Inquiry;
}

export default function InquiryBoxLayout({ inquiry }: InquiryBoxLayoutProps) {
  return (
    <div className={styles.inquiry_grid}>
      <span className={styles.inquiry_number}>{inquiry.id}</span>
      <span className={styles.inquiry_status}>
        {inquiry.isAnswered ? '답변완료' : '답변예정'}
      </span>
      <span className={styles.inquiry_type}>
        {formatInquiryType(inquiry.type)}
      </span>
      <span className={styles.inquiry_content}>
        {inquiry.isSecret ? '상품 관련 문의입니다. ' : inquiry.title}
        {inquiry.isSecret && <span className={styles.key} />}
      </span>
      <span className={styles.inquiry_writer}>{inquiry.user.nickname}</span>
      <span className={styles.inquiry_created_date}>
        {formatDate2(inquiry.createdDateTime)}
      </span>
    </div>
  );
}
