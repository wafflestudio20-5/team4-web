import { useApiItemFetcher, useApiData } from '../../lib/api';
import { useParams } from 'react-router-dom';

export default function DetailPage() {
  const param: number = Number(useParams().id);
  const item = useApiData(useApiItemFetcher(param)).data;
  console.log(item);

  return (
    <>
      <div>{item?.id}</div>
      <div>{item?.name}</div>
      <div>{item?.brand}</div>
    </>
  );
}
