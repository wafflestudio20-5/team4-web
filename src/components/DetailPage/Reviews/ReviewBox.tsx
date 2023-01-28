import React from 'react';
import { Link } from 'react-router-dom';
import { Review } from '../../../lib/interface';
import { getRelativeDateTime } from '../../../lib/formatters/dateTimeFormatter';
import { formatUserInfo } from '../../../lib/formatters/userFormatter';
import { getBarWidth } from '../../../lib/formatters/ratingFormatter';
import {
  formatSizeReview,
  formatColorReview,
} from '../../../lib/formatters/reviewFormatter';
import styles from './ReviewBox.module.scss';

interface ReviewBoxProps {
  review: Review;
  accessToken: string | null;
}

/***
 *
 * Api 수정 전 사용할 임시 mock-up data입니다.
 * (나중에 user -> review.user로 수정해야 함.)
 *
 */

const user = {
  nickname: 'honggildong',
  image: '//image.msscdn.net/mfile_s01/_simbols/_basic/t.png',
  height: 170,
  weight: 70,
  sex: 'male',
};

export default function ReviewBox({ review, accessToken }: ReviewBoxProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <img src={user.image} alt="" />
        </div>
        <div className={styles.profile_text_wrapper}>
          <div className={styles.profile_text}>
            <p className={styles.profile_text_left}>{user.nickname}</p>
            <p className={styles.profile_text_right}>
              {getRelativeDateTime(review.createdDateTime)}
            </p>
          </div>
          <div className={styles.profile_info}>
            <p>{formatUserInfo(user.sex, user.height, user.weight)}</p>
          </div>
        </div>
      </div>
      <div className={styles.purchase_info}>
        <div className={styles.purchase_item_image}>
          <Link to={`/goods/${review.purchase.item.id}`}>
            <img src={review.purchase.item.images[0]} alt="" />
          </Link>
        </div>
        <div className={styles.purchase_item_text}>
          <Link
            to={`/goods/${review.purchase.item.id}`}
            className={styles.purchase_item_info}
          >
            {review.purchase.item.name}
          </Link>
          {review.purchase.option && (
            <p className={styles.purchase_option_info}>
              {review.purchase.option} 구매
            </p>
          )}
        </div>
      </div>
      <div className={styles.rating_wrapper}>
        <div className={styles.rating}>
          <span className={styles.star_background}>
            <span
              className={styles.star_bar}
              style={{
                width: `${getBarWidth(review.rating)}%`,
              }}
            />
          </span>
        </div>
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.content_text}>{review.content}</div>
        <ul className={styles.content_eval}>
          <li className={styles.content_eval_item}>
            사이즈 <span>{formatSizeReview(review.size)}</span>
          </li>
          <li className={styles.content_eval_item}>
            색감 <span>{formatColorReview(review.color)}</span>
          </li>
        </ul>
        {review.images.length > 0 && (
          <div className={styles.content_image_wrapper}>
            <ul className={styles.content_image_list}>
              {review.images.map((image, idx) => (
                <li
                  key={idx}
                  className={styles.content_image_item}
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    style={{
                      display: 'none',
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.reply_count}>
        댓글 <span>{review.comments.length}개</span>
      </div>
      <div className={styles.comments_wrapper}>
        {/* 추후 수정 필요 */}
        {accessToken === null ? (
          <div className={styles.comment_input}>
            <div className={styles.comment_area}></div>
            <button className={styles.submit_button}>댓글작성</button>
          </div>
        ) : (
          <div className={styles.comment_area_login}>
            <Link to="/login">로그인</Link> 후에 작성하실 수 있습니다.
          </div>
        )}
        <div className={styles.comments_list}>
          {review.comments.map((comment, idx) => (
            <div key={idx} className={styles.comment_wrapper}>
              <div className={styles.comment_profile_image}>
                <img src={comment.user.image} alt="" />
              </div>
              <div className={styles.comment_content}>
                <p>{comment.content}</p>
              </div>
              <div className={styles.comment_info}>
                <p className={styles.comment_created_user}>
                  {comment.user.nickname}
                </p>
                <p className={styles.comment_created_time}>
                  {getRelativeDateTime(comment.createdDateTime)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
