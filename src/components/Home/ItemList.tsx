import styles from './index.module.css';

export default function ItemList() {
  return (
    <div className={styles.itemList}>
      <ItemListCategory />
      <div className={styles.itemListBox}>
        <ItemPreview />
        <ItemPreview />
        <ItemPreview />
        <ItemPreview />
        <ItemPreview />
        <ItemPreview />
        <ItemPreview />
        <ItemPreview />
      </div>
    </div>
  );
}

export function ItemListCategory() {
  return <div className={styles.itemListCategory}></div>;
}

export function ItemPreview() {
  return <div className={styles.itemPreview}></div>;
}
