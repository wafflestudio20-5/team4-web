import { Label } from '../interface';

export function getLabelDescription(label: Label) {
  switch (label) {
    case Label.limited:
      return '무신사 스토어를 포함한 제한된 판매처에서만 구매 가능한 상품입니다.';
    case Label.boutique:
      return '무신사 스토어의 부티크는 세계적인 디자이너 브랜드의 상품을 무신사만의 감성으로 엄선하여 제안하는 럭셔리 편집숍입니다. 글로벌 브랜드의 본사, 현지 쇼룸 및 유명 숍으로부터 수입 또는 매입한 정품 혹은 브랜드에서 공식 입점하여 판매하는 정품만을 취급하며, 안전하고 빠른 국내 배송 시스템을 통해 폭넓은 상품을 제공합니다.';
    case Label.preorder:
      return '무신사 스토어에서 선발매 행사 진행 중인 상품입니다.';
    case Label.exclusive:
      return '무신사 스토어에서만 단독 판매하는 상품입니다.';
    default:
      throw new Error('Unknown Label: ' + label);
  }
}
