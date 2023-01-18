import MyPageWriteReviewsLayout from "./MyPageWriteReviewsLayout";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {Purchase} from "../../../lib/interface";

export default function MyPageWriteReviews() {
    const location = useLocation();

    const data = location.state as Purchase;

    const [input, setInput] = useState({
        rating: 0,
        size: '',
        color: '',
        content: '',
        images: [''],
        }
    );
    const [isText, setIsText] = useState<boolean>(true);
    const onTextClick = (e: React.MouseEvent<HTMLElement>) => {
        setIsText(true);
    }
    const onImageClick = (e: React.MouseEvent<HTMLElement>) => {
        setIsText(false);
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]: value});
    }
    const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput({...input, content: e.target.value});
    }

    useEffect(()=> {
        console.log(input);
    }, [input]);

    return (<MyPageWriteReviewsLayout data={data} input={input} onChange={onChange} setInput={setInput} onChangeTextArea={onChangeTextArea}
    onTextClick={onTextClick} onImageClick={onImageClick} isText={isText}></MyPageWriteReviewsLayout>);
}