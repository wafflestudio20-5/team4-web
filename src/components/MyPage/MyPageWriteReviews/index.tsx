import MyPageWriteReviewsLayout from "./MyPageWriteReviewsLayout";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {Purchase} from "../../../lib/interface";
import { FileUpload, useFileUpload } from 'use-file-upload';
import axios from "axios";
import {apiPostReview} from "../../../lib/api";
interface MyPageWriteReviewsParams {
    accessToken: string | null;
}

export default function MyPageWriteReviews({accessToken}: MyPageWriteReviewsParams) {
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

    const [imageFiles, setImageFiles] = useFileUpload();
    const [images, setImages] = useState<string[]>([]);

    const handleClick = () => {
        setImageFiles({ accept: 'image/*', multiple: true }, setImageFilesCallBack);
    };

    const setImageFilesCallBack = (files: FileUpload | [FileUpload]) => {
        const fileArray = files as FileUpload[]; // map 사용을 위해 type casting
        const localImages = fileArray.map((singleFile) => {
            const localImage = URL.createObjectURL(singleFile.file); // 업로드된 파일의 URL 생성 (API 호출 전이므로 DB상의 URL이 아니라 임시적인 로컬 URL)
            return localImage;
        });
        setImages(localImages);
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        let secureImages: string[] = [];
        // 업로드할 이미지가 있는 경우
        if (imageFiles) {
            // 반드시 JSON 형태가 아닌 FormData 형태로 전송
            const formData = new FormData();
            const fileArray = imageFiles as FileUpload[];
            // FormData의 "images" 필드에 file들을 append
            fileArray.forEach((singleFile) =>
                formData.append('images', singleFile.file)
            );
            // 에시 POST (실제 호출 시 api.ts에 따로 함수를 정의하고 auth header 포함하여 요청)
            const response = await axios.post('/api/image-upload', formData);
            console.log(response.data.secureImages); // 업로드한 이미지들의 URL로 이루어진 string[]
            secureImages = response.data.secureImages;

            apiPostReview(data.id, input.rating, input.content, input.size, input.color, secureImages, accessToken);
        }
        // TODO: 이미지 업로드 후 return된 secureImages를 request body에 포함하여 게시글 POST
        // await axios.post('게시글 관련 API', {..., secureImages})
    };

    const submitReview = () => {

    }


    return (<MyPageWriteReviewsLayout data={data} input={input} onChange={onChange} setInput={setInput} onChangeTextArea={onChangeTextArea}
    onTextClick={onTextClick} onImageClick={onImageClick} isText={isText} handleClick={handleClick} handleSubmit={handleSubmit} images={images}></MyPageWriteReviewsLayout>);
}