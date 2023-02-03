import StyleWriteLayout from './StyleWriteLayout';
import React, { useEffect, useState } from 'react';
import {
  apiPostImage,
  apiPostStyle,
  useApiData,
  useApiGetPurchaseListFetcher,
} from '../../../lib/api';
import { FileUpload, useFileUpload } from 'use-file-upload';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../lib/interface';
import ClosetHeader from '../ClosetHeader';
interface Input {
  content: string;
  hashtag: string;
  itemIds: number[];
}

export default function StyleWrite({
  user,
  accessToken,
}: {
  user: User | null;
  accessToken: string | null;
}) {
  const [input, setInput] = useState<Input>({
    content: '',
    hashtag: '',
    itemIds: [],
  });
  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };
  const [tempSelect, setTempSelect] = useState<number>(-1);
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInput({ ...input, itemIds: [...input.itemIds, Number(e.target.value)] });
  };
  const onRemove = (id: number) => {
    setInput({
      ...input,
      itemIds: input.itemIds.filter((itemId) => itemId !== id),
    });
    setTempSelect(-1);
  };

  const { data: purchasesData } = useApiData(
    useApiGetPurchaseListFetcher(accessToken)
  );

  const purchases = purchasesData?.purchaseItems ?? null;

  const navigate = useNavigate();

  const [imageFiles, setImageFiles] = useFileUpload();
  const [images, setImages] = useState<string[]>([]);

  const handleClick = () => {
    setImageFiles({ accept: 'image/*', multiple: true }, setImageFilesCallBack);
  };

  const setImageFilesCallBack = (files: FileUpload | [FileUpload]) => {
    const fileArray = files as FileUpload[]; // map 사용을 위해 type casting
    if (fileArray.length > 5) {
      toast('이미지는 5장까지만 업로드 가능합니다');
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
    if (input.itemIds.length === 0) {
      toast('아이템을 선택해주세요');
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
      await apiPostImage(formData, accessToken)
        .then((response) => {
          secureImages = response.data.secureImages;
        })
        .catch((error) => {
          if (error.response.status === 413) {
            toast('업로드할 파일 크기가 초과되었습니다');
          }
          return null;
        });
      apiPostStyle(
        accessToken,
        secureImages,
        input.itemIds,
        input.content,
        input.hashtag
      ).then((response) => navigate(-1));
    } else {
      toast('이미지를 업로드해주세요');
    }
    // TODO: 이미지 업로드 후 return된 secureImages를 request body에 포함하여 게시글 POST
    // await axios.post('게시글 관련 API', {..., secureImages})
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });
  const parsedId = user?.id ?? null;
  const isMe: boolean = true;

  return (
    <>
      <ClosetHeader parsedId={parsedId} accessToken={accessToken} isMe={isMe} />
      <StyleWriteLayout
        images={images}
        handleClick={handleClick}
        input={input}
        onChangeTextArea={onChangeTextArea}
        purchases={purchases}
        onChangeSelect={onChangeSelect}
        tempSelect={tempSelect}
        onRemove={onRemove}
        handleSubmit={handleSubmit}
      ></StyleWriteLayout>
    </>
  );
}
