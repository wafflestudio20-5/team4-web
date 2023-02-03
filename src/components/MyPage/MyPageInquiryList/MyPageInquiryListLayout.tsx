import styles from './MyPageInquiryListLayout.module.scss';
import React from 'react';
import { Inquiry } from '../../../lib/interface';
import { formatInquiryType } from '../../../lib/formatters/inquiryFormatter';
import { formatDate } from '../../../lib/formatters/dateTimeFormatter';
import { useNavigate } from 'react-router-dom';
interface InquiryItemParams {
  inquiry: Inquiry;
  inquiryEditClick: (data: Inquiry) => void;
  inquiryDeleteClick: (id: number) => void;
}
function InquiryItem({
  inquiry,
  inquiryEditClick,
  inquiryDeleteClick,
}: InquiryItemParams) {
  const navigate = useNavigate();
  return (
    <div className={styles.grid_orderitem}>
      <div className={styles.grid_items}>
        <div className={styles.Item}>
          <div className={styles.ImageDiv}>
            <img
              className={styles.previewImage}
              src={inquiry.item.images[0]}
              alt="상품 이미지"
              onClick={() => {
                navigate(`/goods/${inquiry.item.id}`);
              }}
            />
          </div>
          <div className={styles.ItemInfo}>
            <div className={styles.InfoLine}>
              <span className={styles.brand}>{inquiry.item.brand}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.name}>{inquiry.item.name}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.size}>{inquiry?.option}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grid_items}>
        <div className={styles.inquiryContentWrap}>
          <div className={styles.inquiryItemTitle}>{inquiry.title}</div>
          <div className={styles.overFlow}>
            <div className={styles.inquiryContent}>{inquiry.content}</div>
          </div>
        </div>
      </div>
      <div className={styles.grid_items}>
        <div className={styles.inquiryItemType}>
          {formatTypeInquiry(inquiry.type)}
        </div>
      </div>
      <div className={styles.grid_items}>
        <div className={styles.inquiryItemDate}>
          {formatDate(inquiry.createdDateTime)}
        </div>
      </div>
      <div className={styles.grid_items}>
        {inquiry.isAnswered ? (
          <div className={styles.inquiryItemIsAnsweredTrue}>답변 완료</div>
        ) : (
          <div className={styles.inquiryItemIsAnsweredFalse}>
            <div className={styles.falseText}>답변 대기</div>
          </div>
        )}
      </div>
      <div className={styles.grid_items}>
        <div className={styles.falseButton}>
          <button
            className={styles.edit}
            onClick={() => {
              inquiryEditClick(inquiry);
            }}
          >
            수정
          </button>
          <button
            className={styles.delete}
            onClick={() => {
              inquiryDeleteClick(inquiry.id);
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
interface MyPageInquiryListLayoutParams {
  inquiries: Inquiry[] | null;
  MAXIMUM_PAGE_INDEX: number;
  pageArray: number[];
  onPageSelect: (idx: number) => void;
  onBigJumpBackwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBigJumpForwards: (e: React.MouseEvent<HTMLButtonElement>) => void;
  inquiryEditClick: (data: Inquiry) => void;
  inquiryDeleteClick: (id: number) => void;
}

export default function MyPageInquiryListLayout({
  inquiries,
  MAXIMUM_PAGE_INDEX,
  pageArray,
  onPageSelect,
  onBigJumpBackwards,
  onBigJumpForwards,
  inquiryEditClick,
  inquiryDeleteClick,
}: MyPageInquiryListLayoutParams) {
  return (
    <div className={styles.inquiryListWrap}>
      <header className={styles.header}>
        <h1>상품문의</h1>
      </header>
      <div className={styles.grid_order}>
        <span className={styles.grid_header}>상품정보</span>
        <span className={styles.grid_header}>제목 / 내용</span>
        <span className={styles.grid_header}>문의 유형</span>
        <span className={styles.grid_header}>작성일</span>
        <span className={styles.grid_header}>처리 상태</span>
        <span className={styles.grid_header}>수정 / 삭제</span>
      </div>
      {inquiries && inquiries.length !== 0 ? (
        <>
          {inquiries?.map((inquiry) => (
            <InquiryItem
              inquiry={inquiry}
              inquiryEditClick={inquiryEditClick}
              inquiryDeleteClick={inquiryDeleteClick}
            />
          ))}
        </>
      ) : (
        <div className={styles.none}>작성한 문의가 없습니다.</div>
      )}
      <div className={styles.pagination}>
        <button onClick={onBigJumpBackwards}>{'<<'}</button>
        &nbsp;
        {pageArray.map((page) => (
          <span
            onClick={() => {
              onPageSelect(page);
            }}
          >
            {page + 1}&nbsp;
          </span>
        ))}
        <button onClick={onBigJumpForwards}>{'>>'}</button>
      </div>
    </div>
  );
}
