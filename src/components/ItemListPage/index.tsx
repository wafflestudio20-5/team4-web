import ItemList from './ItemList';
import ItemListPageHeader from './ItemListPageHeader';
import styles from './index.module.css';
export default function ItemListPage() {
  return (
    <div className={styles.wrap}>
      <ItemListPageHeader />
      <ItemList />
    </div>
  );
}
