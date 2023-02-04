export function formatColorReview(color: string) {
  switch (color) {
    case 'bright':
      return '선명해요';
    case 'mid':
      return '보통이에요';
    case 'dim':
      return '어두워요';
    default:
      throw new Error('Unknown color: ' + color);
  }
}

export function formatSizeReview(size: string) {
  switch (size) {
    case 'large':
      return '커요';
    case 'mid':
      return '보통이에요';
    case 'small':
      return '작아요';
    default:
      throw new Error('Unknown size: ' + size);
  }
}
