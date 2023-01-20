import MyPageWriteReviewsListLayout from "./MyPageWriteReviewsListLayout";
import MyPageWriteReviewsLayout from "./MyPageWriteReviewsLayout";
import { Purchase, Label, Category, SubCategory } from '../../../lib/interface';
import {useNavigate, useParams} from "react-router-dom";
import { useApiGetPurchaseListFetcher, useApiData} from "../../../lib/api";

export default function MyPageWriteReviewsList({
    accessToken,}:{accessToken: string | null; }) {


    const { data: purchasesData } = useApiData(
        useApiGetPurchaseListFetcher(accessToken)
    );

    const purchases = purchasesData?.purchaseItems ?? null;

    const navigate = useNavigate();


    const onClick = (data: Purchase) => {
        navigate('/mypage/review/write', {state: data})
    }


    console.log(purchases);

    return (<MyPageWriteReviewsListLayout purchases={purchases} onClick={onClick}></MyPageWriteReviewsListLayout>);



}