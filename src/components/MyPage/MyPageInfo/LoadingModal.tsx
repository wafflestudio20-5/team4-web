import { Oval } from 'react-loader-spinner';
import styles from './MyPageInfo.module.scss';

export default function LoadingModal() {
  return (
    <div className={styles.modalbackground}>
      <div className={styles.modalContainer}>
        <Oval
          height={40}
          width={40}
          color="#d8d8d8"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#d8d8d8"
          strokeWidth={8}
          strokeWidthSecondary={8}
        />
      </div>
    </div>
  );
}
