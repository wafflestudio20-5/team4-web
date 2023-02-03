import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Session } from '../../lib/interface';
import { RootState } from '../../store';
import ClosetOther from './ClosetOther';
import ClosetMy from './ClosetMy';
import StyleWrite from './ClosetStylePost';

export default function Closet() {
  const session: Session = useSelector((state: RootState) => {
    return state.session;
  });

  const { user, accessToken } = session;

  if (user !== undefined)
    return (
      <>
        <Routes>
          <Route
            path=":id"
            element={<ClosetOther user={user} accessToken={accessToken} />}
          />
          <Route
            path="my"
            element={<ClosetMy user={user} accessToken={accessToken} />}
          />
          <Route
            path="style/write"
            element={<StyleWrite user={user} accessToken={accessToken} />}
          />
        </Routes>
      </>
    );
}
