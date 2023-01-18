import ReviewBoxLayout from "./ReviewBoxLayout";
import {useState} from 'react';
import {Review} from '../../lib/interface';

interface DataType {
    data: Review;
}

export default function ReviewBox({data}: DataType) {
    const sexText = () => {
        if (data.user.sex === 'male')
        {
            return '남성';
        }
        else if (data.user.sex === 'female')
        {
            return '여성';
        }
        else
        {
            return '';
        }
    }
    const sizeText = () => {
        if (data.size === 'large')
        {
            return '커요';
        }
        else if (data.size === 'mid')
        {
            return '보통이에요';
        }
        else
        {
            return '작아요';
        }
    }
    const colorText = () => {
        if (data.color === 'bright')
        {
            return '밝아요';
        }
        else if (data.color === 'mid')
        {
            return '보통이에요';
        }
        else
        {
            return '어두워요';
        }
    }
    const [moreCommentBool, setMoreCommentBool] = useState<boolean>(false);
    const onClick = () => {
        setMoreCommentBool(true);
    }




    return (<ReviewBoxLayout
    username={data.user.nickname} profileImageUrl={data.user.image} reviewDate={data.createdDateTime} sex={sexText()
    } height={data.user.height} weight={data.user.weight} goodsImageUrl={data.purchase.item.images[0]} goodsName={data.purchase.item.name} goodsOption={data.purchase.option}
    reviewStar={data.rating} reviewId={data.id} reviewContent={data.content} size={sizeText()} color={colorText()} images={data.images}
    commentCount={data.comments.length} comments={data.comments} moreCommentBool={moreCommentBool} onClick={onClick}></ReviewBoxLayout>);
}