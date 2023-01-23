import { KeyboardEvent, useState, FocusEvent } from 'react';
import styles from './CartItemInfo.module.scss';
import { Purchase } from '../../lib/interface';
import { apiPatchCart } from '../../lib/api';
import { DeleteCartModalState } from '.';

interface CartItemInfoProps {
  cartList: Purchase[] | null;
  accessToken: string | null;
  deleteCart: (ids: number[]) => void;
  AllCart: number[];
  deleteList: number[];
  addDeleteList: (checked: boolean, id: number) => void;
  modalStatus: DeleteCartModalState;
  openModal: (list: number[]) => void;
  closeModal: () => void;
}

export default function CartItemInfo({
  cartList,
  accessToken,
  deleteCart,
  AllCart,
  deleteList,
  addDeleteList,
  modalStatus,
  openModal,
  closeModal,
}: CartItemInfoProps) {
  return (
    <>
      {modalStatus.visible && (
        <DeleteModal
          closeModal={closeModal}
          modalStatus={modalStatus}
          deleteCart={deleteCart}
        />
      )}
      <div className={styles.orderProductInfo}>
        <h3 className={styles.orderTitle}>장바구니</h3>
        <table className={styles.tableBasicOrder}>
          <thead>
            <tr>
              <th>전체 {cartList?.length}개</th>
              <th className={styles.th1}>상품 정보</th>
              <th className={styles.th6}>개당 판매가</th>
              <th className={styles.th2}>수량</th>
              <th className={styles.th2}></th>
            </tr>
          </thead>
          <tbody>
            {cartList && cartList.length !== 0 ? (
              cartList?.map((purchase, idx) => (
                <PurchaseItem
                  key={purchase.id}
                  purchase={purchase}
                  idx={idx}
                  addDeleteList={addDeleteList}
                  accessToken={accessToken}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.noitems}>
                  장바구니에 담긴 상품이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.announcement}>
          <div className={styles.ulDiv}>
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
          <div className={styles.buttonDiv}>
            <button
              onClick={() => {
                openModal(AllCart);
              }}
            >
              전체 삭제
            </button>
            <button
              onClick={() => {
                openModal(deleteList);
              }}
            >
              선택 삭제
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function PurchaseItem({
  purchase,
  idx,
  addDeleteList,
  accessToken,
}: {
  purchase: Purchase;
  idx: number;
  addDeleteList: (checked: boolean, id: number) => void;
  accessToken: string | null;
}) {
  const [inputs, setInputs] = useState(purchase.quantity.toString());
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseFloat(e.target.value);
    setInputs(Number.isNaN(parsedValue) ? '1' : parsedValue.toString());
  };
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (Number(inputs) !== purchase.quantity) {
        purchase.quantity = Number(inputs);
        apiPatchCart(purchase.id, Number(inputs), accessToken);
      }
    }
  };
  const blurEvent = (e: FocusEvent<HTMLInputElement>) => {
    if (Number(inputs) !== purchase.quantity) {
      purchase.quantity = Number(inputs);
      apiPatchCart(purchase.id, Number(inputs), accessToken);
    }
  };

  const countDown = () => {
    setInputs((Number(inputs) - 1).toString());
    apiPatchCart(purchase.id, purchase.quantity - 1, accessToken);
    purchase.quantity -= 1;
  };

  const countUp = () => {
    setInputs((Number(inputs) + 1).toString());
    apiPatchCart(purchase.id, purchase.quantity + 1, accessToken);
    purchase.quantity += 1;
  };

  return (
    <tr>
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
        <div className={styles.selected_amount}>
          {Number(inputs) === 1 ? (
            <button
              style={{
                color: '#ccc',
                cursor: 'default',
              }}
            >
              -
            </button>
          ) : (
            <button
              style={{
                color: '#000',
              }}
              onClick={countDown}
            >
              -
            </button>
          )}

          <input
            type="text"
            value={inputs}
            onChange={handleInputs}
            onKeyDown={handleKeyPress}
            onBlur={blurEvent}
          />
          <button onClick={countUp}>+</button>
        </div>
      </th>
      <th>
        <input
          type="checkbox"
          value={purchase.id}
          onChange={(e) => {
            addDeleteList(e.target.checked, Number(e.target.value));
          }}
        ></input>
      </th>
    </tr>
  );
}

function DeleteModal({
  closeModal,
  modalStatus,
  deleteCart,
}: {
  closeModal: () => void;
  modalStatus: DeleteCartModalState;
  deleteCart: (ids: number[]) => void;
}) {
  return (
    <div className={styles.deletebackground} onClick={closeModal}>
      <div
        className={
          modalStatus.open
            ? styles.deleteContainer
            : styles.deleteContainerClose
        }
      >
        <div className={styles.textArea}>
          <div>장바구니 상품을 삭제하시겠습니까?</div>
        </div>
        <div className={styles.deletebuttonArea}>
          <button
            className={styles.delete}
            onClick={() => {
              deleteCart(modalStatus.data);
            }}
          >
            삭제
          </button>
          <button className={styles.deleteclose} onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
