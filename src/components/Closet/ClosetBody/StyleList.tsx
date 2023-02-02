import StylePreview from './StylePreview';
import styles from './StyleList.module.scss';

interface StyleListProps {
  styleList: { id: number; image: string }[] | null;
}

export default function StyleList({ styleList }: StyleListProps) {
  return (
    <div className={styles.itemList}>
      <StylePreviewList styleList={styleList}></StylePreviewList>
    </div>
  );
}

function StylePreviewList({
  styleList,
}: {
  styleList: { id: number; image: string }[] | null;
}) {
  return (
    <>
      {styleList?.length !== 0 ? (
        <div className={styles.itemListBox}>
          {styleList?.map((styleSingle) => (
            <StylePreview key={styleSingle.id} styleSingle={styleSingle} />
          ))}
        </div>
      ) : (
        <div className={styles.itemNullBox}>
          <div>게시글이 없습니다.</div>
        </div>
      )}
    </>
  );
}
