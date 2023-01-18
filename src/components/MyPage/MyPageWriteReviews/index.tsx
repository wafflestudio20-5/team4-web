import MyPageWriteReviewsLayout from "./MyPageWriteReviewsLayout";
import { useApiGetPurchaseListFetcher, useApiData} from "../../../lib/api";

export default function MyPageWriteReviews({
    accessToken,}:{accessToken: string | null; }) {

    const { data: purchasesData } = useApiData(
        useApiGetPurchaseListFetcher(accessToken)
    );

    const purchases = purchasesData?.purchaseItems ?? null;
    console.log(purchases);

    return (<MyPageWriteReviewsLayout purchases={purchases}></MyPageWriteReviewsLayout>);
}