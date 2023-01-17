import styles from './MyPageWriteReviewsLayout.module.scss';
interface Item {
    id: number;
    name: string;
    brand: string;
    images: string[];
}
interface Review {
    id: number;
}
interface PurchaseParams {
    id: number;
    item: Item;
    option?: string;
    createdDateTime: string;
    review?: Review;
}
interface ReviewItemParams {
    data: PurchaseParams
}

function ReviewItem({data}:ReviewItemParams) {

    return (
        <tr>
            <td>
                <div className={styles.reviewItemInfo}>
                    <a href={`/goods/${data.item.id}`}>
                        <img src={data.item.images[0]} alt="아이템 사진" />
                    </a>
                    <ul>
                        <li>{data.item.brand}</li>
                        <li><b>{data.item.name}</b></li>
                        <li>{data.option}</li>
                    </ul>
                </div>
            </td>
            <td className={styles.purchaseDate}>
                {data.createdDateTime}
                <br />
                구매확정
            </td>
            {data.review ? <td>
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

export default function MyPageWriteReviewsLayout() {


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
                <ReviewItem data={{id: 1, item: {id:1, name: '오버사이즈 발마칸 코트 DARK NAVY', brand: '인사일런스', images:['https://image.msscdn.net/images/goods_img/20220907/2780253/2780253_2_160.jpg']}, option: "s", createdDateTime: "2022.03.11", }}></ReviewItem>

            </tbody>

        </table>


    </div>);
}