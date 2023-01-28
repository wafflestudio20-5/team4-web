import ClosetHeader from './ClosetHeader';
import ClosetBody from './ClosetBody';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Session } from '../../lib/interface';
import { RootState } from '../../store';
import { useParams } from 'react-router-dom';

export default function Closet() {
  // const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const parsedId = id ? parseInt(id) : null;
  console.log(parsedId);

  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { accessToken } = session;

  return (
    <>
      <ClosetHeader parsedId={parsedId} accessToken={accessToken} />
      <ClosetBody parsedId={parsedId} />
    </>
  );
}
