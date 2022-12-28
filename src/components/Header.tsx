import { Link } from 'react-router-dom';
import logo from '../resources/image/musinsa_logo.png';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <>
      <div className={styles.main}>
        <Link className={styles.title} to="/">
          <img src={logo} alt="logo" />
        </Link>
        <div className={styles.searchBar}></div>
      </div>
      <div className="header-channel">smallHeader</div>
      <div className="header-member"></div>
    </>
  );
}
