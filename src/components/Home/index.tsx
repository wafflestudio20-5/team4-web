import React from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './index.module.css';
import CategorySideBar from './CategorySideBar';
import ItemList from './ItemList';

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
