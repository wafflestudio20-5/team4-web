import styles from './index.module.scss';
import ShopppingCartHeader from './ShopppingCartHeader';
import { useNavigate } from 'react-router-dom';
import CartItemInfo from './CartItemInfo';
import { Session } from '../../lib/interface';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useApiData, useApiGetCartListFetcher } from '../../lib/api';
export default function ShoppingCart() {
  const navigate = useNavigate();

  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { accessToken } = session;

  const { data: cartData } = useApiData(useApiGetCartListFetcher(accessToken));
  const cartList = cartData?.cartItems ?? null;

  return (
    <div className={styles.wrap}>
      <ShopppingCartHeader />
      <CartItemInfo cartList={cartList} accessToken={accessToken} />
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
