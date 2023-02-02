import styles from './MyPageInquiryListLayout.module.scss';
import { useState } from 'react';
function InquiryItem() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <tr>
        <td>
          <div className={styles.inquiryItemInfo}>
            <a href="/app/goods/3036129/0" className={styles.imageBlock}>
              <img
                src={
                  '//image.msscdn.net/images/goods_img/20230120/3036129/3036129_16745604936368_100.jpg'
                }
                alt="버프워시 버핑레더 인시전 바이커 자켓_Washing Black&amp;Ivory"
              />
            </a>
            <ul className={styles.textInfo}>
              <li className={styles.brand}>라퍼지스토어</li>
              <li className={styles.name}>
                <a href="/app/goods/3036129/0">
                  버프워시 버핑레더 인시전 바이커 자켓_Washing Black&amp;Ivory
                </a>
              </li>
              <li>S</li>
            </ul>
          </div>
        </td>
        <td>
          <div
            className={styles.inquiryItemTitle}
            onClick={() => {
              setShow((prevState) => !prevState);
            }}
          >
            사이즈 문의드립니다.
          </div>
        </td>
        <td>
          <div className={styles.inquiryItemType}>사이즈</div>
        </td>
        <td>
          <div className={styles.inquiryItemDate}>2023.01.27</div>
        </td>
        <td>{/*답변완료, 답변대기 로직 구현*/}</td>
      </tr>
      {show ? (
        <>
          <tr className={styles.inquiryItemContent}>
            <td></td>
            <td className={styles.contentText}>
              170cm에 66kg 남자가 입으면 작을까요?
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr className={styles.inquiryItemComment}>
            <td>라퍼지스토어 담당자</td>
            <td>
              안녕하세요 고객님 라퍼지스토어입니다. 사이즈 추천의 경우, 동일
              사이즈더라도 체형 및 희망핏감에 따라 상이할 수 있으므로 정확한
              안내 해드리기 어려운 점 양해 부탁드리며, 평소 자주 입으시는 제품과
              기재 된 사이즈표 참고 후 구매 권장드리고 있습니다. 감사합니다.
              안녕하세요 고객님 라퍼지스토어입니다. 사이즈 추천의 경우, 동일
              사이즈더라도 체형 및 희망핏감에 따라 상이할 수 있으므로 정확한
              안내 해드리기 어려운 점 양해 부탁드리며, 평소 자주 입으시는 제품과
              기재 된 사이즈표 참고 후 구매 권장드리고 있습니다. 감사합니다.
              안녕하세요 고객님 라퍼지스토어입니다. 사이즈 추천의 경우, 동일
              사이즈더라도 체형 및 희망핏감에 따라 상이할 수 있으므로 정확한
              안내 해드리기 어려운 점 양해 부탁드리며, 평소 자주 입으시는 제품과
              기재 된 사이즈표 참고 후 구매 권장드리고 있습니다. 감사합니다.
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </>
      ) : null}
    </>
  );
}

export default function MyPageInquiryListLayout() {
  return (
    <div className={styles.inquiryListWrap}>
      <header className={styles.header}>
        <h1>상품문의</h1>
      </header>
      <table>
        <colgroup>
          <col width="26%" />
          <col width="*" />
          <col width="12.6%" />
          <col width="12.6%" />
          <col width="12.6%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">상품정보</th>
            <th scope="col">내용</th>
            <th scope="col">문의 유형</th>
            <th scope="col">작성일</th>
            <th scope="col">처리 상태</th>
          </tr>
        </thead>
        <tbody>
          <InquiryItem />
        </tbody>
      </table>
    </div>
  );
}
