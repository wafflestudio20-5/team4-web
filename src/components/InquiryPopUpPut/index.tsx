import InquiryPopUpPutLayout from './InquiryPopUpPutLayout';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  apiPostImage,
  apiPutInquiry,
  useApiData,
  useApiInquiryListFetcher,
} from '../../lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import { FileUpload, useFileUpload } from 'use-file-upload';
import { DEFAULT_INQUIRIES_COUNT } from '../MyPage/MyPageInquiryList';

interface inputInterface {
  type: string;
  option: string | undefined;
  isSecret: boolean;
  title: string;
  content: string;
}

export default function InquiryPopUpPut() {
  const { id, index } = useParams<{ id: string; index: string }>();
  const parsedId = id ? parseInt(id) : null;
  const parsedIndex = index ? parseInt(index) : undefined;

  const { accessToken } = useSelector((state: RootState) => {
    return state.session;
  });
  const { data: inquiriesData } = useApiData(
    useApiInquiryListFetcher(accessToken, parsedIndex, DEFAULT_INQUIRIES_COUNT)
  );
  const inquiry =
    inquiriesData?.inquiries.filter((inquiry) => inquiry.id === parsedId) ?? [];

  const [input, setInput] = useState<inputInterface>({
    type: inquiry[0]?.type,
    option: inquiry[0]?.option,
    isSecret: inquiry[0]?.isSecret,
    title: inquiry[0]?.title,
    content: inquiry[0]?.content,
  });

  console.log(inquiry[0]?.type);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (input.isSecret === false) {
      setInput({ ...input, isSecret: true });
    } else {
      setInput({ ...input, isSecret: false });
    }
  };
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '옵션 선택') {
      setInput({ ...input, option: undefined });
    } else {
      setInput({ ...input, option: e.target.value });
    }
  };
  const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ ...input, content: e.target.value });
  };

  //input radio //select //input checkbox //input text //textarea

  const [imageFiles, setImageFiles] = useFileUpload();
  const [images, setImages] = useState<string[] | undefined>(undefined);

  const handleClick = () => {
    setImageFiles({ accept: 'image/*', multiple: true }, setImageFilesCallBack);
  };

  const setImageFilesCallBack = (files: FileUpload | [FileUpload]) => {
    const fileArray = files as FileUpload[]; // map 사용을 위해 type casting
    if (fileArray.length > 3) {
      toast('이미지는 3장까지만 업로드 가능합니다');
      return 0;
    }
    const localImages = fileArray.map((singleFile) => {
      const localImage = URL.createObjectURL(singleFile.file); // 업로드된 파일의 URL 생성 (API 호출 전이므로 DB상의 URL이 아니라 임시적인 로컬 URL)
      return localImage;
    });
    setImages(localImages);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let secureImages: string[] = [];
    if (input.option === '') {
      toast('문의유형을 선택해주세요');
      return 0;
    } else if (input.title === '') {
      toast('제목을 입력해주세요');
      return 0;
    } else if (input.content === '') {
      toast('문의내용을 입력해주세요');
      return 0;
    }

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
      const response = await apiPostImage(formData, accessToken);
      console.log(response.data.secureImages); // 업로드한 이미지들의 URL로 이루어진 string[]
      secureImages = response.data.secureImages;

      apiPutInquiry(
        parsedId,
        input.type,
        accessToken,
        input.title,
        input.content,
        input.option,
        input.isSecret,
        secureImages
      )
        .then((response) => {
          toast('상품문의가 수정되었습니다');
          setTimeout(() => window.close(), 3000);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            toast('상품에 존재하지 않는 옵션입니다');
          }
        });
    } else {
      apiPutInquiry(
        parsedId,
        input.type,
        accessToken,
        input.title,
        input.content,
        input.option,
        input.isSecret,
        undefined
      )
        .then((response) => {
          toast('상품문의가 수정되었습니다');
          setTimeout(() => window.close(), 3000);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            toast('상품에 존재하지 않는 옵션입니다');
          }
        });
    }
    // TODO: 이미지 업로드 후 return된 secureImages를 request body에 포함하여 게시글 POST
    // await axios.post('게시글 관련 API', {..., secureImages})
  };

  return (
    <InquiryPopUpPutLayout
      data={inquiry[0]?.item}
      input={input}
      onChange={onChange}
      onChangeCheckbox={onChangeCheckbox}
      onChangeSelect={onChangeSelect}
      onChangeTextarea={onChangeTextarea}
      handleClick={handleClick}
      images={images}
      handleSubmit={handleSubmit}
    ></InquiryPopUpPutLayout>
  );
}
