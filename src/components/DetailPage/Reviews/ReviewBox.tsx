import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ReviewBox.module.scss';

interface ReviewBoxProps {
  accessToken: string | null;
}

export default function ReviewBox({ accessToken }: ReviewBoxProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.profile_image}>
          <img
            src="https://image.msscdn.net/mfile_s01/_simbols/_basic/k.png"
            alt=""
          />
        </div>
        <div className={styles.profile_text_wrapper}>
          <div className={styles.profile_text}>
            <p className={styles.profile_text_left}>honggildong</p>
            <p className={styles.profile_text_right}>11시간 전</p>
          </div>
          <div className={styles.profile_info}>
            <p>남성, 170cm, 70kg</p>
          </div>
        </div>
      </div>
      <div className={styles.purchase_info}>
        <div className={styles.purchase_item_image}>
          {/* 추후 수정 필요*/}
          <Link to="/">
            <img
              src="https://image.msscdn.net/images/goods_img/20220829/2752332/2752332_1_100.jpg"
              alt=""
            />
          </Link>
        </div>
        <div className={styles.purchase_item_text}>
          {/* 추후 수정 필요*/}
          <Link to="/" className={styles.purchase_item_info}>
            빅 어워드 스타디움 울 바시티자켓 블랙
          </Link>
          <p className={styles.purchase_option_info}>XL 구매</p>
        </div>
      </div>
      <div className={styles.rating_wrapper}>
        <div className={styles.rating}>
          <span className={styles.star_background}>
            <span
              className={styles.star_bar}
              style={{
                width: `${100}%`,
              }}
            />
          </span>
        </div>
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.content_text}>
          요즘 입기는 추운거 같네요. 하지만 옷이 예뻐요. 봄까지 존버합니다
        </div>
        <ul className={styles.content_eval}>
          <li className={styles.content_eval_item}>
            사이즈 <span>보통이에요</span>
          </li>
          <li className={styles.content_eval_item}>
            색감 <span>보통이에요</span>
          </li>
        </ul>
        <div className={styles.content_image_wrapper}>
          <ul className={styles.content_image_list}>
            <li
              className={styles.content_image_item}
              style={{
                backgroundImage: `url(${'https://image.msscdn.net/images/goods_img/20220829/2752332/2752332_1_100.jpg'})`,
              }}
            >
              <img
                src="https://image.msscdn.net/images/goods_img/20220829/2752332/2752332_1_100.jpg"
                alt=""
                style={{
                  display: 'none',
                }}
              />
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.reply_count}>
        댓글 <span>{1}개</span>
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
          <div className={styles.comment_wrapper}>
            <div className={styles.comment_profile_image}>
              <img
                src="https://image.msscdn.net/mfile_s01/_simbols/_basic/b.png"
                alt=""
              />
            </div>
            <div className={styles.comment_content}>
              <p>혹시 바지 정보 알수있을까요??</p>
            </div>
            <div className={styles.comment_info}>
              <p className={styles.comment_created_user}>침착맨</p>
              <p className={styles.comment_created_time}>2023.01.23 15:25</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
