import ClosetHeader from './ClosetHeader';
import ClosetBody from './ClosetBody';

import { useParams } from 'react-router-dom';
import { User } from '../../lib/interface';

export default function ClosetOther({
  user,
  accessToken,
}: {
  user: User | null;
  accessToken: string | null;
}) {
  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id) : null;
  const isMe: boolean = user?.id === parsedId ? true : false;

  return (
    <>
      <ClosetHeader parsedId={parsedId} accessToken={accessToken} isMe={isMe} />
      <ClosetBody parsedId={parsedId} />
    </>
  );
}
