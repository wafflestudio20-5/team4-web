import { User } from '../../lib/interface';

interface MyPageUserInfoProps {
  user: User | null;
}

export default function MyPageUserInfo({ user }: MyPageUserInfoProps) {
  return <div>UserInfo</div>;
}
