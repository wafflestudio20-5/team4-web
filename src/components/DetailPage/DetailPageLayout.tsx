import { Link, createSearchParams } from 'react-router-dom';
import { PurchaseDraft, AddToCartModalState } from '.';
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
import React from 'react';

interface DetailPageHeaderProps {
  category: Category;
  subCategory: SubCategory;
}

function DetailPageHeader({ category, subCategory }: DetailPageHeaderProps) {
  return (
    <div className={styles.category}>
      <span>
        <Link
          to={{
            pathname: '/itemlist',
            search: `?${createSearchParams({
              type: 'category',
              q: category,
            })}`,
          }}
        >
          {displayCategory(category)}
        </Link>
        {' > '}
        <Link
          to={{
            pathname: '/itemlist',
            search: `?${createSearchParams({
              type: 'subcategory',
              q: subCategory,
            })}`,
          }}
        >
          {displaySubCategory(subCategory)}
        </Link>
      </span>
    </div>
  );
}

interface ImageInfoProps {
  images: string[];
  displayIdx: number;
  setDisplay: (idx: number) => void;
}

function ImageInfo({ images, displayIdx, setDisplay }: ImageInfoProps) {
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
            onMouseOver={() => setDisplay(idx)}
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
  reviewCount: number;
}

function ProductInfo({ brand, sex, rating, reviewCount }: ProductInfoProps) {
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
          <span className={styles.info_title}>구매 후기</span>
          <span className={styles.info_content}>
            {reviewCount > 0 ? (
              <>
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
              </>
            ) : (
              <span className={styles.review_none}>
                후기가 아직 없는 상품입니다.
              </span>
            )}
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
  return (
    <div className={styles.info_box}>
      <div className={styles.info_header}>
        Price Info <span>가격정보</span>
      </div>
      <ul className={styles.info_body}>
        {newPrice && sale ? (
          <>
            <li>
              <span className={styles.info_title}>무신사 판매가</span>
              <div className={styles.info_price}>
                <span className={styles.crossed_out_price}>
                  {oldPrice.toLocaleString() + '원'}
                </span>
              </div>
            </li>
            <li>
              <span className={styles.info_title}>무신사 회원가</span>
              <div className={styles.info_price}>
                <span className={styles.real_price}>
                  {newPrice.toLocaleString() + '원'}
                </span>
                <span className={styles.sale}>
                  <span>{sale + '% 이상 할인'}</span>
                </span>
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <span className={styles.info_title}>무신사 판매가</span>
              <div className={styles.info_price}>
                <span className={styles.real_price}>
                  {oldPrice.toLocaleString() + '원'}
                </span>
              </div>
            </li>
          </>
        )}
      </ul>
      <div className={styles.textbox_red}>
        {' 전 상품 무료배송 (가구 등 일부 상품 제외) '}
      </div>
    </div>
  );
}

interface PurchaseAreaProps {
  price: number;
  input: PurchaseDraft;
  options: string[] | undefined;
  modalState: AddToCartModalState;
  onChangeOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClearOption: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrement: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDecrement: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPurchase: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function PurchaseArea({
  price,
  input,
  options,
  modalState,
  onChangeOption,
  onClearOption,
  onChangeQuantity,
  onIncrement,
  onDecrement,
  onPurchase,
  onAddToCart,
}: PurchaseAreaProps) {
  const { option, quantity } = input;
  const { open, visible, message } = modalState;

  return (
    <div className={styles.purchase_box}>
      {options && (
        <div className={styles.dropdown_wrapper}>
          <div className={styles.dropdown}>
            <select value={'옵션 선택'} onChange={onChangeOption}>
              <option>옵션 선택</option>
              {options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {(!options || option) && (
        <div className={styles.selected_wrapper}>
          <div className={styles.selected_bar}>
            <div className={styles.selected_option}>
              <span>{options ? `${option}` : 'FREE'}</span>
            </div>
            <div className={styles.selected_amount}>
              <button
                onClick={onDecrement}
                style={{
                  color: quantity === 1 ? '#ccc' : '#000',
                }}
              >
                -
              </button>
              <input type="text" value={quantity} onChange={onChangeQuantity} />
              <button onClick={onIncrement}>+</button>
            </div>
            <div className={styles.selected_price}>
              <span>{(price * quantity).toLocaleString() + '원'}</span>
              <button onClick={onClearOption} />
            </div>
          </div>
        </div>
      )}
      <div className={styles.total_wrapper}>
        <span>총 상품 금액</span>
        <span>{(price * quantity).toLocaleString() + '원'}</span>
      </div>
      <div className={styles.button_wrapper}>
        <div className={styles.button_grid}>
          <button onClick={onPurchase} className={styles.purchase_button}>
            바로구매
          </button>
          <button onClick={onAddToCart} className={styles.cart_button} />
        </div>
        {visible && (
          <div
            className={`${styles.add_to_cart_modal} ${
              open ? styles.open : styles.close
            }`}
          >
            <span>{message}</span>
            <Link to="/cart">장바구니로 가기</Link>
          </div>
        )}
      </div>
    </div>
  );
}

interface DetailPageLayoutProps {
  item: Item;
  input: PurchaseDraft;
  modalState: AddToCartModalState;
  displayIdx: number;
  setDisplay: (idx: number) => void;
  onChangeOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClearOption: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onIncrement: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDecrement: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onPurchase: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onAddToCart: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function DetailPageLayout({
  item,
  input,
  modalState,
  displayIdx,
  setDisplay,
  onChangeOption,
  onClearOption,
  onChangeQuantity,
  onIncrement,
  onDecrement,
  onPurchase,
  onAddToCart,
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
              setDisplay={setDisplay}
            />
          </div>
          <div className={styles.body_right}>
            <LabelInfo label={item.label} />
            <ProductInfo
              brand={item.brand}
              sex={item.sex}
              rating={item.rating}
              reviewCount={item.reviewCount}
            />
            <PriceInfo
              oldPrice={item.oldPrice}
              newPrice={item.newPrice}
              sale={item.sale}
            />
            <PurchaseArea
              price={item.newPrice ? item.newPrice : item.oldPrice}
              input={input}
              options={item.options}
              modalState={modalState}
              onChangeOption={onChangeOption}
              onClearOption={onClearOption}
              onChangeQuantity={onChangeQuantity}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onPurchase={onPurchase}
              onAddToCart={onAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
