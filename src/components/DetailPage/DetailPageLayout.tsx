import { Link } from 'react-router-dom';
import {
  Item,
  Category,
  SubCategory,
  displayCategory,
  displaySubCategory,
  displaySex,
} from '../../lib/interface';
import { formatRating } from '../../lib/formatters/ratingFormatter';
import styles from './DetailPageLayout.module.scss';

interface DetailPageHeaderProps {
  name: string;
  category: Category;
  subCategory: SubCategory;
}

function DetailPageHeader({
  name,
  category,
  subCategory,
}: DetailPageHeaderProps) {
  return (
    <>
      <div className={styles.category}>
        <span>
          {/* 백엔드 수정 이후에 고칠 예정 */}
          <Link to="/">
            {displayCategory(category.toLowerCase() as Category)}
          </Link>
          {' > '}
          <Link to="/">
            {displaySubCategory(subCategory.toLowerCase() as SubCategory)}
          </Link>
        </span>
      </div>
      <div className={styles.name}>{name}</div>
    </>
  );
}

interface DetailPageBodyLeftProps {
  images: string[];
}

function DetailPageBodyLeft({ images }: DetailPageBodyLeftProps) {
  return (
    <div className={styles.body_left}>
      <div className={styles.image_main}>
        <img src={images[0]} alt="상품 이미지를 가져오는 데 실패했습니다." />
      </div>
      <ul className={styles.image_list}>
        {images.map((image, idx) => (
          <li key={idx}>
            <img src={image} alt="이미지 로딩 중" />
          </li>
        ))}
      </ul>
    </div>
  );
}

interface DetailPageBodyRightProps {
  item: Item;
}

function DetailPageBodyRight({ item }: DetailPageBodyRightProps) {
  return (
    <div className={styles.body_right}>
      <div id="product_info" className={styles.info_box}>
        <div className={styles.info_header}>
          Product Info <span>제품정보</span>
        </div>
        <ul className={styles.info_body}>
          <li>
            <span className={styles.info_title}>브랜드</span>
            <span className={styles.info_content}>{item.brand}</span>
          </li>
          <li>
            <span className={styles.info_title}>성별</span>
            <span className={styles.info_content}>{displaySex(item.sex)}</span>
          </li>
          <li>
            {/* 구현할지 말지 고민 필요 */}
            <span className={styles.info_title}>{'조회수(1개월)'}</span>
            <span className={styles.info_content}>{'8.1만 회 이상'}</span>
          </li>
          <li>
            <span className={styles.info_title}>구매 후기</span>
            <span className={styles.info_content}>
              {formatRating(item.rating)}
            </span>
          </li>
        </ul>
      </div>
      <div id="delivery_info" className={styles.info_box}></div>
      <div id="price_info" className={styles.info_box}></div>
    </div>
  );
}

interface DetailPageLayoutProps {
  item: Item;
}

export default function DetailPageLayout({ item }: DetailPageLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <DetailPageHeader
        name={item.name}
        category={item.category}
        subCategory={item.subCategory}
      />
      <div className={styles.body}>
        <DetailPageBodyLeft images={item.images} />
        <DetailPageBodyRight item={item} />
      </div>
    </div>
  );
}
