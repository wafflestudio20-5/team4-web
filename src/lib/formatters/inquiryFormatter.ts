export function formatTypeInquiry(type: string) {
  switch (type) {
    case 'size':
      return '사이즈';
    case 'delivery':
      return '배송';
    case 'restock':
      return '재입고';
    case 'detail':
      return '상품상세문의';
    default:
      throw new Error('Unknown size: ' + type);
  }
}
