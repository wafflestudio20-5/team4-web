import axios from 'axios';
import React, { useState } from 'react';
import { FileUpload, useFileUpload } from 'use-file-upload';
import {apiPostImage} from "../../../lib/api";
import {Session} from "../../../lib/interface";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

interface Props {}

const TestPage: React.FC<Props> = () => {
  const [imageFiles, setImageFiles] = useFileUpload();
  const [images, setImages] = useState<string[]>([]);


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
    }
    // TODO: 이미지 업로드 후 return된 secureImages를 request body에 포함하여 게시글 POST
    // await axios.post('게시글 관련 API', {..., secureImages})
  };

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={handleClick}>
          이미지 업로드
        </button>
        <button>제출</button>
      </form>
      {images.map((img, idx) => {
        return <img src={img} alt={`${idx}`} key={idx}></img>;
      })}
    </div>
  );
};

export default TestPage;
