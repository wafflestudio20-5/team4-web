/*

마이페이지 메인 화면은
추가 기능 논의 및 디자이너 분과의 협의가 완료된 후에
'개인 홈피' 스타일로 재구성할 예정입니다.

*/

import { User } from '../../lib/interface';
import styles from './MyPageMain.module.scss';

interface MyPageMainProps {
  user: User;
}

function OrderBlock() {
  return (
    <section id="order">
      <header className={styles.title}>
        <h2>주문내역 조회</h2>
        <ul>
          <li>
            <span>입금/결제 0</span>
          </li>
          <li>
            <span>배송중/픽업대기 0</span>
          </li>
          <li>
            <span>배송완료/픽업완료 0</span>
          </li>
          <li>
            <span>구매확정 0</span>
          </li>
        </ul>
        <span className={styles.clickable}>전체</span>
      </header>
      <div className={styles.grid_order}>
        <div className={styles.grid_header}>상품정보</div>
        <div className={styles.grid_header}>주문일자</div>
        <div className={styles.grid_header}>주문번호</div>
        <div className={styles.grid_header}>주문금액(수량)</div>
        <div className={styles.grid_header}>주문 상태</div>
      </div>
      <div className={styles.none}>최근 구매내역이 없습니다.</div>
    </section>
  );
}

function CartBlock() {
  return (
    <section id="cart">
      <header className={styles.title}>
        <h2>장바구니</h2>
        <div className={styles.tabs}>
          <div className={styles.tab}>
            <span>택배배송 0</span>
          </div>
          <div className={styles.tab}>
            <span>무탠픽업 0</span>
          </div>
        </div>
        <span className={styles.clickable}>전체</span>
      </header>
      <div className={styles.grid_cart}>
        <div className={styles.grid_header}>
          <button className={styles.grid_button} />
        </div>
        <div className={styles.grid_header}>상품정보</div>
        <div className={styles.grid_header}>상품금액</div>
        <div className={styles.grid_header}>수량</div>
        <div className={styles.grid_header}>주문금액</div>
        <div className={styles.grid_header}>배송 형태/배송비</div>
      </div>
      <div className={styles.none}>장바구니에 담긴 상품이 없습니다.</div>
      <div className={styles.button_group}>
        <div className={styles.deselect_button}>선택삭제</div>
        <div className={styles.buy_button}>결제하기</div>
      </div>
    </section>
  );
}

function GIBlock() {
  return (
    <section id="general_inquiry">
      <header className={styles.title}>
        <h2>상품문의</h2>
        <span className={styles.clickable}>전체</span>
      </header>
      <div className={styles.grid_GI}>
        <div className={styles.grid_header}>상품정보</div>
        <div className={styles.grid_header}>내용</div>
        <div className={styles.grid_header}>문의 유형</div>
        <div className={styles.grid_header}>작성일</div>
        <div className={styles.grid_header}>처리 상태</div>
      </div>
      <div className={styles.none}>등록된 상품문의가 없습니다.</div>
    </section>
  );
}

function PIBlock() {
  return (
    <section id="personal_inquiry">
      <header className={styles.title}>
        <h2>1:1문의</h2>
        <span className={styles.clickable}>전체</span>
      </header>
      <div className={styles.grid_PI}>
        <div className={styles.grid_header}>문의 유형</div>
        <div className={styles.grid_header}>내용</div>
        <div className={styles.grid_header}>주문번호</div>
        <div className={styles.grid_header}>작성일</div>
        <div className={styles.grid_header}>처리 상태</div>
      </div>
      <div className={styles.none}>등록된 1:1문의가 없습니다.</div>
    </section>
  );
}

function ReviewBlock() {
  return (
    <section id="review">
      <header className={styles.title}>
        <h2>구매후기</h2>
        <span className={styles.clickable}>전체</span>
      </header>
      <div className={styles.grid_review}>
        <div className={styles.grid_header}>상품정보</div>
        <div className={styles.grid_header}>내용</div>
        <div className={styles.grid_header}>후기 종류</div>
      </div>
      <div className={styles.none}>등록된 후기내역이 없습니다.</div>
    </section>
  );
}

export default function MyPageMain({ user }: MyPageMainProps) {
  return (
    <div className={styles.wrapper}>
      <OrderBlock />
      <CartBlock />
      <GIBlock />
      <PIBlock />
      <ReviewBlock />
    </div>
  );
}
