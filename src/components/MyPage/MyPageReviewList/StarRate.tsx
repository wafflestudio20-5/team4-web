import { useState, useEffect } from "react";

interface StarRateType {
  rating_score: number | undefined;
  review_id: number | undefined;
}
function StarRate({ rating_score, review_id }: StarRateType) {
  const AVR_RATE = rating_score! * 10;
  const STAR_IDX_ARR = ["first", "second", "third", "fourth", "last"];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE * 70) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    return tempStarRatesArr;
  };
  useEffect(() => {
    setRatesResArr(calcStarRates);
  }, [rating_score]);
  return (
    <>
      {STAR_IDX_ARR.map((item, idx) => {
        return (
          <span className="star_icon" key={`${item}_${idx}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 14 13"
              fill="#cacaca"
            >
              <clipPath id={`${item}${review_id}StarClip`}>
                <rect width={`${ratesResArr[idx]}`} height="39" />
              </clipPath>
              <path
                id={`${item}${review_id}Star`}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use
                clipPath={`url(#${item}${review_id}StarClip)`}
                href={`#${item}${review_id}Star`}
                fill="#F0975E"
              />
            </svg>
          </span>
        );
      })}
    </>
  );
}

export default StarRate;
