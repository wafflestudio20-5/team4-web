import ClosetHeader from './ClosetHeader';
import ClosetBody from './ClosetBody';
import { User } from '../../lib/interface';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClosetMy({
  user,
  accessToken,
}: {
  user: User | null;
  accessToken: string | null;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  const parsedId = user?.id ?? null;
  const isMe: boolean = true;

  return (
    <>
      <ClosetHeader parsedId={parsedId} accessToken={accessToken} isMe={isMe} />
      <ClosetBody parsedId={parsedId} />
    </>
  );
}
