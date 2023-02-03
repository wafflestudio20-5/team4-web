import styles from './MyPageReviewListLayout.module.scss';
import { Review, Comment } from '../../../lib/interface';
import React, { useState } from 'react';
import {
  formatDate,
  getRelativeDateTime,
} from '../../../lib/formatters/dateTimeFormatter';
import {
  formatColorReview,
  formatSizeReview,
} from '../../../lib/formatters/reviewFormatter';
import { getBarWidth } from '../../../lib/formatters/ratingFormatter';
import { useNavigate } from 'react-router-dom';
interface MyPageReviewListLayoutParams {
  onClickWrite: () => void;
  data: Review[] | undefined;
  onEdit: (data: Review) => void;
  onRemove: (id: number) => void;
  temp: number[];
}
interface ReviewWrittenItemParams {
  data: Review;
  onEdit: (data: Review) => void;
  onRemove: (id: number) => void;
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

function ReviewWrittenItem({
  data,
  onEdit,
  onRemove,
}: ReviewWrittenItemParams) {
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState<boolean>(false);
  const onClick = () => {
    if (showComment === false) {
      setShowComment(true);
    } else {
      setShowComment(false);
    }
  };
  return (
    <div className={styles.grid_orderitem}>
      <div className={styles.grid_items}>
        <div className={styles.Item}>
          <div className={styles.ImageDiv}>
            <img
              className={styles.previewImage}
              src={data.purchase.item.images[0]}
              alt="상품 이미지"
              onClick={() => {
                navigate(`/goods/${data.purchase.item.id}`);
              }}
            />
          </div>
          <div className={styles.ItemInfo}>
            <div className={styles.InfoLine}>
              <span className={styles.brand}>{data.purchase.item.brand}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.name}>{data.purchase.item.name}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.size}>{data.purchase?.option}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grid_reviews}>
        <div>
          <div className={styles.reviewDate}>
            <span>{getRelativeDateTime(data.createdDateTime)}</span>
            <span
              className={styles.editDelete}
              onClick={() => {
                onEdit(data);
              }}
            >
              {' '}
              &nbsp;&nbsp;수정 |
            </span>
            <span
              className={styles.editDelete}
              onClick={() => {
                onRemove(data.id);
              }}
            >
              {' '}
              삭제
            </span>
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
            <b onClick={onClick}>댓글</b>
            <span onClick={onClick}>{data.comments.length}</span>
          </div>
        </div>
      </div>
      <div className={styles.grid_items}>
        <div className={styles.reviewType}>
          {formatDate(data.createdDateTime)}
          {data.modifiedDateTime ? '수정됨' : ''}
        </div>
      </div>
      {showComment ? (
        <div className={styles.reviewComment}>
          <ReviewCommentList data={data.comments} />
        </div>
      ) : null}
    </div>
  );
}
export default function MyPageReviewListLayout({
  onClickWrite,
  data,
  onEdit,
  onRemove,
  temp,
}: MyPageReviewListLayoutParams) {
  return (
    <div className={styles.reviewWrapper}>
      <header className={styles.reviewHeader}>
        <h1>구매후기</h1>
        <div className={styles.tabGroup}>
          <span className={styles.tabWrite} onClick={onClickWrite}>
            후기 작성 /
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

      <div className={styles.grid_order}>
        <span className={styles.grid_header}>상품정보</span>
        <span className={styles.grid_header}>내용</span>
        <span className={styles.grid_header}>작성 일자</span>
      </div>
      <>
        {data
          ?.filter((review) => temp.includes(review.id) === false)
          .map((review) => (
            <ReviewWrittenItem
              data={review}
              onEdit={onEdit}
              onRemove={onRemove}
            />
          ))}
      </>
    </div>
  );
}
