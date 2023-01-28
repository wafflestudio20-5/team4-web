import { useApiData, useApiUserStyleFecther } from '../../../lib/api';
import StyleList from './StyleList';

export default function ClosetBody({ parsedId }: { parsedId: number | null }) {
  const { data: userData } = useApiData(useApiUserStyleFecther(parsedId));
  const styleList = userData?.styles ?? null;

  return <StyleList styleList={styleList} />;
}
