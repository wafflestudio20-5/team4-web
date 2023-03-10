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
import {
  formatRating,
  getBarWidth,
} from '../../../lib/formatters/ratingFormatter';
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
          backgroundSize: '100%',
        }}
      ></div>
      <strong className="name">{data.user.nickname}</strong>
      <span className="time">{getRelativeDateTime(data.createdDateTime)}</span>
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
            <span>?????? ?????????</span>
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
              alt="?????? ?????????"
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
              &nbsp;&nbsp;?????? |
            </span>
            <span
              className={styles.editDelete}
              onClick={() => {
                onRemove(data.id);
              }}
            >
              {' '}
              ??????
            </span>
          </div>

          <div className={styles.rate}>
            <span className={styles.star_background}>
              <span
                className={styles.star_bar}
                style={{
                  width: `${getBarWidth(data.rating)}%`,
                }}
              />
            </span>
            <span className={styles.rating}>{formatRating(data.rating)}</span>
          </div>

          <div className={styles.reviewContent}>
            <div className={styles.contentText}>{data.content}</div>
            <div className={styles.contentValue}>
              <ul className={styles.reviewEvaluationList}>
                <li className={styles.reviewEvaluationItem}>
                  ?????????&nbsp;
                  <span>{formatSizeReview(data.size)}</span>
                </li>
                <li className={styles.reviewEvaluationItem}>
                  ??????&nbsp;
                  <span>{formatColorReview(data.color)}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.commentCount}>
            <b onClick={onClick}>??????</b>
            <span onClick={onClick}>{data.comments.length}</span>
          </div>
          {showComment ? (
            <div className={styles.reviewComment}>
              <ReviewCommentList data={data.comments} />
            </div>
          ) : null}
        </div>
      </div>

      <div className={styles.grid_items}>
        <div className={styles.reviewType}>
          {formatDate(data.createdDateTime)}
          {data.modifiedDateTime ? '?????????' : ''}
        </div>
      </div>
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
        <h1>????????????</h1>
        <div className={styles.tabGroup}>
          <span className={styles.tabWrite} onClick={onClickWrite}>
            ?????? ?????? /
          </span>
          <span className={styles.tabHistory}> ?????? ??????</span>
        </div>
      </header>
      <ul className={styles.info}>
        <li>
          ????????? ???????????? ????????? ?????? ??????, ?????? ?????? ??????, ????????? ?????????
          ????????????, ????????? ?????? ?????? ??? ????????? ?????? ???????????? ???????????????.
        </li>
        <li>?????? ??? ????????? ?????? ??? ???????????? ???????????????.</li>
        <li>??????????????? ???????????????????????? 90????????? ???????????????.</li>
      </ul>

      <div className={styles.grid_order}>
        <span className={styles.grid_header}>????????????</span>
        <span className={styles.grid_header}>??????</span>
        <span className={styles.grid_header}>?????? ??????</span>
      </div>

      {data && data.length !== 0 ? (
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
      ) : (
        <div className={styles.none}>????????? ????????? ????????????.</div>
      )}
    </div>
  );
}
