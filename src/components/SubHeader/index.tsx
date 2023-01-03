import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/sessionSlice';
import { Session } from '../../lib/interface';
import MemberHeader from './MemberHeader';

function SubHeader() {
  const dispatch = useDispatch();
  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { user } = session;

  const onLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout(null));
  };

  return (
    <>
      {/* <ChannelHeader /> */}
      <MemberHeader user={user} onLogout={onLogout} />
      <Outlet />
    </>
  );
}

export default SubHeader;
