import ItemList from './ItemList';
import styles from './index.module.css';

export default function HomePage() {
  return (
    <div className={styles.mainContent}>
      <ItemList />
    </div>
  );
}
