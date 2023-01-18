import MyPageWriteReviewsListLayout from "./MyPageWriteReviewsListLayout";
import MyPageWriteReviewsLayout from "./MyPageWriteReviewsLayout";
import { Purchase, Label, Category, SubCategory } from '../../../lib/interface';
import {useNavigate, useParams} from "react-router-dom";
import { useApiGetPurchaseListFetcher, useApiData} from "../../../lib/api";

export default function MyPageWriteReviewsList({
    accessToken,}:{accessToken: string | null; }) {


    {/*const { data: purchasesData } = useApiData(
        useApiGetPurchaseListFetcher(accessToken)
    );

    const purchases = purchasesData?.purchaseItems ?? null; */}

    const navigate = useNavigate();


    const onClick = (data: Purchase) => {
        navigate('/mypage/review/write', {state: data})
    }

    const purchases : Purchase[] = [
        {
            id: 0,
            user: {id: 0,
                image: "f",
                point: 1,
                username: "f",
                nickname: "f",
                reviewCount: 1,
                description: "f",
                registrationDate: "f",
            },
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
                label: Label.boutique,
                category: Category.bag,
                subCategory: SubCategory.crossBag,
            },
            createdDateTime: "2022.12.30",
            option: 'M',
            quantity: 1,
            payment: 1,
        },
        {
            id: 1,
            user: {id: 0,
                image: "f",
                point: 1,
                username: "f",
                nickname: "f",
                reviewCount: 1,
                description: "f",
                registrationDate: "f",
            },
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
                category: Category.outer,
                subCategory: SubCategory.padding,
            },
            createdDateTime: "2022.12.31",
            option: 'L',
            quantity: 1,
            payment: 1,
        },
        {
            id: 2,
            user: {id: 0,
                image: "f",
                point: 1,
                username: "f",
                nickname: "f",
                reviewCount: 1,
                description: "f",
                registrationDate: "f",
            },
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
                label: Label.boutique,
                category: Category.outer,
                subCategory: SubCategory.jacket,
            },
            createdDateTime: "2022.11.30",
            option: 'L',
            quantity: 2,
            payment: 1,
        },
    ];
    console.log(purchases);

    return (<MyPageWriteReviewsListLayout purchases={purchases} onClick={onClick}></MyPageWriteReviewsListLayout>);



}