import { useApiData, useApiStyleListFetcher } from '../../lib/api';
import { Style } from '../../lib/interface';
import styles from './StyleList.module.scss';
import StylePreview from './StylePreview';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import './slick.scss';
import './slick-theme.scss';
import forward from '../../resources/image/forwardArrow.svg';
import backward from '../../resources/image/backwardArrow.svg';

interface StylePreviewListProps {
  styleList: Style[] | null;
}

export default function StyleList() {
  const { data: styleData } = useApiData(
    useApiStyleListFetcher(0, 30, undefined)
  );
  const styleList = styleData?.styles ?? null;

  const navigate = useNavigate();
  return (
    <div className={styles.itemList}>
      <div className={styles.itemListCategory}>
        <div className={styles.title}>
          <div>스타일</div>
        </div>
      </div>
      <div className={styles.StyleSlideArea}>
        <StylePreviewList styleList={styleList}></StylePreviewList>
      </div>
      <div className={styles.moreView}>
        <button
          onClick={() => {
            navigate('/stylelist');
          }}
        >
          스타일 더 보기 {' >'}
        </button>
      </div>
    </div>
  );
}

function StylePreviewList({ styleList }: StylePreviewListProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    Arrow: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <BeforeArrow />,
  };
  return (
    <div className={styles.itemListBox}>
      <Slider {...settings}>
        {styleList?.map((styleSingle) => (
          <StylePreview
            key={styleSingle.id}
            styleSingle={styleSingle}
          ></StylePreview>
        ))}
      </Slider>
    </div>
  );
}

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function NextArrow({ onClick }: ArrowProps) {
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      <img className={styles.previewImage} src={forward} alt="다음 슬라이드" />
    </div>
  );
}

export function BeforeArrow({ onClick }: ArrowProps) {
  return (
    <div className={styles.beforeArrow} onClick={onClick}>
      <img className={styles.previewImage} src={backward} alt="이전 슬라이드" />
    </div>
  );
}
