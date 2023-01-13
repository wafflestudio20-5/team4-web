import styles from './index.module.scss';

export default function PurchasePage() {
  // shoppingcart & DetailPage 에서 uselocation을 통해 {Item, option, quantity}[] 받아오기
  const purchaseList = [
    {
      item: {
        id: 0,
        sex: 'female',
        name: '여성 슬러치 바나나 숄더백 - 다크 브라운',
        brand: '더 로우',
        images: [
          'https://image.msscdn.net/images/goods_img/20220722/2678023/2678023_1_125.jpg',
        ],
        rating: 7,
        oldPrice: 1944000,
        sale: 44,
        newPrice: 1090000,
        label: 'boutique',
        category: 'bag',
        subCategory: 'crossBag',
      },
      option: 'M',
      quantity: 1,
    },
    {
      item: {
        id: 1,
        sex: 'male',
        name: '베르겐 고어 구스다운 남성 롱패딩',
        brand: '디스커버리 익스페디션',
        images: [
          'https://image.msscdn.net/images/goods_img/20221007/2848934/2848934_2_125.jpg',
        ],
        rating: 8,
        oldPrice: 750000,
        category: 'outer',
        subCategory: 'padding',
      },
      option: 'L',
      quantity: 1,
    },
    {
      item: {
        id: 2,
        sex: 'male',
        name: '[27일하루특가] 남성 W 페트리트 패딩 재킷',
        brand: '디젤',
        images: [
          'https://image.msscdn.net/images/goods_img/20220831/2757856/2757856_1_125.jpg',
        ],
        oldPrice: 750000,
        sale: 62,
        newPrice: 285000,
        rating: 9,
        label: 'boutique',
        category: 'outer',
        subCategory: 'jacket',
      },
      option: 'XL',
      quantity: 2,
    },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.pagenation}>
        <div className={styles.nav_sub}>
          <a href="/">무신사 스토어</a>
          <span className={styles.iconEntity}>{'>'}</span>
          <span>주문서</span>
        </div>
      </div>
      <form className={styles.f1}>
        <div className={styles.rightContents}>
          <h2 className={styles.titlePage}>Order / Payment</h2>
          <div className={styles.pagesorting}>
            <a href="/cart">
              <span>장바구니</span>
            </a>
            <span>
              <span className={styles.iconEntity}>{'>'}</span>
            </span>
            <span className={styles.currentPage}>주문서</span>
            <span>
              <span className={styles.iconEntity}>{'>'}</span>
            </span>
            <span>주문 완료</span>
          </div>
        </div>
        <div className={styles.orderDelivery}>
          <div className={styles.orderDeliveryInner}>
            <h3 className={styles.orderTitle}>배송 정보</h3>
            <ul className={styles.orderList}>
              <li className={styles.orderItemDelivery}>
                <span className={styles.orderItemLabel}>배송지</span>
                <div className={styles.orderItemArea}>
                  <span className={styles.orderTextAccent}>
                    배송지를 등록해주세요
                  </span>
                  <button className={styles.orderButton}>배송지 추가</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.orderProductInfo}>
          <h3 className={styles.orderTitle}>상품 정보</h3>
          <table className={styles.tableBasicOrder}>
            <thead>
              <tr>
                <th className={styles.th1}>상품 정보</th>
                <th className={styles.th2}>수량</th>
                <th className={styles.th3}>적립금</th>
                <th className={styles.th4}>상품 할인</th>
                <th className={styles.th5}>배송 그룹</th>
                <th className={styles.th6}>배송비</th>
                <th className={styles.th7}>주문금액</th>
              </tr>
            </thead>
            <tbody>
              {purchaseList.map((purchase) => (
                <tr>
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
                          <span className={styles.brand}>
                            [{purchase.item.brand}]
                          </span>
                          <span className={styles.name}>
                            {purchase.item.name}
                          </span>
                        </div>
                        <div className={styles.InfoLine}>
                          <div className={styles.option}>
                            옵션 : {purchase.option}
                          </div>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th>{purchase.quantity} 개</th>
                  <th>
                    {purchase.item.newPrice
                      ? `${Math.ceil(
                          purchase.item.newPrice / 20
                        ).toLocaleString()}원`
                      : `${Math.ceil(
                          purchase.item.oldPrice / 20
                        ).toLocaleString()}원`}
                  </th>
                  <th>
                    {purchase.item.newPrice
                      ? `${(
                          purchase.item.newPrice - purchase.item.oldPrice
                        ).toLocaleString()}원`
                      : -0}
                  </th>
                  <th>그룹1</th>
                  <th>무료</th>
                  <th>
                    {purchase.item.newPrice?.toLocaleString() ??
                      purchase.item.oldPrice.toLocaleString()}
                    원
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.announcement}>
            <div>
              <ul>
                <li>
                  · 구매 가능 수량이 1개로 제한된 상품은 주문 취소 시, 24시간 내
                  가상계좌 재주문이 불가합니다.
                </li>
                <li>
                  · 무신사 스토어는 기본적으로 대한민국 내 제주도 및 도서 산간
                  지역 포함 <span>전 지역, 전 상품 무료배송입니다.</span>
                </li>
                <li>
                  · 해외 배송 상품이나 일부 업체의 경우, 교환/환불 시 반송료가
                  다를 수 있으며 상품 페이지에 별도 표기되어 있습니다.
                </li>
                <li>
                  · 2개 이상의 브랜드(업체) 상품을 주문하신 경우, 각 개별
                  배송됩니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
