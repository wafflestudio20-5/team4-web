import styles from './MyPageInquiryListLayout.module.scss';
import React, { useState } from 'react';
import { Inquiry } from '../../../lib/interface';
import { formatInquiryType } from '../../../lib/formatters/inquiryFormatter';
import { formatDate } from '../../../lib/formatters/dateTimeFormatter';
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
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <tr>
        <td>
          <div className={styles.inquiryItemInfo}>
            <a href={`/goods/${inquiry.item.id}`} className={styles.imageBlock}>
              <img src={inquiry.item.images[0]} alt={inquiry.item.name} />
            </a>
            <ul className={styles.textInfo}>
              <li className={styles.brand}>{inquiry.item.brand}</li>
              <li className={styles.name}>
                <a href={`/goods/${inquiry.item.id}`}>{inquiry.item.name}</a>
              </li>
              <li>{inquiry.option}</li>
            </ul>
          </div>
        </td>
        <td>
          <div
            className={styles.inquiryItemTitle}
            onClick={() => {
              setShow((prevState) => !prevState);
            }}
          >
            {inquiry.title}
          </div>
        </td>
        <td>
          <div className={styles.inquiryItemType}>
            {formatInquiryType(inquiry.type)}
          </div>
        </td>
        <td>
          <div className={styles.inquiryItemDate}>
            {formatDate(inquiry.createdDateTime)}
          </div>
        </td>
        <td>
          {inquiry.isAnswered ? (
            <div className={styles.inquiryItemIsAnsweredTrue}>답변 완료</div>
          ) : (
            <div className={styles.inquiryItemIsAnsweredFalse}>
              <span className={styles.falseText}>답변 대기</span>
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
          )}
        </td>
      </tr>
      {show ? (
        <>
          <tr className={styles.inquiryItemContent}>
            <td></td>
            <td className={styles.contentText}>{inquiry.content}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {inquiry.isAnswered ? (
            <tr className={styles.inquiryItemComment}>
              <td>{inquiry.item.brand} 담당자</td>
              <td>{inquiry.comment}</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ) : null}
        </>
      ) : null}
    </>
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
      <table>
        <colgroup>
          <col width="26%" />
          <col width="*" />
          <col width="12.6%" />
          <col width="12.6%" />
          <col width="12.6%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">상품정보</th>
            <th scope="col">내용</th>
            <th scope="col">문의 유형</th>
            <th scope="col">작성일</th>
            <th scope="col">처리 상태</th>
          </tr>
        </thead>
        <tbody>
          {inquiries?.map((inquiry) => (
            <InquiryItem
              inquiry={inquiry}
              inquiryEditClick={inquiryEditClick}
              inquiryDeleteClick={inquiryDeleteClick}
            />
          ))}
        </tbody>
      </table>
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
