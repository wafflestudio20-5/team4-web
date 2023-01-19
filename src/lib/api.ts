import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse, CancelToken } from 'axios';
import { User, Item, Category, SubCategory, Purchase } from './interface';
import { PurchasePostDto } from './dto';

axios.defaults.baseURL = 'http://localhost:3000';
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
  category: Category | null,
  subCategory?: SubCategory,
  count?: number,
  index?: number
) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      return axios.get<{ items: Item[] }>('/api/items', {
        params: { category, subCategory, count, index },
        cancelToken,
      });
    },
    [category, subCategory, index, count]
  );
  return f;
};

export const useApiGetPurchaseListFetcher = (token: string | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      return axios.get<{ purchaseItems: Purchase[] }>(
        '/api/user/me/purchases',
        {
          headers: token ? auth(token) : undefined,
          cancelToken,
        }
      );
    },
    [token]
  );
  return f;
};

export const apiPostPurchaseList = (
  purchaseitems: PurchasePostDto[],
  token: string | null
) =>
  axios.post<{}>(
    '/api/user/me/purchases',
    { purchaseitems },
    { headers: token ? auth(token) : undefined }
  );

export const useApiGetCartListFetcher = (token: string | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      return axios.get<{ cartItems: Purchase[] }>(
        '/api/user/me/shopping-cart',
        {
          headers: token ? auth(token) : undefined,
          cancelToken,
        }
      );
    },
    [token]
  );
  return f;
};

export const apiPutCartList = (
  id: number,
  quantity: number,
  token: string | null
) =>
  axios.put<{}>(
    'api/user/me/shopping-cart',
    { id, quantity },
    { headers: token ? auth(token) : undefined }
  );

export const apiDeleteCartList = (ids: number[], token: string) =>
  axios.delete<{}>('/api/user/me/shopping-cart', {
    params: ids,
    headers: token ? auth(token) : undefined,
  });

export const useApiGetViewedListFetcher = (token: string | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      return axios.get<{ recentItems: Purchase[] }>(
        '/api/user/me/recently-viewed',
        { headers: token ? auth(token) : undefined, cancelToken }
      );
    },
    [token]
  );
  return f;
};

export const apiPostCart = (
  id: number,
  option: string | undefined,
  quantity: number,
  token: string | null
) =>
  axios.post<{}>(
    '/api/user/me/shopping-cart',
    { id, option, quantity },
    { headers: token ? auth(token) : undefined }
  );

export const apiPostViewedGoods = (itemId: number, token: string) => {
  axios.post<{}>(
    '/api/user/me/recently-viewed',
    { itemId },
    { headers: token ? auth(token) : undefined }
  );
};
