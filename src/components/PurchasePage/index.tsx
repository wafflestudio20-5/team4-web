import styles from './index.module.scss';
import OrderProductInfo from './OrderProductInfo';
import PurchasePageHeader from './PurchasePageHeader';
import { Purchase } from '../../lib/interface';
import OrderPurchase from './OrderPurchase';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiDeleteCartList, apiPostPurchaseList } from '../../lib/api';
import { Session } from '../../lib/interface';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { PurchasePostDto } from '../../lib/dto';
import { toast } from 'react-toastify';
import axios from 'axios';

export interface PurchaseModalState {
  open: boolean;
  visible: boolean;
  data: Purchase[];
}

export interface LoadState {
  load: boolean;
  complete: boolean;
}

export default function PurchasePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const purchaseList: Purchase[] = location.state.items;

  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { accessToken } = session;

  const sumPrice = (purchaseList: Purchase[]): number => {
    let sum = 0;

    for (var idx in purchaseList) {
      sum += purchaseList[idx].item.oldPrice * purchaseList[idx].quantity;
    }

    return sum;
  };

  const sumSale = (purchaseList: Purchase[]): number => {
    let sale = 0;
    purchaseList.map((purchase) =>
      purchase.item.newPrice
        ? (sale +=
            (purchase.item.newPrice - purchase.item.oldPrice) *
            purchase.quantity)
        : sale
    );
    return sale;
  };

  useEffect(() => {
    if (!purchaseList || purchaseList?.length === 0) {
      toast('구매할 상품이 없습니다.');
      navigate(-1);
    }
  }, [purchaseList, navigate]);

  const purchaseConfirm = (purchases: Purchase[], token: string | null) => {
    const purchaseItems: PurchasePostDto[] = purchases.map((purchase) => {
      return {
        id: purchase?.item.id,
        option: purchase?.option,
        payment: purchase.item?.newPrice
          ? purchase.item.newPrice * purchase.quantity
          : purchase.item.oldPrice * purchase.quantity,
        quantity: purchase?.quantity,
      };
    });

    if (location.state.from === 'detail') {
      apiPostPurchaseList(purchaseItems, token)
        .then(() => {
          handleLoad();
        })
        .catch(() => {
          toast('결제에 실패했습니다.');
          closeModal();
        });
    } else if (location.state.from === 'cart') {
      axios
        .all([
          apiPostPurchaseList(purchaseItems, token),
          ...apiDeleteCartList(
            purchases.map((purchase) => purchase.id),
            token
          ),
        ])
        .then(() => {
          handleLoad();
        })
        .catch(() => {
          toast('결제에 실패했습니다.');
          closeModal();
        });
    }
  };

  const [modalStatus, setModalStatus] = useState<PurchaseModalState>({
    visible: false,
    open: false,
    data: [],
  });

  const openModal = (list: Purchase[]) => {
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

  const [loadState, setLoadState] = useState<LoadState>({
    load: false,
    complete: false,
  });

  const handleLoad = () => {
    setLoadState((prevState) => ({ ...prevState, load: true }));
    setTimeout(() => {
      setLoadState((prevState) => ({
        ...prevState,
        load: false,
        complete: true,
      }));
    }, 2000);
  };

  return (
    <div className={styles.wrap}>
      <PurchasePageHeader />
      <div className={styles.f1}>
        {/* <OrderDelivery /> */}
        <OrderProductInfo purchaseList={purchaseList} />
        <OrderPurchase
          purchaseList={purchaseList}
          accessToken={accessToken}
          sumPrice={sumPrice(purchaseList)}
          sumSale={sumSale(purchaseList)}
          purchaseConfirm={purchaseConfirm}
          modalStatus={modalStatus}
          openModal={openModal}
          closeModal={closeModal}
          loadState={loadState}
          navigate={navigate}
        />
      </div>
    </div>
  );
}
