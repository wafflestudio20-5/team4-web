import styles from "./ReviewBoxLayout.module.scss"
function ReviewBoxComment() {

    return <>
        <div className={styles.reviewBoxComment}>
            <div className={styles.commentProfilePic}></div>
            <div className={styles.commentContentBox}>
                안녕하세요 진짜 멋있어요!!!!
            </div>
            <div className={styles.commentProfileDataArea}>
                <div className={styles.commentProfileData}>
                    <span>회원</span>
                    <span>LV 3 이재운72</span>
                    <span>2023.01.13 17:16</span>
                    <span>수정</span>
                    <span>삭제</span>
                </div>
            </div>

        </div>
    </>;
}

export default function ReviewBoxLayout() {
    return <div>
        <div className={styles.reviewBox}>
            <div className={styles.reviewProfile}>
            </div>
            <div className={styles.reviewGoodsInformation}></div>
            <div className={styles.reviewRatingWrap}></div>
            <div className={styles.reviewContent}></div>
            <div className={styles.reviewCommentCount}></div>
            <div className={styles.reviewCommentList}>
                <div className={styles.reviewCommentInput}>
                    <div className={styles.reviewCommentFakeInputBox}></div>
                    <span className={styles.reviewCommentFakeSubmitButton}>댓글작성</span>
                </div>
                <ReviewBoxComment></ReviewBoxComment>
                <ReviewBoxComment></ReviewBoxComment>
                {/*mapping들어갈 곳*/}
                {/*review2개 넘으면 댓글 더보기 버튼*/}
                <div className={styles.reviewMore}>
                    <a href={"/login"} className={styles.reviewMoreText}>
                        댓글 더보기
                    </a>
                </div>
            </div>
        </div>
    </div>;
}