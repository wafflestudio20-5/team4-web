import { Link } from 'react-router-dom';
import {
  Item,
  Label,
  Category,
  SubCategory,
  displaySex,
  displayLabel,
  displayCategory,
  displaySubCategory,
} from '../../lib/interface';
import { getLabelDescription } from '../../lib/formatters/labelFormatter';
import {
  formatRating,
  getBarWidth,
} from '../../lib/formatters/ratingFormatter';
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
          <Link to="/">{displayCategory(category)}</Link>
          {' > '}
          <Link to="/">{displaySubCategory(subCategory)}</Link>
        </span>
      </div>
      <div className={styles.name}>{name}</div>
    </>
  );
}

interface ImageInfoProps {
  images: string[];
}

function ImageInfo({ images }: ImageInfoProps) {
  return (
    <>
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
    </>
  );
}

interface LabelInfoProps {
  label: Label | undefined;
}

function LabelInfo({ label }: LabelInfoProps) {
  if (label && Object.keys(Label).includes(label))
    return (
      <div className={styles.info_box} style={{ paddingBottom: '18px' }}>
        <div className={styles.info_header}>
          {label.charAt(0).toUpperCase() + label.slice(1) + ' '}
          <span>{displayLabel(label)}</span>
        </div>
        {label === Label.boutique && (
          <ul className={styles.info_body}>
            <li>
              <span className={styles.info_title}>상품 구분</span>
              <span className={styles.info_content}>부티크 상품</span>
            </li>
          </ul>
        )}
        <span className={styles.label_description}>
          {getLabelDescription(label)}
        </span>
      </div>
    );
  else return null;
}

interface ProductInfoProps {
  brand: string;
  sex: string;
  rating: number;
}

function ProductInfo({ brand, sex, rating }: ProductInfoProps) {
  return (
    <div className={styles.info_box}>
      <div className={styles.info_header}>
        Product Info <span>제품정보</span>
      </div>
      <ul className={styles.info_body}>
        <li>
          <span className={styles.info_title}>브랜드</span>
          <span className={styles.info_content}>{brand}</span>
        </li>
        <li>
          <span className={styles.info_title}>성별</span>
          <span className={styles.info_content}>{displaySex(sex)}</span>
        </li>
        <li>
          {/* 구현할지 말지 고민 필요 */}
          <span className={styles.info_title}>{'조회수(1개월)'}</span>
          <span className={styles.info_content}>{'8.1만 회 이상'}</span>
        </li>
        <li>
          <span className={styles.info_title}>구매 후기</span>
          <span className={styles.info_content}>
            <span className={styles.star_background}>
              <span
                className={styles.star_bar}
                style={{
                  width: `${getBarWidth(rating)}%`,
                }}
              />
            </span>
            <span className={styles.rating}>{formatRating(rating)}</span>
            <span className={styles.slash}>/</span>
            <span className={styles.review_link}>후기 550개 보기</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

interface PriceInfoProps {
  oldPrice: number;
  newPrice: number | undefined;
  sale: number | undefined;
}

function PriceInfo({ oldPrice, newPrice, sale }: PriceInfoProps) {
  const point = newPrice
    ? Math.floor(newPrice * 0.1)
    : Math.floor(oldPrice * 0.1);
  return (
    <div className={styles.info_box}>
      <div className={styles.info_header}>
        Price Info <span>가격정보</span>
      </div>
      <ul className={styles.info_body}>
        <li>
          <span className={styles.info_title}>무신사 판매가</span>
          <div className={styles.info_price}>
            <span className={styles.old_price}>
              {oldPrice.toLocaleString() + '원'}
            </span>
          </div>
        </li>
        {newPrice && sale && (
          <li>
            <span className={styles.info_title}>무신사 회원가</span>
            <div className={styles.info_price}>
              <span className={styles.new_price}>
                {newPrice.toLocaleString() + '원'}
              </span>
              <span className={styles.sale}>
                <span>{sale + '% 이상 할인'}</span>
              </span>
            </div>
          </li>
        )}
        <li>
          <span className={styles.info_title}>무신사 적립금</span>
          <span className={styles.info_content}>
            {point.toLocaleString() + '원'}
          </span>
        </li>
      </ul>
      <div className={styles.textbox_red}>
        {' 전 상품 무료배송 (가구 등 일부 상품 제외) '}
      </div>
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
        <div className={styles.body_left}>
          <ImageInfo images={item.images} />
        </div>
        <div className={styles.body_right}>
          <LabelInfo label={item.label} />
          <ProductInfo brand={item.brand} sex={item.sex} rating={item.rating} />
          <PriceInfo
            oldPrice={item.oldPrice}
            newPrice={item.newPrice}
            sale={item.sale}
          />
        </div>
      </div>
    </div>
  );
}
