import styles from "./MyPageWriteReviewsLayout.module.scss";
import {Purchase} from "../../../lib/interface";
import StarRateInput from "./StarRateInput";
import React from "react";
interface Input {
    rating: number;
    content: string;
    size: string;
    color: string;
    images: string[];
}

interface MyPageWriteReviewsLayoutParams {
    data: Purchase;
    input: Input;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setInput: (x: Input) => void;
    onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onTextClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onImageClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isText: boolean;
    handleClick: () => void;
    handleSubmit: (e: React.SyntheticEvent) => void;
    images: string[];
}


export default function MyPageWriteReviewsLayout({data, input, onChange, setInput, onChangeTextArea, onTextClick, onImageClick, isText, handleClick, handleSubmit, images}:MyPageWriteReviewsLayoutParams) {

    return (<div className={styles.reviewWrapper}>
        <header className={styles.reviewHeader}>
            <h1>후기작성</h1>
        </header>
        <ul>
            <li>작성하신 후기는 무신사 스토어 및 무신사 글로벌 이용자에게 공개됩니다. 댓글은 무신사에서 확인하지 않습니다.</li>
            <li>상품 사진 후기 작성 시 1,000원의 적립금을 평일 기준 2일 전후로 지급합니다.</li>
            <li>
                아래에 해당할 경우 적립금 지급이 보류되며, 이미 지급받으셨더라도 2차 검수를 통해 적립금을 회수할 수 있습니다. 또한 일부 후기는 조건에 따라 비노출 처리됩니다.
                <br />- 포장이 제거되지 않았거나 상품의 전체 형태가 또렷하게 보이지 않는 후기
                    <br />- 상품을 직접 착용한 사진을 사용한 후기
                        <br />- 상품과 관련없거나 문자 및 기호의 단순 나열, 반복된 내용의 후기
                            <br />- 개인정보 및 광고, 비속어가 포함된 내용의 후기 (비노출 대상)
                                <br />- 상품 상세 페이지 등의 판매 이미지 사용, 관련없는 상품의 사진, 타인의 사진을 도용한 후기 (비노출 대상)
            </li>
            <li>특히 후기 도용 시 적립금 2배 회수, 1년간 커뮤니티 이용 제한, 3개월간 후기 적립금 지급이 중단됩니다.</li>

            <li>신체정보(성별, 키, 몸무게)는 수집ㆍ이용 동의 시 후기 서비스 제공 목적으로만 이용되며, 무신사 개인정보 처리방침에 따라 처리됩니다.</li>
        </ul>
        <div className={styles.reviewWrite}>
            <div className={styles.reviewItem}>
                <a href={`/goods/${data?.item.id}`}>
                    <img src={data?.item.images[0]} alt={data?.item.name}/>
                </a>
                <ul>
                    <li className={styles.brand}>{data?.item.brand}</li>
                    <li className={styles.name}>{data?.item.name}</li>
                    <li className={styles.option}>{data?.option}</li>
                </ul>
            </div>
            <div className={styles.reviewRating}>
                <span className={styles.reviewRatingText}>별점을 매겨주세요</span>
                <StarRateInput input={input} setInput={setInput}/>
            </div>
            <ul className={styles.radioUl}>
                <li className={styles.radioLi}>
                    <span>사이즈</span>
                    <span className={styles.inputWrap}>
                        <input type="radio" id="ch1" value="large" name="size" onChange={onChange} checked={input.size==='large'}></input>
                        <label htmlFor="ch1">커요</label>
                        <input type="radio" id="ch2" value="mid" name="size" onChange={onChange} checked={input.size==='mid'}></input>
                        <label htmlFor="ch2">보통이에요</label>
                        <input type="radio" id="ch3" value="small" name="size" onChange={onChange} checked={input.size==='small'}></input>
                        <label htmlFor="ch3">작아요</label>
                    </span>
                </li>
            </ul>
            <ul className={styles.radioUl}>
                <li className={styles.radioLi}>
                    <span>색감</span>
                    <span className={styles.inputWrap}>
                        <input type="radio" id="ch4" value="bright" name="color" onChange={onChange} checked={input.color==='bright'}></input>
                        <label htmlFor="ch4">선명해요</label>
                        <input type="radio" id="ch5" value="mid" name="color" onChange={onChange} checked={input.color==='mid'}></input>
                        <label htmlFor="ch5">보통이에요</label>
                        <input type="radio" id="ch6" value="dim" name="color" onChange={onChange} checked={input.color==='dim'}></input>
                        <label htmlFor="ch6">어두워요</label>
                    </span>
                </li>
            </ul>
            <div className={styles.reviewWriteInputArea}>
                <label htmlFor="reviewWriteInput">상품에 대한 평가를 20자 이상 작성해 주세요.</label>

                {isText ? <div className={styles.reviewWriteInputWrap}>
                    <textarea className={styles.reviewWriteInput} id="reviewWriteInput" value={input.content} onChange={onChangeTextArea} name="content">
                    </textarea>
                    <div className={styles.reviewWriteInputCount}>{input.content.length} 자/20자 이상</div>
                </div> : <div className={styles.reviewImageInputWrap}>
                    {images.map((img, idx) => (
                        <span><img src={img} alt={`${idx}`} key={idx}></img></span>
                        ))}
                    <span className={styles.reviewImageInput} onClick={handleClick}>+</span>
                </div>}

                <div className={styles.utilityArea}>
                    <button className={styles.textButton} onClick={onTextClick}>글 작성</button>
                    <button className={styles.imageButton} onClick={onImageClick}>이미지 업로드</button>
                </div>
            </div>
            <div className={styles.postButtonArea}>
                <form onSubmit={handleSubmit}><button className={styles.postButton}>등록</button></form>
            </div>




        </div>

    </div>);
}