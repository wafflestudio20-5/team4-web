import { User } from '../../../lib/interface';

interface MyPageMainProps {
  user: User;
}

export default function MyPageOrder({ user }: MyPageMainProps) {
  console.log(user);
  return <div>orderlist</div>;
}
