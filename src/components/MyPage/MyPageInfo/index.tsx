import { useState } from 'react';
import { User } from '../../../lib/interface';
import styles from './MyPageInfo.module.scss';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import LoadingModal from './LoadingModal';

interface MyPageInfoProps {
  user: User;
  accessToken: string | null;
}

export default function MyPageInfo({ user, accessToken }: MyPageInfoProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className={styles.wrapper}>
        <BasicInfo
          user={user}
          accessToken={accessToken}
          setIsLoading={setIsLoading}
        />
        <AdditionalInfo user={user} accessToken={accessToken} />
      </div>
    </>
  );
}
