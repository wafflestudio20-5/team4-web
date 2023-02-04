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
- [이재운]()

#### 디자이너

- [유채원]()

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

![image](https://user-images.githubusercontent.com/107466434/216744069-553bbfa2-41a1-44f0-93c6-061c5190d70b.png)



### 2. 회원가입 페이지

<img width="1552" alt="Screenshot 2023-02-04 at 5 06 17 AM" src="https://user-images.githubusercontent.com/100818542/216706127-87f25244-5b14-4d37-ae31-41d511bb01dd.png">

### 3. 로그인 페이지

<img width="1552" alt="Screenshot 2023-02-04 at 5 06 56 AM" src="https://user-images.githubusercontent.com/100818542/216706153-d18c9d6b-4d98-4b41-835e-7ea1a2d69a9b.png">

### 4. 아이템 리스트 페이지

상품을 카테고리/서브카테고리/검색어로 찾을 수 있는 아이템 리스트 페이지입니다.<br />
기존 무신사보다 깔끔하게 구현하였고, 무엇보다 sort 변경, pagenation 등 페이지 리렌더가 필요할 때마다 refresh를 해버리는 기존 무신사와 다르게 리렌더 최적화를 했습니다.
<img width="1552" alt="Screenshot 2023-02-04 at 5 12 53 AM" src="https://user-images.githubusercontent.com/100818542/216706740-87ae2df0-8df1-44ac-b3a9-e9aa3dfed774.png">

#### 사이드바

사이드바의 카테고리탭을 통해서도 진입이 가능하고, 추가 기능의 일부인 스타일탭에서 유저 검색도 가능합니다!
<br /><br />
<img width="1552" alt="ScreenshotSideBar" src="https://user-images.githubusercontent.com/107466434/216745983-0c7fdddb-488e-4d9e-bb06-06bfd7afd179.png">

#### 기존 무신사 리스트 페이지

![image](https://user-images.githubusercontent.com/107466434/216745606-2a7026d6-365f-4b8b-a652-635d44f04607.png)


### 5. 상세 페이지

<img width="1552" alt="Screenshot 2023-02-04 at 5 01 34 AM" src="https://user-images.githubusercontent.com/100818542/216706246-6bd79e88-c744-4227-925f-344e3b86b107.png">

<img width="1552" alt="Screenshot 2023-02-04 at 5 01 41 AM" src="https://user-images.githubusercontent.com/100818542/216706364-9f4ae90e-c166-422a-9b79-b71313f20e65.png">

<img width="684" alt="Screenshot 2023-02-04 at 5 14 24 AM" src="https://user-images.githubusercontent.com/100818542/216707259-b4f70895-457e-4aae-b9f6-b57974f417b3.png">


상품 문의 작성 기능도 있습니다!

### 6. 장바구니 페이지

장바구니 페이지입니다. 기존 무신사 장바구니는 삭제 UI가 직관적이지 않다고 생각되어 develop하였습니다. 또, 기존 무신사 처럼 수량 변경시 마다 refresh를 하는 것이 아니라, 따로 수량을 컨트롤하여 수량 변경시 리렌더만 일어나게 하도록 하여 부정적인 잦은 강제 refresh의 경험을 없앴습니다.  

<img width="1552" alt="Screenshot 2023-02-04 at 5 15 56 AM" src="https://user-images.githubusercontent.com/100818542/216707228-70aaa5fd-aae9-416b-8367-cbe387289190.png">

### 7. 결제 페이지

결제 페이지입니다. 실제 결제 기능을 구현하지는 않아 많은 기능이 있지 않습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 11 06 AM" src="https://user-images.githubusercontent.com/100818542/216707219-a3ff0564-7cf8-4fd1-89df-0b984156c182.png">

결제 중 로딩까지 구현하였습니다. 실제 결제 기능을 구현한다면 필요하다고 생각되어 만들었지만 실제 결제 기능까지는 구현하지 않았습니다.
<br /><br />
![image](https://user-images.githubusercontent.com/107466434/216746323-813dc538-7ee0-4971-b110-bd504b5e24fa.png)


### 8. 마이 페이지

마이 페이지입니다. 회원정보 확인 및 변경, 구매내역 확인, 후기 작성 및 내역 확인, 문의 내역 확인, 최근 본 상품 등 많은 하위 페이지를 가지고 있고, 하위 페이지간의 UI가 통일감 있도록 신경썼습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 08 08 AM" src="https://user-images.githubusercontent.com/100818542/216706386-ca7c9094-f1d3-4a0d-baf8-8776b09da0a2.png">

<img width="1552" alt="Screenshot 2023-02-04 at 5 17 11 AM" src="https://user-images.githubusercontent.com/100818542/216706391-51e64a0c-3005-43b8-a7bc-98487f334d67.png">


### 9. 옷장 페이지[추가기능]

추가 기능입니다! 디자이너 분과 협업하여 **옷장** 기능을 구현하였습니다. 게시글 작성, 팔로우, 언팔로우, 팔로우리스트 보기 등 커뮤니티 기능을 완전히 구현했습니다.
<br />
또한 홈페이지 사이드바 탭에서 미리 말했듯이, 커뮤니티 기능이라면 user를 찾아 접근하는 방법이 있어야 한다고 생각해 사이드바에 user 검색 기능을 구현했습니다. 

<img width="1552" alt="Screenshot 2023-02-04 at 5 19 55 AM" src="https://user-images.githubusercontent.com/100818542/216707111-0aeb4351-ba3a-4178-93d0-3cc170fa3b60.png">

#### 사이드바 유저검색
![image](https://user-images.githubusercontent.com/107466434/216746665-114c2d40-1da4-44b5-908c-cdeb8caa1867.png)


### 10. 스타일 페이지[추가기능]

옷장에서 작성한 Style 게시글들을 모아볼 수 있는 스타일 페이지입니다. 여러 스타일을 한번에 보여주는 만큼 UI면에서 난잡하지 않도록 신경썼습니다.
<br />
게시글 이동이 잦은 커뮤니티 기능이므로, style 게시글을 누를 때 마다 페이지를 이동하기보다는 모달을 띄우는 방법을 채택해 스타일 모달 또한 구현했습니다.
<br />
스타일 모달에도 사진 슬라이드, 옷장 naviagate, 작성자 팔로우, 게시글 좋아요 기능 등 댓글을 제외한 커뮤니티 기능을 모두 구현했습니다.

<img width="1552" alt="Screenshot 2023-02-04 at 5 04 53 AM" src="https://user-images.githubusercontent.com/100818542/216706443-77829f3e-a637-4bbe-9186-fa4f440d5e54.png">

