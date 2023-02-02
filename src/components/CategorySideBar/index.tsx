import styles from './index.module.css';
import { Best, Category, CategoryIncludeBest } from '../../lib/interface';
import { useState } from 'react';
import togglebutton from '../../resources/image/menu.svg';
import { Outlet } from 'react-router-dom';
import SideBarCategory from './SideBarCategory';
import SideBarStyle from './SideBarStyle';

export default function CategorySideBar() {
  const categorys: CategoryIncludeBest[] = Object.values(Category);
  categorys.splice(0, 0, Best.best);
  const [titleCategory, setTitleCategory] = useState<string>('품목');
  const [selectedCategory, setSelectedCategory] = useState<{
    present: CategoryIncludeBest | null;
    before: CategoryIncludeBest | null;
  }>({ present: null, before: null });
  const [openCategorySideBar, setopenCategorySideBar] = useState(true);

  const toggleCategorySideBar = () => {
    setopenCategorySideBar(!openCategorySideBar);
    setSelectedCategory({ ...selectedCategory, before: null });
  };

  return (
    <div className={styles.container}>
      {openCategorySideBar && (
        <div className={styles.categorySideBar}>
          <div className={styles.select}>
            <div
              className={
                titleCategory === '품목' ? styles.buttonselected : styles.button
              }
              onClick={() => {
                setTitleCategory('품목');
              }}
            >
              카테고리
            </div>
            <div
              className={
                titleCategory === '스타일'
                  ? styles.buttonselected
                  : styles.button
              }
              onClick={() => {
                setTitleCategory('스타일');
                setSelectedCategory({ ...selectedCategory, before: null });
              }}
            >
              스타일
            </div>
          </div>
          {titleCategory === '품목' ? (
            <SideBarCategory
              categorys={categorys}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ) : (
            <SideBarStyle />
          )}
        </div>
      )}
      <img
        className={
          openCategorySideBar
            ? styles.closeCategorySideBarButton
            : styles.openCategorySideBarButton
        }
        onClick={toggleCategorySideBar}
        src={togglebutton}
        alt="카테고리더보기"
      ></img>
      <Outlet />
    </div>
  );
}
