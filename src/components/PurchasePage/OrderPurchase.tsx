import { Purchase } from '../../lib/interface';
import styles from './OrderPurchase.module.scss';
import { LoadState, PurchaseModalState } from '.';
import { Oval } from 'react-loader-spinner';
import { NavigateFunction } from 'react-router-dom';

interface OrderPurchaseProps {
  purchaseList: Purchase[];
  accessToken: string | null;
  sumPrice: number;
  sumSale: number;
  purchaseConfirm: (purchases: Purchase[], token: string | null) => void;
  modalStatus: PurchaseModalState;
  openModal: (list: Purchase[]) => void;
  closeModal: () => void;
  loadState: LoadState;
  navigate: NavigateFunction;
}

export default function OrderPurchase({
  purchaseList,
  accessToken,
  sumPrice,
  sumSale,
  purchaseConfirm,
  modalStatus,
  openModal,
  closeModal,
  loadState,
  navigate,
}: OrderPurchaseProps) {
  const finalprice = sumPrice + sumSale;

  return (
    <>
      {modalStatus.visible && (
        <PurchaseModal
          closeModal={closeModal}
          modalStatus={modalStatus}
          accessToken={accessToken}
          purchaseConfirm={purchaseConfirm}
          loadState={loadState}
          navigate={navigate}
        />
      )}
      <div className={styles.orderPurchase}>
        <h3 className={styles.ordertitle}>결제 정보</h3>
        <div className={styles.ordertable}>
          <div className={styles.orderline}>
            <div className={styles.lineleft}>총 상품 금액</div>
            <div className={styles.lineright}>
              {sumPrice.toLocaleString()} 원
            </div>
          </div>
          <div className={styles.orderline}>
            <div className={styles.lineleft}>회원 할인 합계</div>
            <div className={styles.lineright}>
              <span>{sumSale.toLocaleString()} 원</span>
            </div>
          </div>
          <div className={styles.orderlinelast}>
            <div className={styles.lineleft}>최종 결제 금액</div>
            <div className={styles.lineright}>
              {finalprice.toLocaleString()} 원
            </div>
          </div>
        </div>
        <div className={styles.buttonDiv}>
          <button
            className={styles.purchaseButton}
            onClick={() => {
              openModal(purchaseList);
            }}
          >
            {(sumPrice + sumSale).toLocaleString()} 원 결제하기
          </button>
        </div>
      </div>
    </>
  );
}

function PurchaseModal({
  closeModal,
  modalStatus,
  accessToken,
  purchaseConfirm,
  loadState,
  navigate,
}: {
  closeModal: () => void;
  modalStatus: PurchaseModalState;
  accessToken: string | null;
  purchaseConfirm: (purchases: Purchase[], token: string | null) => void;
  loadState: LoadState;
  navigate: NavigateFunction;
}) {
  return (
    <div
      className={
        modalStatus.open ? styles.modalbackground : styles.modalbackgroundClose
      }
    >
      <div
        className={
          modalStatus.open ? styles.modalContainer : styles.modalContainerClose
        }
      >
        {!loadState.load && !loadState.complete ? (
          <>
            <div className={styles.textArea}>
              <div>결제하시겠습니까?</div>
            </div>
            <div className={styles.buttonArea}>
              <button
                onClick={() => {
                  purchaseConfirm(modalStatus.data, accessToken);
                }}
              >
                확인
              </button>
              <button onClick={closeModal}>취소</button>
            </div>
          </>
        ) : loadState.load ? (
          <Oval
            height={40}
            width={40}
            color="#d8d8d8"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#d8d8d8"
            strokeWidth={8}
            strokeWidthSecondary={8}
          />
        ) : (
          <>
            <div className={styles.textArea}>
              <div>결제가 완료되었습니다!</div>
            </div>
            <div className={styles.buttonArea}>
              <button
                onClick={() => {
                  navigate('/');
                }}
              >
                무신사 홈
              </button>
              <button
                onClick={() => {
                  navigate('/mypage/order');
                }}
              >
                주문 조회
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
