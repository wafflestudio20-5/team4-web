import styles from './MyPageWriteReviewsListLayout.module.scss';
import { Purchase } from '../../../lib/interface';
import { formatDate } from '../../../lib/formatters/dateTimeFormatter';
import { useNavigate } from 'react-router-dom';

interface ReviewItemParams {
  data: Purchase;
  onClick: (data: Purchase) => void;
}

function ReviewItem({ data, onClick }: ReviewItemParams) {
  const navigate = useNavigate();

  return (
    <div className={styles.grid_order}>
      <div className={styles.grid_items}>
        <div className={styles.Item}>
          <div className={styles.ImageDiv}>
            <img
              className={styles.previewImage}
              src={data?.item.images[0]}
              alt="상품 이미지"
              onClick={() => {
                navigate(`/goods/${data.item.id}`);
              }}
            />
          </div>
          <div className={styles.ItemInfo}>
            <div className={styles.InfoLine}>
              <span className={styles.brand}>{data?.item.brand}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.name}>{data?.item.name}</span>
            </div>
            <div className={styles.InfoLine}>
              <span className={styles.size}>{data?.option}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.grid_items}>
        구매확정 / {formatDate(data.createdDateTime)}
      </div>
      {data?.isReviewed ? (
        <div className={styles.grid_items}>
          <div className={styles.buttonArea}>
            <div className={styles.reviewWriteDone}>후기 작성완료</div>
          </div>
        </div>
      ) : (
        <div className={styles.grid_items}>
          <div className={styles.buttonArea}>
            <div
              className={styles.reviewWriteButton}
              onClick={() => {
                onClick(data);
              }}
            >
              후기 작성하러가기
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
interface MyPageWriteReviewsListLayoutParams {
  purchases: Purchase[] | null;
  onClick: (data: Purchase) => void;
  onClickReviewList: () => void;
}

export default function MyPageWriteReviewsListLayout({
  purchases,
  onClick,
  onClickReviewList,
}: MyPageWriteReviewsListLayoutParams) {
  return (
    <div className={styles.reviewWrapper}>
      <header className={styles.reviewHeader}>
        <h1>구매후기</h1>
        <div className={styles.tabGroup}>
          <span className={styles.tabWrite}>후기 작성&nbsp;</span>
          <span className={styles.tabHistory} onClick={onClickReviewList}>
            {''}/ 후기 내역
          </span>
        </div>
      </header>
      <ul className={styles.info}>
        <li>
          무신사 스토어의 후기는 일반 후기, 상품 사진 후기, 스타일 후기로
          구성되며, 각각의 후기 작성 시 기준에 맞는 적립금이 지급됩니다.
        </li>
        <li>작성 시 관리자 확인 후 적립금이 지급됩니다.</li>
        <li>후기작성은 구매확정일로부터 90일까지 가능합니다.</li>
      </ul>
      <div className={styles.grid_order}>
        <div className={styles.grid_header}>상품정보 </div>
        <div className={styles.grid_header}>구매 / 구매확정일 </div>
        <div className={styles.grid_header}>후기 작성 </div>
      </div>
      {purchases && purchases?.length !== 0 ? (
        <>
          {purchases.map((item) => (
            <ReviewItem data={item} onClick={onClick} key={item.id} />
          ))}
        </>
      ) : (
        <div className={styles.none}>작성할 후기가 없습니다.</div>
      )}
    </div>
  );
}
