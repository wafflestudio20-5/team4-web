/* 

Api.ts will be revised after server distribution.

A mock-up json-server can be opened locally by typing
"json-server ./data.json --port 4000" on terminal.

See if the server is successfully opened in the following link:
"https:/localhost:4000/data"

If this doesn't work, (re)install json-server by typing
"npm install -g json-server" on terminal.

Last edited: 2022/12/27 17:34
Edited By: Lee Sukchan

*/

import axios, { AxiosResponse, CancelToken } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Category, Item } from './interface';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const apiRegister = (
  username: string,
  password: string,
  nickname: string
) =>
  axios.post('/api/auth/register', {
    username,
    password,
    nickname,
  });

export const apiLogin = (username: string, password: string) =>
  axios.post<{ accessToken: string }>('/api/auth/login', {
    username,
    password,
  });

export const apiLogout = (token: string) =>
  axios.post('/api/auth/logout', null, { headers: auth(token) });

export const apiRefresh = () =>
  axios.post<{ accessToken: string }>('/api/auth/refresh');

export const apiCheckUsername = (username: string) =>
  axios.post<{ isUnique: boolean }>('/api/auth/username', { username });

export const apiCheckNickname = (nickname: string) =>
  axios.post<{ isUnique: boolean }>('/api/auth/nickname', { nickname });

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
      axios.get<Item>(`/api/item/${id}`, { cancelToken }),
    [id]
  );
  return id === null ? null : f;
};

export const useApiItemListFetcher = (category: Category | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) =>
      axios.get<Item[]>('/api/items', {
        params: { category: category ? category : undefined },
        cancelToken,
      }),
    [category]
  );
  return f;
};
