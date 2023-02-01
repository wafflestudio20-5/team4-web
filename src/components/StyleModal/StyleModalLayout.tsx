import React from 'react';
import { User, Item, StyleData } from '../../lib/interface';
import { formatUserSize } from '../../lib/formatters/userFormatter';
import { getRelativeDateTime } from '../../lib/formatters/dateTimeFormatter';
import styles from './StyleModalLayout.module.scss';
import close from '../../resources/image/close.png';
import like from '../../resources/image/like.png';

/* Slick Slider */

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import forward from '../../resources/image/forward.svg';
import backward from '../../resources/image/back.svg';

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function BeforeArrow({ onClick }: ArrowProps) {
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      <img className={styles.previewImage} src={backward} alt="이전 슬라이드" />
    </div>
  );
}

function NextArrow({ onClick }: ArrowProps) {
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <img className={styles.previewImage} src={forward} alt="다음 슬라이드" />
    </div>
  );
}

/* Style Modal Layout */

interface StyleModalImagesProps {
  images: string[];
}

function StyleModalImages({ images }: StyleModalImagesProps) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    Arrow: true,
    prevArrow: <BeforeArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={styles.images}>
      <Slider {...settings} className={styles.slider}>
        {images?.map((image, idx) => (
          <img key={idx} src={image} alt="" className={styles.image} />
        ))}
      </Slider>
    </div>
  );
}

interface StyleModalHeaderProps {
  user: User;
  isFollowed: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function StyleModalHeader({
  user,
  isFollowed,
  onClose,
}: StyleModalHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.profile}>
        <img className={styles.profile_image} src={user.image} alt="" />
        <div className={styles.profile_text}>
          <h3 className={styles.profile_nickname}>{user.nickname}</h3>
          <div className={styles.profile_userinfo}>
            {formatUserSize(user.height, user.weight)}
          </div>
        </div>
      </div>
      <div
        className={`${styles.follow_box} ${
          isFollowed ? styles.followed : styles.not_followed
        }`}
      >
        {isFollowed ? '팔로잉' : '팔로우'}
      </div>
      <button className={styles.close_button} onClick={onClose}>
        <img src={close} alt="닫기" />
      </button>
    </div>
  );
}

interface StyleModalContentProps {
  content?: string;
  hashtag?: string;
  createdDateTime: string;
  likedCount: number;
  isLiked: boolean;
}

function StyleModalContent({
  content,
  hashtag,
  createdDateTime,
  likedCount,
  isLiked,
}: StyleModalContentProps) {
  return (
    <div className={styles.content}>
      {content && (
        <div className={styles.content_text_wrapper}>
          <span className={styles.content_text}>{content}</span>
          <span className={styles.content_hashtag}>{hashtag}</span>
        </div>
      )}
      <div className={styles.like_box_wrapper}>
        <div
          className={`${styles.like_box} ${
            isLiked ? styles.liked : styles.not_liked
          }`}
        >
          <div className={styles.like_icon}>
            <img src={like} alt="like" className={styles.like_icon_img} />
          </div>
          <div className={styles.like_count}>
            <span>{likedCount}</span>
          </div>
        </div>
      </div>
      <span className={styles.style_created_time}>
        {getRelativeDateTime(createdDateTime)}
      </span>
    </div>
  );
}

interface StyleModalItemsProps {
  items: Item[];
}

function StyleModalItems({ items }: StyleModalItemsProps) {
  return (
    <>
      {items.map((item, idx) => (
        <div key={idx} className={styles.item_wrapper}>
          <div className={styles.item_image}>
            <img src={item.images[0]} alt="상품 이미지" />
          </div>
          <div className={styles.item_info}>
            <div className={styles.item_info_text}>
              <span className={styles.item_info_brand}>{item.brand}</span>
              <span className={styles.item_info_name}>{item.name}</span>
            </div>
            <div className={styles.item_info_price}>
              {item.newPrice ? item.newPrice : item.oldPrice}{' '}
              {item.sale && (
                <span className={styles.item_info_sale}>{item.sale}%</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

interface StyleModalLayoutProps {
  open: boolean;
  data: StyleData;
  visible: boolean;
  outside: React.MutableRefObject<null>;
  onClose: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onOuterClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function StyleModalLayout({
  open,
  data,
  visible,
  outside,
  onClose,
  onOuterClick,
}: StyleModalLayoutProps) {
  const { style, likedCount, isFollow, isLike } = data;

  return (
    <>
      {visible && (
        <div
          ref={outside}
          onClick={onOuterClick}
          className={`${styles.wrapper} ${open ? styles.open : styles.close}`}
        >
          <div className={styles.modal}>
            <StyleModalImages images={style.images} />
            <div className={styles.body}>
              <StyleModalHeader
                user={style.user}
                isFollowed={isFollow}
                onClose={onClose}
              />
              <div className={styles.scrollable}>
                <StyleModalContent
                  content={style.content}
                  hashtag={style.hashtag}
                  createdDateTime={style.createdDateTime}
                  likedCount={likedCount}
                  isLiked={isLike}
                />
                <StyleModalItems items={style.items} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
