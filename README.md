## MUSIN4 프로젝트 소개

온라인 쇼핑몰 [무신사](https://www.musinsa.com/app/)를 클론코딩했습니다.
<br />
<br />
회원 관리, 패션 아이템 구매, 후기 작성, 상품 문의 등의 기능을 모두 구현했으며,
<br />
추가 기능으로 회원이 직접 구매한 옷으로 피드를 꾸밀 수 있는 **옷장 페이지**와 **스타일 탭**을 구현했습니다.
<br />
또한 기존 무신사 홈페이지는UI/UX 적으로 부족한 부분이 많다고 느껴, 레이아웃 및 기능을 **그대로 클론하지 않고 Develop** 했습니다.

배포 주소: [https://dllflfuvssxc9.cloudfront.net/](https://dllflfuvssxc9.cloudfront.net/)

## 개발자

#### 프론트엔드

- [김승진(ksj-hikoo)](https://github.com/ksj-hikoo)
- [이석찬(sukchan-0811)](https://github.com/sukchan-0811)
- [이재운(TheoLee72)](https://github.com/TheoLee72)

#### 디자이너

- [유채원(coco-ball)](https://github.com/coco-ball)

## 기술스택

```json
"axios": "^1.2.1",
"env-cmd": "^10.1.0",
"eslint": "8.22.0",
"prettier": "^2.8.1",
"react": "^18.2.0",
"react-redux": "^8.0.5",
"react-router-dom": "^6.6.0",
"react-slick": "^0.29.0",
"react-toastify": "^9.1.1",
"redux": "^4.2.0",
"sass": "^1.57.1",
"slick-carousel": "^1.8.1",
"typescript": "^4.9.4",
"use-file-upload": "^1.0.11",
```
![cloudinary](https://user-images.githubusercontent.com/96823216/216750090-26015a45-d814-49a8-82a8-28c11f65f83d.png)
<br />
image업로드는 모두 cloudinary서비스를 사용하고 있습니다. 백엔드 db에 사진을 직접 저장하기 보다는 cloudinary에 업로드 하고 사진 url만 저장하는 방식을 사용하고 있습니다.

[노션](https://notion.io)에서 모델과 REST API를 확인할 수 있습니다!

API설계에 있어서, RESTful 하도록 노력을 기울였습니다. API와 모델, 백엔드 패키지 구조는 [백엔드 리드미](https://github.com/wafflestudio20-5/team4-server/blob/main/README.md)를 참고해주세요. 

## 프로젝트 뷰

### 1. 홈페이지

웹사이트의 첫인상인 홈페이지입니다.
<br />
기존 무신사의 홈페이지는 너무 많은 정보를 다 담으려다 난잡해졌다고 생각해서 홈페이지 디자인을 아예 바꿨습니다.
<br />
홈페이지가 세로확장성만 있다고 느껴질 것 같아, 홈페이지 하단 스타일탭을 infinite carousel(슬라이드)로 구현, 가로로도 공간이 느껴지도록 구현했습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 00 29 AM" src="https://user-images.githubusercontent.com/100818542/216706090-81448747-f5d0-4c65-80d5-a35f509e9692.png">

<img width="1552" alt="Screenshot 2023-02-04 at 5 00 36 AM" src="https://user-images.githubusercontent.com/100818542/216706301-b6985f66-a19b-4cd5-9c5b-b0fa10c852e2.png">

#### 기존 무신사 홈페이지

<img width="1552" alt="Screenshot 2023-02-04 at 1 34 16 PM" src="https://user-images.githubusercontent.com/100818542/216748662-846617ad-aacd-4851-bf0b-bba2952cd0d6.png">

### 2. 회원가입 페이지

<img width="1552" alt="Screenshot 2023-02-04 at 5 06 17 AM" src="https://user-images.githubusercontent.com/100818542/216706127-87f25244-5b14-4d37-ae31-41d511bb01dd.png">

### 3. 로그인 페이지

<img width="1552" alt="Screenshot 2023-02-04 at 5 06 56 AM" src="https://user-images.githubusercontent.com/100818542/216706153-d18c9d6b-4d98-4b41-835e-7ea1a2d69a9b.png">

회원가입/로그인 페이지 입니다. 일반 로그인과 카카오 소셜 로그인을 지원하고 있습니다. 

### 4. 아이템 리스트 페이지

상품을 카테고리/서브카테고리/검색어로 찾을 수 있는 아이템 리스트 페이지입니다.<br />
기존 무신사보다 깔끔하게 구현하였고, 무엇보다 sort 변경, pagenation 등 페이지 리렌더가 필요할 때마다 refresh를 해버리는 기존 무신사와 다르게 리렌더 최적화를 했습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 12 53 AM" src="https://user-images.githubusercontent.com/100818542/216706740-87ae2df0-8df1-44ac-b3a9-e9aa3dfed774.png">

#### 기존 무신사 리스트 페이지

<img width="1552" alt="Screenshot 2023-02-04 at 1 38 14 PM" src="https://user-images.githubusercontent.com/100818542/216748780-aba66de7-8db3-4399-a86e-2b9a67f9d14e.png">

### 5. 상세 페이지

<img width="1552" alt="Screenshot 2023-02-04 at 5 01 34 AM" src="https://user-images.githubusercontent.com/100818542/216706246-6bd79e88-c744-4227-925f-344e3b86b107.png">

상세 페이지 입니다. 기존 무신사는 정말 많은 데이터를 보여주느라 상당히 복잡한 디자인을 가지고 있었습니다. 그래서 MUSIN4는 정말 필요한 핵심 데이터만 추려서 간결하게 상품 상세 페이지를 만들었습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 01 41 AM" src="https://user-images.githubusercontent.com/100818542/216706364-9f4ae90e-c166-422a-9b79-b71313f20e65.png">

상품 상세 페이지 하단에는 그 상품에 달린 리뷰들이 렌더링 됩니다. 리뷰는 페이지네이션 작업이 들어가 있어서 한 페이지에 5개씩 렌더링 되고 있습니다. 

<img width="684" alt="Screenshot 2023-02-04 at 5 14 24 AM" src="https://user-images.githubusercontent.com/100818542/216707259-b4f70895-457e-4aae-b9f6-b57974f417b3.png">

상품에 대한 문의 작성도 가능합니다. 문의 작성은 별도의 popup을 통해 하고 있습니다.

### 6. 장바구니 페이지

장바구니 페이지입니다. 기존 무신사 장바구니는 삭제 UI가 직관적이지 않다고 생각되어 develop하였습니다. 또, 기존 무신사 처럼 수량 변경시 마다 refresh를 하는 것이 아니라, 따로 수량을 컨트롤하여 수량 변경시 리렌더만 일어나게 하도록 하여 부정적인 잦은 강제 refresh의 경험을 없앴습니다.  

<img width="1552" alt="Screenshot 2023-02-04 at 5 15 56 AM" src="https://user-images.githubusercontent.com/100818542/216707228-70aaa5fd-aae9-416b-8367-cbe387289190.png">

### 7. 결제 페이지

결제 페이지입니다. 실제 결제 기능을 구현하지는 않아 많은 기능이 있지 않습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 11 06 AM" src="https://user-images.githubusercontent.com/100818542/216707219-a3ff0564-7cf8-4fd1-89df-0b984156c182.png">

결제 중 로딩까지 구현하였습니다. 실제 결제 기능을 구현한다면 필요하다고 생각되어 만들었지만 실제 결제 기능까지는 구현하지 않았습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 1 40 40 PM" src="https://user-images.githubusercontent.com/100818542/216748879-600b4296-9154-4d06-ab64-088459330290.png">

### 8. 마이 페이지

마이 페이지입니다. 회원정보 확인 및 변경, 구매내역 확인, 후기 작성 및 내역 확인, 문의 내역 확인, 최근 본 상품 등 많은 하위 페이지를 가지고 있고, 하위 페이지간의 UI가 통일감 있도록 신경썼습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 08 08 AM" src="https://user-images.githubusercontent.com/100818542/216706386-ca7c9094-f1d3-4a0d-baf8-8776b09da0a2.png">
마이 페이지 하단의 기본 회원정보 페이지 입니다. 자신의 회원정보를 확인하고 수정할 수 있습니다.
<img width="1552" alt="Screenshot 2023-02-04 at 5 17 11 AM" src="https://user-images.githubusercontent.com/100818542/216706391-51e64a0c-3005-43b8-a7bc-98487f334d67.png">
마이 페이지 하단의 최근 본 상품 페이지 입니다. 자신이 한번이라도 본 상품 중 최근 12개를 보여주고 있습니다.
<img width="1552" alt="Screenshot 2023-02-04 at 1 31 55 PM" src="https://user-images.githubusercontent.com/100818542/216748669-8beb5faa-0f54-4612-a02a-26811a850f5b.png">
마이 페이지 하단의 구매후기 작성 페이지입니다. 자신의 구매목록을 불러와서 그 구매목록 마다 구매후기를 작성할 수 있도록 하였습니다. 구매후기를 작성한 구매목록은 더이상 구매후기를 작성 할 수 없도록 막았습니다.
<img width="1552" alt="Screenshot 2023-02-04 at 1 31 46 PM" src="https://user-images.githubusercontent.com/100818542/216748672-3706e251-0f23-4e0e-8bbe-9f85632a678a.png">
마이 페이지 하단의 구매후기 내역 페이지입니다. 자신이 쓴 구매후기 목록을 불러와서 다 보여줍니다. 각 구매후기를 클릭하면 그 구매후기에 달린 댓글들도 렌더링됩니다.
<img width="1552" alt="Screenshot 2023-02-04 at 2 18 53 PM" src="https://user-images.githubusercontent.com/96823216/216750260-701d9fd2-fba4-4a1a-bb52-464f67d2eb88.png">
마이 페이지 하단의 상품문의 페이지입니다. 자신이 쓴 상품문의 목록을 불러와서 보여줍니다. 페이지네이션이 적용되어 한 페이지에 5개의 문의를 보여주고 있습니다. 상품문의 답변 전에는 문의 수정과 삭제가 가능합니다. 상품 문의가 답변 후에는 상품 문의 클릭시 답변이 보여집니다.

### 9. 옷장 페이지 **(추가기능)**

디자이너 분과 협업하여 **옷장** 기능을 구현하였습니다. 게시글 작성, 팔로우, 언팔로우, 팔로우리스트 보기 등 커뮤니티 기능을 완전히 구현했습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 19 55 AM" src="https://user-images.githubusercontent.com/100818542/216707111-0aeb4351-ba3a-4178-93d0-3cc170fa3b60.png">

### 10. 스타일 페이지 **(추가기능)**

옷장에서 작성한 Style 게시글들을 모아볼 수 있는 스타일 페이지입니다. 여러 스타일을 한번에 보여주는 만큼 UI면에서 난잡하지 않도록 신경썼습니다.
<br />
게시글 이동이 잦은 커뮤니티 기능이므로, style 게시글을 누를 때 마다 페이지를 이동하기보다는 모달을 띄우는 방법을 채택해 스타일 모달 또한 구현했습니다.
<br />
스타일 모달에도 사진 슬라이드, 옷장 naviagate, 작성자 팔로우, 게시글 좋아요 기능 등 댓글을 제외한 커뮤니티 기능을 모두 구현했습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 04 53 AM" src="https://user-images.githubusercontent.com/100818542/216706443-77829f3e-a637-4bbe-9186-fa4f440d5e54.png">
<img width="1552" alt="Screenshot 2023-02-04 at 5 20 31 AM" src="https://user-images.githubusercontent.com/96823216/216749836-5e0a1d27-a5dd-4422-a9b1-703666f91257.png">
자신의 옷장에 뜨는 style 게시글을 작성하는 페이지입니다. 필수적으로 하나의 사진을 올려야하고 글과 해시태그, 자신이 착용한 아이템을 등록 할 수 있습니다.

