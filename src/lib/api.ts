/* 

Api.ts will be revised after server distribution.

A mock-up json-server can be opened locally by typing
"json-server ./data.json --port 4000" on terminal.

See if the server is successfully opened in the following link:
"https:/localhost:4000/items"

If this doesn't work, (re)install json-server by typing
"npm install -g json-server" on terminal.

*** All url paths should later be revised. ***

Last edited: 2023/01/08 22:36
Edited by: Lee Sukchan

*/

import axios, { AxiosResponse, CancelToken } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { User, Item, Category } from './interface';
import { RegisterParams, LoginParams } from './params';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const apiRegister = (data: RegisterParams) =>
  axios.post('/register', data);

export const apiLogin = (data: LoginParams) =>
  /*
  json-server 사용을 위해 GET 메소드로 임시 교체
  
  axios.post<{ accessToken: string }>('/api/auth/login', data); 
  */
  axios.get<{ accessToken: string }>('/login');

export const apiLogout = (token: string) =>
  /*
  json-server 사용을 위해 GET 메소드로 임시 교체

  axios.post('/api/auth/logout', null, { headers: auth(token) });
  */
  axios.get('/logout');

export const apiRefresh = () =>
  /*
  json-server 사용을 위해 GET 메소드로 임시 교체
  
  axios.post<{ accessToken: string }>('/api/auth/refresh');
  */
  axios.get<{ accessToken: string }>('/refresh');

export const apiCheckUsername = (username: string) =>
  axios.post<{ isUnique: boolean }>('/username', { username });

export const apiCheckNickname = (nickname: string) =>
  axios.post<{ isUnique: boolean }>('/nickname', { nickname });

export const apiGetMyInfo = (token: string) =>
  axios.get<{ user: User }>('/me', { headers: auth(token) });

export function useApiData<T>(
  fetch: ((cancel: CancelToken) => Promise<AxiosResponse<T>>) | null
) {
  const [{ data, error, loading }, setResult] = useState<{
    data?: T;
    error?: { payload?: unknown };
    loading: boolean;
  }>({ loading: false });
  useEffect(() => {
    if (!fetch) return;
    const source = axios.CancelToken.source();
    setResult((prev) => ({ ...prev, loading: true }));
    fetch(source.token)
      .then((res) => {
        setResult({ data: res.data, loading: false });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setResult({ error: { payload: err }, loading: false });
      });
    return () => source.cancel();
  }, [fetch]);
  return { data, loading, error };
}

export const useApiItemFetcher = (id: number | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) =>
      axios.get<{ item: Item }>(`/api/item/${id}`, { cancelToken }),
    [id]
  );
  return id === null ? null : f;
};

export const useApiItemListFetcher = (category: Category | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) =>
      axios.get<{ items: Item[] }>('/items', {
        params: { category: category ? category : undefined },
        cancelToken,
      }),
    [category]
  );
  return f;
};
