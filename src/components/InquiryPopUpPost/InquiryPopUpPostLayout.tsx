import styles from './InquiryPopUpPostLayout.module.scss';
export default function InquiryPopUpPostLayout() {
  return (
    <div className={styles.inquiryPopUp}>
      <header>
        <h2>상품문의</h2>
      </header>
      <div className={styles.inquiryInputForm}>
        <div className={styles.inquiryItem}>
          <div className={styles.inquiryItemImage}>
            <img
              src="https://image.msscdn.net/images/goods_img/20220831/2758347/2758347_1_125.jpg"
              alt="T-Logo Hoodie Navy"
            />
          </div>
          <div className={styles.inquiryItemInfo}>
            <p className={styles.infoBrand}>디스이즈네버댓</p>
            <p className={styles.infoName}>T-Logo Hoodie Navy</p>
            <p className={styles.infoPriceBox}>
              <span className={styles.originPrice}>95,000원</span>
              &nbsp;66,500원
              <span className={styles.discount}>30% SALE</span>
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
                    <option value="S">S</option>
                    <option value="M">M</option>
                    {/*mapping할 자리*/}
                  </select>
                </div>
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
