import styles from './ReviewBoxLayout.module.scss';
import { Review } from '../../lib/interface';
import { formatUserInfo } from '../../lib/formatters/userFormatter';
import {
  formatColorReview,
  formatSizeReview,
} from '../../lib/formatters/reviewFormatter';
import StarRate from './StarRate';
import React from 'react';

interface ReviewBoxLayoutParams {
  reviewDate: string;
  moreCommentBool: boolean;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
  data: Review;
}

interface ReviewBoxCommentParams {
  commentProfilePic: string;
  commentContent: string;
  commentName: string;
  commentDate: string;
}

function ReviewBoxComment({
  commentProfilePic,
  commentContent,
  commentName,
  commentDate,
}: ReviewBoxCommentParams) {
  return (
    <>
      <div className={styles.reviewBoxComment}>
        <div className={styles.commentProfilePic}>
          <img src={commentProfilePic} alt="_basic/e.png" />
        </div>
        <div className={styles.commentContentBox}>{commentContent}</div>
        <div className={styles.commentProfileDataArea}>
          <div className={styles.commentProfileData}>
            <span className={styles.commentProfileClass}>
              <b>회원</b>
            </span>
            <span className={styles.commentProfileName}>{commentName}</span>
            <span className={styles.commentProfileDate}>{commentDate}</span>
            <span className={styles.commentProfileEdit}>수정</span>
            <span className={styles.commentProfileDelete}>삭제</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ReviewBoxLayout({
  reviewDate,
  moreCommentBool,
  onClick,
  data,
}: ReviewBoxLayoutParams) {
  const Comment = () => {
    if (data.comments.length <= 2) {
      return (
        <>
          {data.comments.map((comment) => (
            <ReviewBoxComment
              commentProfilePic={comment.user.image}
              commentContent={comment.content}
              commentDate={comment.createdDateTime}
              commentName={comment.user.nickname}
            ></ReviewBoxComment>
          ))}
        </>
      );
    } else {
      if (moreCommentBool === false) {
        return (
          <>
            <ReviewBoxComment
              commentProfilePic={data.comments[0].user.image}
              commentContent={data.comments[0].content}
              commentDate={data.comments[0].createdDateTime}
              commentName={data.comments[0].user.nickname}
            ></ReviewBoxComment>
            <ReviewBoxComment
              commentProfilePic={data.comments[1].user.image}
              commentContent={data.comments[1].content}
              commentDate={data.comments[1].createdDateTime}
              commentName={data.comments[1].user.nickname}
            ></ReviewBoxComment>
          </>
        );
      } else {
        return (
          <>
            {data.comments.map((comment) => (
              <ReviewBoxComment
                commentProfilePic={comment.user.image}
                commentContent={comment.content}
                commentDate={comment.createdDateTime}
                commentName={comment.user.nickname}
              ></ReviewBoxComment>
            ))}
          </>
        );
      }
    }
  };
  return (
    <div>
      <div className={styles.reviewBox}>
        <div className={styles.reviewProfile}>
          <img
            src={data.user.image}
            alt=""
            className={styles.reviewProfilePic}
          />
          <div className={styles.reviewProfileTextWrap}>
            <div className={styles.reviewProfileText}>
              <p className={styles.reviewProfileName}>{data.user.nickname}님</p>
              <p className={styles.reviewProfileDate}>{reviewDate}</p>
            </div>
            <div className={styles.reviewProfileInfo}>
              <p className={styles.reviewProfileBodyInfo}>
                {formatUserInfo(
                  data.user.sex,
                  data.user.height,
                  data.user.weight
                )}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.reviewGoodsInformation}>
          <div className={styles.reviewGoodsThumbnail}>
            <img
              src={data.purchase.item.images[0]}
              alt=""
              className={styles.reviewGoodsPic}
            />
          </div>
          <div className={styles.reviewGoodsItem}>
            <span className={styles.reviewGoodsName}>
              {data.purchase.item.name}
            </span>
            <p className={styles.reviewGoodsOption}>
              -{data.purchase.option} 구매
            </p>
          </div>
        </div>
        <div className={styles.reviewRatingWrap}>
          <StarRate rating_score={data.rating} review_id={data.id} />
        </div>

        <div className={styles.reviewContent}>
          <div className={styles.reviewContentText}>{data.content}</div>
          <div className={styles.reviewContentEvaluation}>
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
          <div className={styles.reviewContentImage}>
            <div className={styles.reviewContentImageWrap}>
              <ul className={styles.reviewContentImageList}>
                {data.images.map((image) => (
                  <li
                    className={styles.reviewContentImageItem}
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    {' '}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.reviewCommentCount}>
          댓글&nbsp;
          <span>{data.comments.length}개</span>
        </div>
        <div className={styles.reviewCommentList}>
          <div className={styles.reviewCommentInput}>
            <div className={styles.reviewCommentFakeInputBox}></div>
            <span className={styles.reviewCommentFakeSubmitButton}>
              댓글작성
            </span>
          </div>
          <Comment></Comment>
          {/*review2개 넘으면 댓글 더보기 버튼*/}
          {moreCommentBool ? null : (
            <div className={styles.reviewMoreWrap}>
              <div className={styles.reviewMore}>
                <div className={styles.reviewMoreText} onClick={onClick}>
                  댓글 더보기
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
