import { User } from '../../lib/interface';
// import styles from './MyPageMain.module.scss';

interface MyPageMainProps {
  user: User;
}

export default function MyPageOrder({ user }: MyPageMainProps) {
  console.log(user);
  return <div>orderlist</div>;
}
