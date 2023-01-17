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
  category: Category;
  subCategory: SubCategory;
}

function DetailPageHeader({ category, subCategory }: DetailPageHeaderProps) {
  return (
    <div className={styles.category}>
      <span>
        {/* 이후에 고칠 예정 */}
        <Link to="/">{displayCategory(category)}</Link>
        {' > '}
        <Link to="/">{displaySubCategory(subCategory)}</Link>
      </span>
    </div>
  );
}

interface ImageInfoProps {
  images: string[];
  displayIdx: number;
  changeDisplay: (idx: number) => void;
}

function ImageInfo({ images, displayIdx, changeDisplay }: ImageInfoProps) {
  return (
    <>
      <div className={styles.image_main}>
        <img
          src={images[displayIdx]}
          alt="상품 이미지를 가져오는 데 실패했습니다."
        />
      </div>
      <ul className={styles.image_list}>
        {images.map((image, idx) => (
          <li
            key={idx}
            className={`${styles.image_element} ${
              idx === displayIdx && styles.image_element_on
            }`}
            onMouseOver={() => changeDisplay(idx)}
          >
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

interface PurchaseAreaProps {
  price: number;
  options: string[] | undefined;
}

function PurchaseArea({ price, options }: PurchaseAreaProps) {
  return (
    <div className={styles.purchase_box}>
      {options && (
        <div className={styles.dropdown_wrapper}>
          <div className={styles.dropdown}>
            <select>
              <option value="selected" selected>
                옵션 선택
              </option>
              {options.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {
        /* option 선택했을 때 */ options && (
          <div className={styles.selected_wrapper}>
            <ul>
              {options.map((option, idx) => (
                <li key={idx} className={styles.selected_bar}>
                  <div className={styles.selected_option}>
                    <span>{option}</span>
                  </div>
                  <div className={styles.selected_amount}>
                    <button>-</button>
                    <input type="text" value="1" />
                    <button>+</button>
                  </div>
                  <div className={styles.selected_price}>
                    <span>{price.toLocaleString() + '원'}</span>
                    <button />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      }
      {
        /* 선택된 게 하나라도 있을 때 */ options && (
          <div className={styles.total_wrapper}>
            <span>총 상품 금액</span>
            <span>{(price * options.length).toLocaleString() + '원'}</span>
          </div>
        )
      }
      <div className={styles.button_wrapper}>
        <button className={styles.purchase_button}>바로구매</button>
        <button className={styles.cart_button} />
      </div>
    </div>
  );
}

interface DetailPageLayoutProps {
  item: Item;
  displayIdx: number;
  changeDisplay: (idx: number) => void;
}

export default function DetailPageLayout({
  item,
  displayIdx,
  changeDisplay,
}: DetailPageLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <DetailPageHeader
        category={item.category}
        subCategory={item.subCategory}
      />
      <div className={styles.body}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.body_grid}>
          <div className={styles.body_left}>
            <ImageInfo
              images={item.images}
              displayIdx={displayIdx}
              changeDisplay={changeDisplay}
            />
          </div>
          <div className={styles.body_right}>
            <LabelInfo label={item.label} />
            <ProductInfo
              brand={item.brand}
              sex={item.sex}
              rating={item.rating}
            />
            <PriceInfo
              oldPrice={item.oldPrice}
              newPrice={item.newPrice}
              sale={item.sale}
            />
            <PurchaseArea
              price={item.newPrice ? item.newPrice : item.oldPrice}
              options={item.options}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
