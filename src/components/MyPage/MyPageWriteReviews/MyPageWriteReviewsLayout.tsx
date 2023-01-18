import styles from './MyPageWriteReviewsLayout.module.scss';
import {Purchase} from '../../../lib/interface';

interface ReviewItemParams {
    data: Purchase;
}

function ReviewItem({data}:ReviewItemParams) {

    return (
        <tr>
            <td>
                <div className={styles.reviewItemInfo}>
                    <a href={`/goods/${data?.item.id}`}>
                        <img src={data?.item.images[0]} alt="아이템 사진" />
                    </a>
                    <ul>
                        <li>{data?.item.brand}</li>
                        <li><b>{data?.item.name}</b></li>
                        <li>{data?.option}</li>
                    </ul>
                </div>
            </td>
            <td className={styles.purchaseDate}>
                {data?.createdDateTime}
                <br />
                구매확정
            </td>
            {data?.review ? <td>
                <div className={styles.reviewWriteDone}>
                    후기 작성완료
                </div>
            </td>:
                <td>
                <div className={styles.reviewWriteButton}>
                    후기 작성하러가기
                </div>
            </td>}
        </tr>
    );
}
interface MyPageWriteReviewsLayoutParams {
    purchases: Purchase[] | null;
}

export default function MyPageWriteReviewsLayout({purchases}: MyPageWriteReviewsLayoutParams) {


    return (<div className={styles.reviewWrapper}>
        <header className={styles.reviewHeader}>
            <h1>구매후기</h1>
            <div className={styles.tabGroup}>
                <span className={styles.tabWrite}>후기 작성&nbsp;</span>
                <span className={styles.tabHistory}> / 후기 내역</span>
            </div>
        </header>
        <ul className={styles.info}>
            <li>무신사 스토어의 후기는 일반 후기, 상품 사진 후기, 스타일 후기로 구성되며, 각각의 후기 작성 시 기준에 맞는 적립금이 지급됩니다.</li>
            <li>작성 시 관리자 확인 후 적립금이 지급됩니다.</li>
            <li>후기작성은 구매확정일로부터 90일까지 가능합니다.</li>
        </ul>
        <table className={styles.reviewTable}>
            <colgroup>
                <col width="*"></col>
                <col width="25%"></col>
                <col width="25%"></col>
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">상품정보</th>
                    <th scope="col">구매 / 구매확정일</th>
                    <th scope="col">후기 작성</th>
                </tr>
            </thead>
            <tbody>
            {purchases && purchases?.length !== 0 ? (
                purchases.map((item) => <ReviewItem data={item} />)
            ) : (
                <div className={styles.none}>후기 작성할 목록이 없습니다.</div>
            )}

            </tbody>

        </table>


    </div>);
}