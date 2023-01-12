import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse, CancelToken } from 'axios';
import { User, Item, Category, SubCategory } from './interface';

axios.defaults.withCredentials = true;

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const apiRegister = (
  username: string,
  password: string,
  nickname: string
) => axios.post('/api/auth/register', { username, password, nickname });

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

export const apiGetMyInfo = (token: string) =>
  axios.get<{ user: User }>('/api/user/me', { headers: auth(token) });

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

export const useApiItemListFetcher = (
  // 추후 백엔드 담당자와 협의 후 변경 예정
  category: Category | null,
  subCategory?: SubCategory,
  count?: number,
  index?: number
) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      // 백엔드에서 API 수정 사항 반영 전이므로 별도로 params 정의
      const params = {
        category: category,
        nextItemId: null,
      };
      return axios.get<{ items: Item[] }>('/api/items', {
        params,
        cancelToken,
      });
    },
    [category, subCategory, index, count]
  );
  return f;
};
