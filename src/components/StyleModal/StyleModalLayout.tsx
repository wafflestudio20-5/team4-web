import styles from './StyleModalLayout.module.scss';

function StyleModalImages() {
  return <div className={styles.images}></div>;
}

function StyleModalBody() {
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div className={styles.profile}>
          <img
            className={styles.profile_image}
            src="https://image.msscdn.net/mfile_s01/_simbols/_basic/k.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default function StyleModalLayout() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <StyleModalImages />
        <StyleModalBody />
      </div>
    </div>
  );
}
