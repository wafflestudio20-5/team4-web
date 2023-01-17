import { KeyboardEvent, useState, FocusEvent } from 'react';
import styles from './CartItemInfo.module.scss';
import { Purchase } from '../../lib/interface';
import deletebutton from '../../resources/image/delete.svg';
import substractbutton from '../../resources/image/remove.svg';
import addbutton from '../../resources/image/add.svg';
import { apiPutCartList } from '../../lib/api';

interface CartItemInfoProps {
  cartList: Purchase[] | null;
  accessToken: string | null;
}

export default function CartItemInfo({
  cartList,
  accessToken,
}: CartItemInfoProps) {
  return (
    <>
      <div className={styles.orderProductInfo}>
        <h3 className={styles.orderTitle}>장바구니</h3>
        <table className={styles.tableBasicOrder}>
          <thead>
            <tr>
              <th>전체 {cartList?.length}개</th>
              <th className={styles.th1}>상품 정보</th>
              <th className={styles.th4}>상품 원가</th>
              <th className={styles.th6}>회원 할인</th>
              <th className={styles.th6}>개당 판매가</th>
              <th className={styles.th2}>수량</th>
              <th className={styles.th2}></th>
            </tr>
          </thead>
          <tbody>
            {cartList && cartList.length !== 0 ? (
              cartList?.map((purchase, idx) => (
                <PurchaseItem
                  purchase={purchase}
                  idx={idx}
                  accessToken={accessToken}
                />
              ))
            ) : (
              <td colSpan={7} className={styles.noitems}>
                장바구니에 담긴 상품이 없습니다.
              </td>
            )}
          </tbody>
        </table>
        <div className={styles.announcement}>
          <div>
            <ul>
              <li>
                · 무신사 스토어는 기본적으로 대한민국 내 제주도 및 도서 산간
                지역 포함 <span>전 지역, 전 상품 무료배송입니다.</span>
              </li>
              <li>· 2개 이상의 브랜드를 주문하신 경우, 개별 배송됩니다.</li>
              <li>
                · 해외 배송 상품이나 일부 업체의 경우, 교환/환불 시 반송료가
                다를 수 있으며 상품 페이지에 별도 표기되어 있습니다.
              </li>
              <li>
                · 장바구니에는 최대 10개의 상품을 보관할 수 있으며, 주문당
                한번에 주문 가능한 상품수는 10개로 제한됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function PurchaseItem({
  purchase,
  idx,
  accessToken,
}: {
  purchase: Purchase;
  idx: number;
  accessToken: string | null;
}) {
  const [inputs, setInputs] = useState(purchase.quantity.toString());
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(e.target.value);
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (Number(inputs) !== purchase.quantity) {
        apiPutCartList(purchase.id, Number(inputs), accessToken);
      }
    }
  };

  const blurEvent = (e: FocusEvent<HTMLInputElement>) => {
    if (Number(e.target.value) !== purchase.quantity) {
      apiPutCartList(purchase.id, Number(e.target.value), accessToken);
    }
  };

  return (
    <tr key={purchase.item.id}>
      <th>{idx + 1}</th>
      <th>
        <div className={styles.Item}>
          <div className={styles.ImageDiv}>
            <img
              className={styles.previewImage}
              src={purchase.item.images[0]}
              alt="상품 이미지"
            />
          </div>
          <div className={styles.ItemInfo}>
            <div>
              <span className={styles.brand}>[{purchase.item.brand}]</span>
              <span className={styles.name}>{purchase.item.name}</span>
            </div>
            <div className={styles.InfoLine}>
              <div className={styles.option}>옵션 : {purchase.option}</div>
            </div>
          </div>
        </div>
      </th>
      <th>
        <span>{purchase.item.oldPrice?.toLocaleString()}원</span>
      </th>
      <th>
        {purchase.item.newPrice
          ? `${(
              purchase.item.newPrice - purchase.item.oldPrice
            ).toLocaleString()}원`
          : -0}
      </th>
      <th>
        {purchase.item.newPrice ? (
          <>
            <del>{purchase.item.oldPrice?.toLocaleString()}원</del>
            <em>{purchase.item.newPrice?.toLocaleString()}원</em>
          </>
        ) : (
          <em>{purchase.item.oldPrice.toLocaleString()}원</em>
        )}
      </th>
      <th className={styles.count}>
        {purchase.quantity === 1 ? (
          <img
            className={styles.ButtonGray}
            src={substractbutton}
            alt="비활성화된 상품개수 줄이기"
          ></img>
        ) : (
          <img
            className={styles.Button}
            src={substractbutton}
            alt="활성화된 상품개수 줄이기"
            onClick={() => {
              apiPutCartList(purchase.id, purchase.quantity - 1, accessToken);
            }}
          ></img>
        )}
        <input
          className={styles.input}
          type="text"
          value={inputs}
          onChange={handleInputs}
          onKeyDown={handleKeyPress}
          onBlur={blurEvent}
        ></input>
        <img
          className={styles.Button}
          src={addbutton}
          alt="상품개수 늘리기"
          onClick={() => {
            apiPutCartList(purchase.id, purchase.quantity + 1, accessToken);
          }}
        ></img>
      </th>
      <th>
        <img
          className={styles.deleteButton}
          src={deletebutton}
          alt="장바구니에서 삭제하기"
        ></img>
      </th>
    </tr>
  );
}
