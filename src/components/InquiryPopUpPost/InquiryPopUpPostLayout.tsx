import styles from './InquiryPopUpPostLayout.module.scss';
import React from 'react';
import { Item } from '../../lib/interface';
interface inquiryPopUpPostLayoutParams {
  data: Item | undefined;
}

export default function InquiryPopUpPostLayout({
  data,
}: inquiryPopUpPostLayoutParams) {
  return (
    <div className={styles.inquiryPopUp}>
      <header>
        <h2>상품문의</h2>
      </header>
      <div className={styles.inquiryInputForm}>
        <div className={styles.inquiryItem}>
          <div className={styles.inquiryItemImage}>
            <img src={data?.images[0]} alt={data?.name} />
          </div>
          <div className={styles.inquiryItemInfo}>
            <p className={styles.infoBrand}>{data?.brand}</p>
            <p className={styles.infoName}>{data?.name}</p>
            <p className={styles.infoPriceBox}>
              <span className={styles.originPrice}>
                {data?.oldPrice.toLocaleString()}원
              </span>
              {data?.newPrice ? (
                <>
                  &nbsp;{data?.newPrice.toLocaleString()}원
                  <span className={styles.discount}>{data?.sale}% SALE</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
        <table className={styles.inquiryInputTable}>
          <tbody>
            <tr>
              <th>문의유형</th>
              <td className={styles.typeArea}>
                <label>
                  <input type="radio" name="type" value="size" />
                  <span>사이즈</span>
                </label>
                <label>
                  <input type="radio" name="type" value="delivery" />
                  <span>배송</span>
                </label>
                <label>
                  <input type="radio" name="type" value="restock" />
                  <span>재입고</span>
                </label>
                <label>
                  <input type="radio" name="type" value="detail" />
                  <span>상품상세문의</span>
                </label>
              </td>
            </tr>
            <tr>
              <th></th>
              <td className={styles.commentArea}>
                - 클레임(교환/환불/취소)관련 문의는 마이페이지 {'>'} 1:1
                문의에서 문의 바랍니다.
              </td>
            </tr>
            <tr>
              <th>문의옵션</th>
              <td className={styles.optionArea}>
                <div>
                  <select name="option">
                    <option>옵션 선택</option>
                    {data?.options?.map((option) => (
                      <option value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td className={styles.titleArea}>
                <input
                  type="text"
                  name="title"
                  className={styles.titleInput}
                  maxLength={15}
                  placeholder="15자 이내 입력"
                />
                <label>
                  <input type="checkbox" name="isSecret" />
                  <span>비밀글</span>
                </label>
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td className={styles.contentArea}>
                <textarea
                  name="content"
                  className={styles.contentInput}
                  rows={10}
                  cols={45}
                  placeholder="내용 입력"
                ></textarea>
              </td>
            </tr>
            <tr>
              <th>이미지</th>
              <td className={styles.imageArea}>
                <span>+</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <dl className="qa-info-area">
        <dt>상품문의 안내</dt>
        <dd>
          <ul className="qa-comment">
            <li>
              - 상품문의는 재입고, 사이즈, 배송 등 상품에 대하여 브랜드
              담당자에게 문의하는 게시판입니다.
            </li>
            <li>
              <strong>
                - 욕설, 비방, 거래 글, 분쟁 유발, 명예훼손, 허위사실 유포, 타
                쇼핑몰 언급,광고성 등의 부적절한 게시글은 금지합니다. 더불어
                상품 문의 시 비밀글만 작성되도록 제한됩니다.
              </strong>
            </li>
            <li>
              <strong>
                - 주문번호, 연락처, 계좌번호 등의 개인 정보 관련 내용은 공개되지
                않도록 비밀글로 문의해 주시기 바랍니다.
              </strong>{' '}
              공개된 글은 비밀글로 전환될 수 있으며, 개인 정보 노출로 인한
              피해는 무신사 스토어가 책임지지 않습니다.
            </li>
          </ul>
        </dd>
      </dl>
      <div className={styles.buttonArea}>
        <span className={styles.buttonQuit}>취소</span>
        <span className={styles.buttonSubmit}>작성하기</span>
      </div>
    </div>
  );
}
