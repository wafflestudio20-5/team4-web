import { useState } from 'react';
import CategorySideBar from './CategorySideBar';
import ItemList from './ItemList';
import styles from './index.module.css';

export default function HomePage() {
  const [openCategorySideBar, setopenCategorySideBar] = useState(false);

  const handleCategorySideBar = () => {
    setopenCategorySideBar(!openCategorySideBar);
  };

  return (
    <div className={styles.container}>
      {openCategorySideBar && <CategorySideBar />}
      <div className={styles.mainContent}>
        <button
          className={styles.openCategorySideBarButton}
          onClick={handleCategorySideBar}
        ></button>
        <ItemList />
        <ItemList />
      </div>
    </div>
  );
}
