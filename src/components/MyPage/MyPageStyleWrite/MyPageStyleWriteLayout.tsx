import styles from './MyPageStyleWriteLayout.module.scss';
import search_button from '../../../resources/image/search_icon.png';
import close_button from '../../../resources/image/close.png';
import { Purchase } from '../../../lib/interface';
import React from 'react';
interface Input {
  content: string;
  hashtag: string;
  itemIds: number[];
}
interface MyPageStyleWriteLayoutParams {
  images: string[];
  handleClick: () => void;
  input: Input;
  onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  purchases: Purchase[] | null;
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function MyPageStyleWriteLayout({
  images,
  handleClick,
  input,
  onChangeTextArea,
  purchases,
  onChangeSelect,
}: MyPageStyleWriteLayoutParams) {
  return (
    <div className={styles.postWrapper}>
      <header className={styles.postHeader}>
        <h1>게시물 작성</h1>
      </header>
      <div className={styles.postWrite}>
        <div className={styles.postImageInputArea}>
          <p className={styles.title}>이미지 업로드</p>
          <p className={styles.subtitle}>
            나의 스타일 사진을 한 장 이상 공유해 주세요.
          </p>
          <div className={styles.postImageInputWrap}>
            {images.map((img, idx) => (
              <span>
                <img src={img} alt={`${idx}`} key={idx}></img>
              </span>
            ))}
            <span className={styles.postImageInput} onClick={handleClick}>
              +
            </span>
            <div className={styles.postWriteInputCount}>
              {images.length} 개/5 개
            </div>
          </div>
        </div>
        <p className={styles.title}>글 작성</p>
        <label htmlFor="postWriteInput">스타일에 대해 설명해 주세요.</label>
        <div className={styles.postWriteInputWrap}>
          <textarea
            className={styles.postWriteInput}
            id="postWriteInput"
            value={input.content}
            onChange={onChangeTextArea}
            name="content"
          ></textarea>
          <div className={styles.postWriteInputCount}>
            {input.content.length} 자
          </div>
        </div>
        <div className={styles.hashtagInputArea}>
          <label htmlFor="hashtagInput">해시태그를 달아 보세요.</label>
          <div className={styles.hashtagInputWrap}>
            <textarea
              className={styles.hashtagInput}
              id="hashtagInput"
              maxLength={20}
              value={input.hashtag}
              onChange={onChangeTextArea}
              name="hashtag"
            ></textarea>
            <div className={styles.hashtagInputCount}>
              {input.hashtag.length}자/20자 이내
            </div>
          </div>
        </div>
        <div className={styles.searchItemArea}>
          <p className={styles.title}>상품 정보</p>
          <p className={styles.subtitle}>
            코디한 아이템 중 무신사에서 구매한 상품을 공유해 주세요.
          </p>
          <div className={styles.searchItem}>
            <select name="items" onChange={onChangeSelect}>
              <option>브랜드명 / 상품명 입력</option>
              {purchases
                ?.filter(
                  (purchase) =>
                    input.itemIds.includes(purchase.item.id) === false
                )
                .map((purchase) => (
                  <option value={purchase.item.id}>
                    {purchase.item.id}|{purchase.item.brand}|
                    {purchase.item.name}|{purchase.option}
                  </option>
                ))}
            </select>

            <div className={styles.searchButton}>
              <img src={search_button} alt="search_button" />
            </div>
          </div>
          <p className={styles.subtitle}>추가된 상품</p>
          <div className={styles.postItem}>
            <a href={`/goods/`}>
              {' '}
              {/*href수정 필요*/}
              <img
                src={
                  'https://image.msscdn.net/images/goods_img/20230127/3043312/3043312_16750477395934_500.jpg'
                }
                alt={'이미지'}
              />
            </a>
            <ul>
              <li className={styles.brand}>브랜드 이름 들어가요</li>
              <li className={styles.name}>이름들어가요</li>
              <li className={styles.option}>옵션</li>
            </ul>
            <img
              className={styles.closeBtn}
              src={close_button}
              alt="close_button"
            />
          </div>
          <div className={styles.postItem}>
            <a href={`/goods/`}>
              {' '}
              {/*href수정 필요*/}
              <img
                src={
                  'https://image.msscdn.net/images/goods_img/20230127/3043312/3043312_16750477395934_500.jpg'
                }
                alt={'이미지'}
              />
            </a>
            <ul>
              <li className={styles.brand}>브랜드 이름 들어가요</li>
              <li className={styles.name}>이름들어가요</li>
              <li className={styles.option}>옵션</li>
            </ul>
            <img
              className={styles.closeBtn}
              src={close_button}
              alt="close_button"
            />
          </div>
        </div>
        <div className={styles.postButtonArea}>
          <form>
            <button className={styles.postButton}>등록</button>
          </form>
        </div>
      </div>
    </div>
  );
}
