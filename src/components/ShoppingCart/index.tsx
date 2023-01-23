import styles from './index.module.scss';
import ShopppingCartHeader from './ShopppingCartHeader';
import { useNavigate } from 'react-router-dom';
import CartItemInfo from './CartItemInfo';
import { Session } from '../../lib/interface';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import {
  useApiData,
  useApiGetCartListFetcher,
  apiDeleteCartList,
} from '../../lib/api';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface DeleteCartModalState {
  open: boolean;
  visible: boolean;
  data: number[];
}

export default function ShoppingCart() {
  const navigate = useNavigate();

  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { accessToken } = session;

  const { data: cartData } = useApiData(useApiGetCartListFetcher(accessToken));
  const cartList = cartData?.cartItems ?? null;

  const AllCart: number[] = [];
  cartList?.map((purchase) => AllCart.push(purchase.id));

  const [deleteList, setDeleteList] = useState<number[]>([]);

  console.log(AllCart, deleteList);

  const deleteCart = (ids: number[]) => {
    apiDeleteCartList(ids, accessToken);
    setTimeout(() => {
      window.location.reload();
    }, 250);
  };

  const addDeleteList = (checked: boolean, id: number) => {
    if (checked) {
      setDeleteList([...deleteList, id]);
    } else if (!checked) {
      setDeleteList(deleteList.filter((el) => el !== id));
    }
  };

  const [modalStatus, setModalStatus] = useState<DeleteCartModalState>({
    visible: false,
    open: false,
    data: [],
  });

  const openModal = (list: number[]) => {
    if (list.length === 0) {
      toast('삭제할 상품이 없습니다.');
      return;
    }
    setModalStatus((prevState) => ({
      ...prevState,
      visible: true,
      open: true,
      data: list,
    }));
  };

  const closeModal = () => {
    setModalStatus((prevState) => ({ ...prevState, open: false, data: [] }));
    setTimeout(() => {
      setModalStatus((prevState) => ({ ...prevState, visible: false }));
    }, 200);
  };

  return (
    <div className={styles.wrap}>
      <ShopppingCartHeader />
      <CartItemInfo
        cartList={cartList}
        accessToken={accessToken}
        deleteCart={deleteCart}
        AllCart={AllCart}
        deleteList={deleteList}
        addDeleteList={addDeleteList}
        modalStatus={modalStatus}
        openModal={openModal}
        closeModal={closeModal}
      />
      <div className={styles.buttonDiv}>
        <button
          className={styles.purchaseButton}
          onClick={() => {
            navigate('/purchase', { state: { items: cartList } });
          }}
        >
          주문하기
        </button>
      </div>
    </div>
  );
}
