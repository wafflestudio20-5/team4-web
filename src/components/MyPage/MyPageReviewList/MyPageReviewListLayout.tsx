import styles from './MyPageReviewListLayout.module.scss';
import { Review } from '../../../lib/interface';
import StarRate from './StarRate';
import React from 'react';
interface MyPageReviewListLayoutParams {
  onClickWrite: () => void;
}
interface ReviewWrittenItemParams {
  data: Review;
}
function ReviewComment() {
  return (
    <li className={styles.commentItem}>
      <div className={styles.commentUserPic}></div>
      <strong className="name">LV 3 이재운72</strong>
      <span className="time">2023.01.28 16:05</span>
      <p className="comment">
        fjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdf
        fjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdffjfjfjfjfjdajslkdf
      </p>
    </li>
  );
}
function ReviewCommentList() {
  return (
    <ul className={styles.commentWrap}>
      <ReviewComment />
      <p className={styles.moreButton}>
        <span>댓글 더보기</span>
      </p>
    </ul>
  );
}

function ReviewWrittenItem() {
  return (
    <li className={styles.reviewWrittenItem}>
      <div className={styles.ItemInfo}>
        <a href="https://www.musinsa.com/app/goods/2780253/0">
          <img
            src="https://image.msscdn.net/images/goods_img/20220907/2780253/2780253_2_100.jpg"
            alt="아이템 사진"
          />
        </a>
        <ul>
          <li>인사일런스</li>
          <li>
            <b>오버사이즈 발마칸 코트 DARK NAVY</b>
          </li>
          <li>S</li>
        </ul>
      </div>
      <div className={styles.ItemContent}>
        <div className={styles.reviewDate}>
          <span>11일 전</span>
        </div>
        <div className={styles.starWrap}>
          <StarRate rating_score={10} review_id={1}></StarRate>
        </div>
        <div className={styles.reviewContent}>
          <div className={styles.contentText}>
            사이즈가 S지만 오버사이즈라서 상당히 기장이나 품이 큽니다. 그점
            유의하셨으면 좋겠어요! 사이즈가 S지만 오버사이즈라서 상당히 기장이나
            품이 큽니다. 그점 유의하셨으면 좋겠어요! 사이즈가 S지만
            오버사이즈라서 상당히 기장이나 품이 큽니다. 그점 유의하셨으면
            좋겠어요! 사이즈가 S지만 오버사이즈라서 상당히 기장이나 품이 큽니다.
            그점 유의하셨으면 좋겠어요!
          </div>
          <div className={styles.contentValue}>
            <ul className={styles.reviewEvaluationList}>
              <li className={styles.reviewEvaluationItem}>
                사이즈&nbsp;
                <span>커요</span>
              </li>
              <li className={styles.reviewEvaluationItem}>
                색감&nbsp;
                <span>밝아요</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.commentCount}>
          댓글 <span>3개</span>
        </div>
      </div>
      <div className={styles.reviewType}>일반</div>
      <div className={styles.reviewComment}>
        <ReviewCommentList />
      </div>
    </li>
  );
}
export default function MyPageReviewListLayout({
  onClickWrite,
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
          <ReviewWrittenItem />
        </ul>
      </div>
    </div>
  );
}
