import { useState } from 'react';
import CategorySideBar from './CategorySideBar';
import ItemList from './ItemList';
import styles from './index.module.css';
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import axios from 'axios';

export default function HomePage() {
  axios.defaults.withCredentials = true;
  const [openCategorySideBar, setopenCategorySideBar] = useState(false);

  const handleCategorySideBar = () => {
    setopenCategorySideBar(!openCategorySideBar);
  };

  return (
      <>
      
      <NavigationBar/>
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
      </>
  );
}
