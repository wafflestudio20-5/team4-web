import { useState } from 'react';
import CategorySideBar from './CategorySideBar';
import ItemList from './ItemList';
import styles from './Index.module.css';
import togglebutton from '../../resources/asset/menu.svg';

export default function HomePage() {
  const [openCategorySideBar, setopenCategorySideBar] = useState(false);

  const toggleCategorySideBar = () => {
    setopenCategorySideBar(!openCategorySideBar);
  };

  return (
    <div className={styles.container}>
      {openCategorySideBar && <CategorySideBar />}
      <div className={styles.mainContent}>
        <img
          className={styles.openCategorySideBarButton}
          onClick={toggleCategorySideBar}
          src={togglebutton}
          alt="카테고리더보기"
        ></img>
        <ItemList />
      </div>
    </div>
  );
}
