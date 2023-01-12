# API

`api.ts`는 프론트엔드에서 API 호출을 간편하게 하기 위해 훅을 정의해둔 파일입니다.

## API 호출 훅 구성 규칙

```
export const apiLogin = (username: string, password: string) =>
  axios.post<{ accessToken: string }>('/api/auth/login', {
    username,
    password,
  });

export const apiLogout = (token: string) =>
  axios.post('/api/auth/logout', null, { headers: auth(token) });
```

- 함수 이름은 api(기능)으로 합니다.
- ~~parameter가 단일한 경우에는 직접 타입을 정의하고, 여러 개인 경우에는 `dto.ts`에 dto를 정의하고 import해서 사용합니다.~~
- parameter는 절대 중괄호({})로 감싸지 않고 argument 개수만큼 각각의 타입을 명시해서 나열합니다.
- ~~AxiosResponse의 타입 역시 마찬가지의 방법으로 명시합니다.~~
- AxiosResponse의 타입은 모두 중괄호({})로 감싸서 정의합니다.
- Authorization이 필요한 경우에는 `{ headers: auth(access_token) }` 형식으로 사용합니다.
