import { Outlet } from 'react-router-dom';
import StyleModalLayout from './StyleModalLayout';

export default function StyleModal() {
  return (
    <>
      <StyleModalLayout />
      <Outlet />
    </>
  );
}
