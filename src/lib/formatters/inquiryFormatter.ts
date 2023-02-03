import { InquiryType } from '../interface';

export function formatInquiryType(inquiryType: InquiryType) {
  switch (inquiryType) {
    case InquiryType.delivery:
      return '배송';
    case InquiryType.detail:
      return '상품상세문의';
    case InquiryType.restock:
      return '재입고';
    case InquiryType.size:
      return '사이즈';
    default:
      throw new Error('Unknown Inquiry Type: ' + inquiryType);
  }
}
