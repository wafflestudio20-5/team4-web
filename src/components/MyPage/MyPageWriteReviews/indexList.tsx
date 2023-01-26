import MyPageWriteReviewsListLayout from './MyPageWriteReviewsListLayout';
import { Purchase } from '../../../lib/interface';
import { useNavigate } from 'react-router-dom';
import { useApiGetPurchaseListFetcher, useApiData } from '../../../lib/api';

export default function MyPageWriteReviewsList({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const { data: purchasesData } = useApiData(
    useApiGetPurchaseListFetcher(accessToken)
  );

  const purchases = purchasesData?.purchaseItems ?? null;

  const navigate = useNavigate();

  const onClick = (data: Purchase) => {
    navigate('/mypage/review/write', { state: data });
  };

  return (
    <MyPageWriteReviewsListLayout
      purchases={purchases}
      onClick={onClick}
    ></MyPageWriteReviewsListLayout>
  );
}
