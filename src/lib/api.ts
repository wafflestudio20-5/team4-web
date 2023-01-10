import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse, CancelToken } from 'axios';
import { User, Item } from './interface';
import { RegisterDto, LoginDto, GetItemsDto } from './dto';

axios.defaults.withCredentials = true;

const auth = (token: string) => ({ Authorization: `Bearer ${token}` });

export const apiRegister = (body: RegisterDto) =>
  axios.post('/api/auth/register', body);

export const apiLogin = (body: LoginDto) =>
  axios.post<{ accessToken: string }>('/api/auth/login', body);

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

export const useApiItemListFetcher = (params: GetItemsDto) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      // 백엔드에서 API 수정 사항 반영 전이므로 newParams 정의
      const newParams = {
        category: params.category ? params.category : null,
      };
      return axios.get<{ items: Item[] }>('/api/items', {
        params: newParams,
        cancelToken,
      });
    },
    [params]
  );
  return f;
};
