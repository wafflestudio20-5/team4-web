import { useState } from 'react';
import CategorySideBar from './CategorySideBar';
import ItemList from './itemList';
import styles from './index.module.css';
import OpenCateGoryButton from '../../resources/asset/menu.svg';

export default function HomePage() {
  const [openCategorySideBar, setopenCategorySideBar] = useState(false);

  const handleCategorySideBar = () => {
    setopenCategorySideBar(!openCategorySideBar);
  };

  return (
    <div className={styles.container}>
      {openCategorySideBar && <CategorySideBar />}
      <div className={styles.mainContent}>
        <img
          className={styles.openCategorySideBarButton}
          onClick={handleCategorySideBar}
          src={OpenCateGoryButton}
          alt="카테고리더보기"
        ></img>
        <ItemList />
      </div>
    </div>
  );
}
