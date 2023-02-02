import styles from './MyPageStyleWriteLayout.module.scss';
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
  tempSelect: number;
  onRemove: (id: number) => void;
  handleSubmit: (e: React.SyntheticEvent) => void;
}

export default function MyPageStyleWriteLayout({
  images,
  handleClick,
  input,
  onChangeTextArea,
  purchases,
  onChangeSelect,
  tempSelect,
  onRemove,
  handleSubmit,
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
            <select name="items" onChange={onChangeSelect} value={tempSelect}>
              <option>브랜드명 / 상품명</option>
              {purchases
                ?.filter(
                  (purchase) =>
                    input.itemIds.includes(purchase.item.id) === false
                )
                .map((purchase) => (
                  <option value={purchase.item.id}>
                    {purchase.item.brand}|{purchase.item.name}|{purchase.option}
                  </option>
                ))}
            </select>
          </div>
          <p className={styles.subtitle}>추가된 상품</p>
          {purchases
            ?.filter(
              (purchase) => input.itemIds.includes(purchase.item.id) === true
            )
            .map((purchase) => (
              <div className={styles.postItem}>
                <a href={`/goods/${purchase.item.id}`}>
                  <img
                    src={purchase.item.images[0]}
                    alt={`${purchase.item.id}`}
                  />
                </a>
                <ul>
                  <li className={styles.brand}>{purchase.item.brand}</li>
                  <li className={styles.name}>{purchase.item.name}</li>
                  <li className={styles.option}>{purchase.option}</li>
                </ul>
                <img
                  className={styles.closeBtn}
                  src={close_button}
                  alt="close_button"
                  onClick={() => {
                    onRemove(purchase.item.id);
                  }}
                />
              </div>
            ))}
        </div>
        <div className={styles.postButtonArea}>
          <form onClick={handleSubmit}>
            <button className={styles.postButton}>등록</button>
          </form>
        </div>
      </div>
    </div>
  );
}
