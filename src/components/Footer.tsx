import { Outlet } from 'react-router-dom';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.banner}>
          FASHION WEB MAGAZINE / LIFE STYLE SELECT SHOP
          <span>WWW.MUSINSA.COM</span>
        </div>
      </div>
    </>
  );
}
