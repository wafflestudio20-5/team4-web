import styles from './StyleListPageHeader.module.scss';

export default function ItemListPageHeader() {
  return (
    <div className={styles.pagenation}>
      <div className={styles.nav_sub}>
        <span>무신사 스토어</span>
        <span className={styles.iconEntity}>{'>'}</span>
        <span className={styles.navi}>스타일</span>
      </div>
    </div>
  );
}
