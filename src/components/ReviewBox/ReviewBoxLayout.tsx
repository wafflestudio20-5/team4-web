import styles from "./ReviewBoxLayout.module.scss"
function ReviewBoxComment() {

    return <>
        <div className={styles.reviewBoxComment}>
            <div className={styles.commentProfilePic}>
                <img src="https://image.msscdn.net/mfile_s01/_simbols/_basic/e.png" alt="_basic/e.png"/>
            </div>
            <div className={styles.commentContentBox}>
                안녕하세요 진짜 멋있어요!!!!
            </div>
            <div className={styles.commentProfileDataArea}>
                <div className={styles.commentProfileData}>
                    <span className={styles.commentProfileClass}><b>회원</b></span>
                    <span className={styles.commentProfileName}>LV 3 이재운72</span>
                    <span className={styles.commentProfileDate}>2023.01.13 17:16</span>
                    <span className={styles.commentProfileEdit}>수정</span>
                    <span className={styles.commentProfileDelete}>삭제</span>
                </div>
            </div>
        </div>
    </>;
}

export default function ReviewBoxLayout() {
    return <div>
        <div className={styles.reviewBox}>
            <div className={styles.reviewProfile}>
                <a href={"/login"}>
                    <img src={'https://image.msscdn.net/mfile_s01/_simbols/_basic/c.png'} className={styles.reviewProfilePic}/>
                </a>
                <div className={styles.reviewProfileTextWrap}>
                    <div className={styles.reviewProfileText}>
                        <p className={styles.reviewProfileName}>LV 4 야채호빵님</p>
                        <p className={styles.reviewProfileDate}>2022.03.12</p>
                    </div>
                    <div className={styles.reviewProfileInfo}>
                        <p className={styles.reviewProfileBodyInfo}>남성, 173cm, 65kg</p>
                    </div>
                </div>
            </div>
            <div className={styles.reviewGoodsInformation}>
                <div className={styles.reviewGoodsThumbnail}>
                    <a href={"/login"}>
                        <img src={'https://image.msscdn.net/images/goods_img/20211111/2226766/2226766_3_100.jpg'}
                             className={styles.reviewGoodsPic}/>
                    </a>
                </div>
                <div className={styles.reviewGoodsItem}>
                    <a href={"/login"} className={styles.reviewGoodsName}>
                        오버사이즈 집업 카라 터틀넥 니트 [BLACK]
                    </a>
                    <p className={styles.reviewGoodsOption}>-L 구매</p>

                </div>
            </div>
            <div className={styles.reviewRatingWrap}></div>

            <div className={styles.reviewContent}>
                <div className={styles.reviewContentText}>
                    라지사이즈가 제 신체스펙에 핏이 좋은 것 같고
                    <br/>
                    지금 이 날씨에 입기 정말 좋은 것 같습니다
                </div>
                <div className={styles.reviewContentEvaluation}>
                    <ul className={styles.reviewEvaluationList}>
                        <li className={styles.reviewEvaluationItem}>
                            사이즈&nbsp;
                            <span>보통이에요</span>
                        </li>
                        <li className={styles.reviewEvaluationItem}>
                            색감&nbsp;
                            <span>선명해요</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.reviewContentImage}>
                    <div className={styles.reviewContentImageWrap}>
                        <ul className={styles.reviewContentImageList}>
                            <li className={styles.reviewContentImageItem} data-img-index="0" style={{backgroundImage:'url(https://image.msscdn.net/data/estimate/2226766_0/gallery_622ca31ca3099.jpg.list)'}}>
                                <img src="//image.msscdn.net/data/estimate/2226766_0/gallery_622ca31ca3099.jpg.view" alt="드로우핏(DRAW FIT) 오버사이즈 집업 카라 터틀넥 니트 [BLACK] 후기">
                                </img>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.reviewCommentCount}>
                댓글&nbsp;
                <span>6개</span>
            </div>
            <div className={styles.reviewCommentList}>
                <div className={styles.reviewCommentInput}>
                    <div className={styles.reviewCommentFakeInputBox}></div>
                    <span className={styles.reviewCommentFakeSubmitButton}>댓글작성</span>
                </div>
                <ReviewBoxComment></ReviewBoxComment>
                <ReviewBoxComment></ReviewBoxComment>
                {/*mapping들어갈 곳*/}
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