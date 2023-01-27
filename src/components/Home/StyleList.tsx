// import { useApiData, useApiStyleListFetcher } from '../../lib/api';
import { Style } from '../../lib/interface';
import styles from './StyleList.module.scss';
import styled from 'styled-components';
import StylePreview from './StylePreview';
import { useNavigate } from 'react-router-dom';
import { styleList } from './mockstyle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ReactComponent as Next } from '../../resources/image/forward.svg';
import { ReactComponent as Before } from '../../resources/image/back.svg';

interface StylePreviewListProps {
  styleList: Style[] | null;
}

export default function StyleList() {
  //   const { data: styleData } = useApiData(
  //     useApiStyleListFetcher(0, 10, undefined)
  //   );
  //   const styleList = styleData?.styles ?? null;

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
    nextArrow: (
      <Div>
        <Next />
      </Div>
    ),
    prevArrow: (
      <DivPre className={styles.slideButton}>
        <Before />
      </DivPre>
    ),
  };
  return (
    <div className={styles.itemListBox}>
      <StyledSlider {...settings}>
        {styleList?.map((styleSingle) => (
          <StylePreview
            key={styleSingle.id}
            styleSingle={styleSingle}
          ></StylePreview>
        ))}
      </StyledSlider>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  z-index: 99;
  right: -30px;
`;
const DivPre = styled.div`
  width: 30px;
  height: 30px;
  z-index: 99;
  left: -35px;
`;
