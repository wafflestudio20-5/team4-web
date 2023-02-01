import MyPageStyleWriteLayout from './MyPageStyleWriteLayout';
import { useState } from 'react';
import { useApiData, useApiGetPurchaseListFetcher } from '../../../lib/api';
interface Input {
  content: string;
  hashtag: string;
  item: number[];
}

export default function MyPageStyleWrite({
  accessToken,
}: {
  accessToken: string | null;
}) {
  const [input, setInput] = useState<Input>({
    content: '',
    hashtag: '',
    item: [],
  });

  const { data: purchasesData } = useApiData(
    useApiGetPurchaseListFetcher(accessToken)
  );

  const purchases = purchasesData?.purchaseItems ?? null;

  return <MyPageStyleWriteLayout></MyPageStyleWriteLayout>;
}
