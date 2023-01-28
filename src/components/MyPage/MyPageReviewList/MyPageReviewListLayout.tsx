import styles from './MyPageReviewListLayout.module.scss';
import { Review, Comment } from '../../../lib/interface';
import React, { useState } from 'react';
import { getRelativeDateTime } from '../../../lib/formatters/dateTimeFormatter';
import {
  formatColorReview,
  formatSizeReview,
} from '../../../lib/formatters/reviewFormatter';
import { getBarWidth } from '../../../lib/formatters/ratingFormatter';
interface MyPageReviewListLayoutParams {
  onClickWrite: () => void;
  data: Review[] | null;
  onEdit: (data: Review) => void;
}
interface ReviewWrittenItemParams {
  data: Review;
  onEdit: (data: Review) => void;
}
interface ReviewCommentListParams {
  data: Comment[];
}
interface ReviewCommentParams {
  data: Comment;
}
function ReviewComment({ data }: ReviewCommentParams) {
  return (
    <li className={styles.commentItem}>
      <div
        className={styles.commentUserPic}
        style={{
          background: `url(${data.user.image}) no-repeat 50% 50%`,
        }}
      ></div>
      <strong className="name">{data.user.nickname}</strong>
      <span className="time">{data.createdDateTime}</span>
      <p className="comment">{data.content}</p>
    </li>
  );
}
function ReviewCommentList({ data }: ReviewCommentListParams) {
  const [more, setMore] = useState<boolean>(false);

  if (data.length <= 2) {
    return (
      <ul className={styles.commentWrap}>
        {data.map((comment) => (
          <ReviewComment data={comment} />
        ))}
      </ul>
    );
  } else {
    if (more === false) {
      return (
        <ul className={styles.commentWrap}>
          <ReviewComment data={data[0]} />
          <ReviewComment data={data[1]} />
          <p
            className={styles.moreButton}
            onClick={() => {
              setMore(true);
            }}
          >
            <span>댓글 더보기</span>
          </p>
        </ul>
      );
    } else {
      return (
        <ul className={styles.commentWrap}>
          {data.map((comment) => (
            <ReviewComment data={comment} />
          ))}
        </ul>
      );
    }
  }
}

function ReviewWrittenItem({ data, onEdit }: ReviewWrittenItemParams) {
  const [showComment, setShowComment] = useState<boolean>(false);
  const onClick = () => {
    if (showComment === false) {
      setShowComment(true);
    } else {
      setShowComment(false);
    }
  };
  return (
    <li className={styles.reviewWrittenItem}>
      <div className={styles.ItemInfo}>
        <a href={`http://localhost:3000/goods/${data.purchase.item.id}`}>
          <img
            src={data.purchase.item.images[0]}
            alt={data.purchase.item.name}
          />
        </a>
        <ul>
          <li>{data.purchase.item.brand}</li>
          <li>
            <b>{data.purchase.item.name}</b>
          </li>
          <li>{data.purchase.option}</li>
        </ul>
      </div>
      <div className={styles.ItemContent} onClick={onClick}>
        <div className={styles.reviewDate}>
          <span>{getRelativeDateTime(data.createdDateTime)}</span>
          <span
            onClick={() => {
              onEdit(data);
            }}
          >
            {' '}
            &nbsp;&nbsp;수정 |
          </span>
          <span> 삭제</span>
        </div>
        <div className={styles.starWrap}>
          <span className={styles.star_background}>
            <span
              className={styles.star_bar}
              style={{
                width: `${getBarWidth(data.rating)}%`,
              }}
            />
          </span>
        </div>
        <div className={styles.reviewContent}>
          <div className={styles.contentText}>{data.content}</div>
          <div className={styles.contentValue}>
            <ul className={styles.reviewEvaluationList}>
              <li className={styles.reviewEvaluationItem}>
                사이즈&nbsp;
                <span>{formatSizeReview(data.size)}</span>
              </li>
              <li className={styles.reviewEvaluationItem}>
                색감&nbsp;
                <span>{formatColorReview(data.color)}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.commentCount}>
          댓글 <span>{data.comments.length}</span>
        </div>
      </div>
      <div className={styles.reviewType}>일반</div>
      {showComment ? (
        <div className={styles.reviewComment}>
          <ReviewCommentList data={data.comments} />
        </div>
      ) : null}
    </li>
  );
}
export default function MyPageReviewListLayout({
  onClickWrite,
  data,
  onEdit,
}: MyPageReviewListLayoutParams) {
  return (
    <div className={styles.reviewWrapper}>
      <header className={styles.reviewHeader}>
        <h1>구매후기</h1>
        <div className={styles.tabGroup}>
          <span className={styles.tabWrite} onClick={onClickWrite}>
            후기 작성&nbsp; /
          </span>
          <span className={styles.tabHistory}> 후기 내역</span>
        </div>
      </header>
      <ul className={styles.info}>
        <li>
          무신사 스토어의 후기는 일반 후기, 상품 사진 후기, 스타일 후기로
          구성되며, 각각의 후기 작성 시 기준에 맞는 적립금이 지급됩니다.
        </li>
        <li>작성 시 관리자 확인 후 적립금이 지급됩니다.</li>
        <li>후기작성은 구매확정일로부터 90일까지 가능합니다.</li>
      </ul>
      <div className={styles.reviewTable}>
        <div className={styles.title}>
          <span className={styles.info}>상품정보</span>
          <span className={styles.content}>내용</span>
          <span className={styles.type}>후기 종류</span>
        </div>

        <ul className={styles.reviewList}>
          {data?.map((review) => (
            <ReviewWrittenItem data={review} onEdit={onEdit} />
          ))}
        </ul>
      </div>
    </div>
  );
}
