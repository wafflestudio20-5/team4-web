import { useApiData, useApiUserStyleListFecther } from '../../../lib/api';
import StyleList from './StyleList';

export default function ClosetBody({ parsedId }: { parsedId: number | null }) {
  const { data: userData } = useApiData(useApiUserStyleListFecther(parsedId));
  const styleList = userData?.styles ?? null;

  return <StyleList styleList={styleList} />;
}
