import { useState, useEffect, useRef } from 'react';

interface Input {
  rating: number;
  content: string;
  size: string;
  color: string;
}
interface StarRateInputParams {
  input: Input;
  setInput: (x: Input) => void;
}

function StarRateInput({ input, setInput }: StarRateInputParams) {
  const AVR_RATE = useRef(0);
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const calcStarRates = () => {
    let tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE.current * 70) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    setRatesResArr(tempStarRatesArr);
  };

  useEffect(() => {
    if (input.rating === 0) {
      calcStarRates();
    }
  }, [input.rating]);
  useEffect(() => {
    AVR_RATE.current = input.rating * 10;
    calcStarRates();
  }, [input.rating]);
  return (
    <>
      {STAR_IDX_ARR.map((item, idx) => {
        return (
          <span className="star_icon" key={`${item}_${idx}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 14 13"
              fill="#cacaca"
              cursor="pointer"
              onClick={() => {
                AVR_RATE.current = (idx + 1) * 20;
                calcStarRates();
                setInput({ ...input, rating: (idx + 1) * 2 });
              }}
            >
              <clipPath id={`${item}inputStarClip`}>
                <rect
                  width={`${ratesResArr[idx]}`}
                  height="39"
                  onClick={() => {
                    AVR_RATE.current = (idx + 1) * 20;
                    calcStarRates();
                    setInput({ ...input, rating: (idx + 1) * 2 });
                  }}
                />
              </clipPath>
              <path
                id={`${item}inputStar`}
                d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                transform="translate(-2 -2)"
              />
              <use
                clipPath={`url(#${item}inputStarClip)`}
                href={`#${item}inputStar`}
                fill="#F0975E"
              />
            </svg>
          </span>
        );
      })}
    </>
  );
}

export default StarRateInput;
