import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store';
import { postLogout } from '../../store/slices/session';
import { Session } from '../../lib/interface';
import MemberHeader from './MemberHeader';

function SubHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { user, accessToken } = session;

  const onLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (accessToken) await dispatch(postLogout(accessToken));
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
