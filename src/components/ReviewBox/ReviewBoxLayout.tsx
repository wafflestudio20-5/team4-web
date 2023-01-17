import styles from "./ReviewBoxLayout.module.scss"

import StarRate from "./StarRate";
interface User {
    nickname: string;
    image: string;
    sex?: string;
    height: number;
    weight: number;
}
interface Comment {
    user: User;
    content: string;
    createdDateTime: string;
}
interface ReviewBoxLayoutParams {
    username: string;
    profileImageUrl: string;
    reviewDate: string;
    sex: string;
    height: number;
    weight: number;
    goodsImageUrl: string;
    goodsName: string;
    goodsOption: string;
    reviewStar: number;
    reviewId: number;
    reviewContent: string;
    size: string;
    color: string;
    images: string[];
    commentCount: number;
    comments: Comment[];
}
interface ReviewBoxCommentParams {
    commentProfilePic: string;
    commentContent: string;
    commentName: string;
    commentDate: string;
}
const CommentMap = () => {

}

function ReviewBoxComment({commentProfilePic, commentContent, commentName, commentDate}: ReviewBoxCommentParams) {

    return <>
        <div className={styles.reviewBoxComment}>
            <div className={styles.commentProfilePic}>
                <img src={commentProfilePic} alt="_basic/e.png"/>
            </div>
            <div className={styles.commentContentBox}>
                {commentContent}
            </div>
            <div className={styles.commentProfileDataArea}>
                <div className={styles.commentProfileData}>
                    <span className={styles.commentProfileClass}><b>회원</b></span>
                    <span className={styles.commentProfileName}>{commentName}</span>
                    <span className={styles.commentProfileDate}>{commentDate}</span>
                    <span className={styles.commentProfileEdit}>수정</span>
                    <span className={styles.commentProfileDelete}>삭제</span>
                </div>
            </div>
        </div>
    </>;
}

export default function ReviewBoxLayout({username, profileImageUrl, reviewDate, sex, height, weight, goodsImageUrl,
                                        goodsName, goodsOption, reviewStar, reviewId, reviewContent, size, color,
                                        images, commentCount, comments}: ReviewBoxLayoutParams) {
    return <div>
        <div className={styles.reviewBox}>
            <div className={styles.reviewProfile}>
                <img src={profileImageUrl} className={styles.reviewProfilePic}/>
                <div className={styles.reviewProfileTextWrap}>
                    <div className={styles.reviewProfileText}>
                        <p className={styles.reviewProfileName}>{username}님</p>
                        <p className={styles.reviewProfileDate}>{reviewDate}</p>
                    </div>
                    <div className={styles.reviewProfileInfo}>
                        <p className={styles.reviewProfileBodyInfo}>{sex}, {height}cm, {weight}kg</p>
                    </div>
                </div>
            </div>
            <div className={styles.reviewGoodsInformation}>
                <div className={styles.reviewGoodsThumbnail}>
                    <img src={goodsImageUrl}
                         className={styles.reviewGoodsPic}/>
                </div>
                <div className={styles.reviewGoodsItem}>
                    <span className={styles.reviewGoodsName}>
                        {goodsName}
                    </span>
                    <p className={styles.reviewGoodsOption}>-{goodsOption} 구매</p>

                </div>
            </div>
            <div className={styles.reviewRatingWrap}>
                <StarRate rating_score={reviewStar} review_id={reviewId} />
            </div>

            <div className={styles.reviewContent}>
                <div className={styles.reviewContentText}>
                    {reviewContent}
                </div>
                <div className={styles.reviewContentEvaluation}>
                    <ul className={styles.reviewEvaluationList}>
                        <li className={styles.reviewEvaluationItem}>
                            사이즈&nbsp;
                            <span>{size}</span>
                        </li>
                        <li className={styles.reviewEvaluationItem}>
                            색감&nbsp;
                            <span>{color}</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.reviewContentImage}>
                    <div className={styles.reviewContentImageWrap}>
                        <ul className={styles.reviewContentImageList}>
                            {images.map(image=>(<li className={styles.reviewContentImageItem} style={{backgroundImage:`url(${image})`}}> </li>))}

                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.reviewCommentCount}>
                댓글&nbsp;
                <span>{commentCount}개</span>
            </div>
            <div className={styles.reviewCommentList}>
                <div className={styles.reviewCommentInput}>
                    <div className={styles.reviewCommentFakeInputBox}></div>
                    <span className={styles.reviewCommentFakeSubmitButton}>댓글작성</span>
                </div>
                {comments.map(comment => (<ReviewBoxComment commentProfilePic={comment.user.image} commentContent={comment.content}
                                                            commentDate={comment.createdDateTime} commentName={comment.user.nickname}></ReviewBoxComment>))}
                {/*review2개 넘으면 댓글 더보기 버튼*/}
                <div className={styles.reviewMoreWrap}>
                    <div className={styles.reviewMore}>
                        <a href={"/login"} className={styles.reviewMoreText}>
                            댓글 더보기
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}