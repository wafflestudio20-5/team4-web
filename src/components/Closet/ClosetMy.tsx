import ClosetHeader from './ClosetHeader';
import ClosetBody from './ClosetBody';
import { User } from '../../lib/interface';

export default function ClosetOther({
  user,
  accessToken,
}: {
  user: User | null;
  accessToken: string | null;
}) {
  const parsedId = user?.id ?? null;
  const isMe: boolean = true;

  return (
    <>
      <ClosetHeader parsedId={parsedId} accessToken={accessToken} isMe={isMe} />
      <ClosetBody parsedId={parsedId} />
    </>
  );
}
