import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse, CancelToken } from 'axios';
import {
  User,
  Item,
  Category,
  SubCategory,
  Purchase,
  Style,
} from './interface';
import { PurchasePostDto } from './dto';

axios.defaults.baseURL = process.env.REACT_APP_DB_HOST;
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

export const apiSocialLogin = (token: string) =>
  axios.post('/api/auth/social-login', null, { headers: auth(token) });

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

export const apiPostReview = (
  id: number,
  rating: number,
  content: string,
  size: string,
  color: string,
  images: string[],
  token: string | null
) =>
  axios.post<{}>(
    '/api/user/me/reviews',
    { id, rating, content, size, color, images },
    { headers: token ? auth(token) : undefined }
  );

export const apiPutReview = (
  id: number,
  rating: number,
  content: string,
  size: string,
  color: string,
  images: string[],
  token: string | null
) =>
  axios.put<{}>(
    '/api/user/me/reviews',
    { id, rating, content, size, color, images },
    { headers: token ? auth(token) : undefined }
  );

export const apiPostImage = (formData: FormData, token: string | null) =>
  axios.post('/api/image-upload', formData, {
    headers: token ? auth(token) : undefined,
  });

export const useApiItemListFetcher = (
  fetchType: string | null,
  category?: Category,
  subcategory?: SubCategory,
  query?: string,
  index?: number,
  count?: number,
  sort?: string
) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      if (fetchType === 'search') {
        return axios.get<{ items: Item[]; totalPages: number }>('/api/search', {
          params: { query, index, count, sort },
          cancelToken,
        });
      } else if (fetchType === 'subcategory') {
        return axios.get<{ items: Item[]; totalPages: number }>('/api/items', {
          params: { subcategory, index, count, sort },
          cancelToken,
        });
      } else if (fetchType === 'category') {
        return axios.get<{ items: Item[]; totalPages: number }>('/api/items', {
          params: { category, index, count, sort },
          cancelToken,
        });
      } else {
        // if fetchType is null or invalid, fetch from all items
        return axios.get<{ items: Item[]; totalPages: number }>('/api/items', {
          params: { index, count, sort },
          cancelToken,
        });
      }
    },
    [fetchType, category, subcategory, query, index, count, sort]
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
  purchaseItems: PurchasePostDto[],
  token: string | null
) =>
  axios.post<{}>(
    '/api/user/me/purchases',
    { purchaseItems },
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

export const apiPatchCart = (
  id: number,
  quantity: number,
  token: string | null
) =>
  axios.patch<{}>(
    '/api/user/me/shopping-cart',
    { id, quantity },
    { headers: token ? auth(token) : undefined }
  );

export const apiDeleteCartList = (ids: number[], token: string | null) =>
  ids.map((id) =>
    axios.delete<{}>(`/api/user/me/shopping-cart/${id}`, {
      headers: token ? auth(token) : undefined,
    })
  );

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

export const apiPostViewedGoods = (itemId: number, token: string) =>
  axios.post<{}>(
    '/api/user/me/recently-viewed',
    { itemId },
    { headers: token ? auth(token) : undefined }
  );

export const apiPostInquiry = (
  id: number | null,
  token: string | null,
  type: string,
  option: string | undefined,
  isSecret: boolean,
  title: string,
  content: string,
  images: string[] | undefined
) =>
  axios.post<{}>(
    `/api/item/${id}/inquiry`,
    { type, option, isSecret, title, content, images },
    { headers: token ? auth(token) : undefined }
  );
export const apiPostStyle = (
  token: string | null,
  images: string[],
  itemIds: number[],
  content?: string,
  hashtag?: string
) =>
  axios.post<{}>(
    '/api/style',
    { images, itemIds, content, hashtag },
    { headers: token ? auth(token) : undefined }
  );

export const useApiStyleFetcher = (id: number | null, token: string | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      return axios.get<{
        style: Style;
        likedCount: number;
        isFollow: boolean;
        isLike: boolean;
      }>(`/api/style/${id}`, {
        headers: token ? auth(token) : undefined,
        cancelToken,
      });
    },
    [id, token]
  );
  return id === null ? null : f;
};

export const useApiStyleListFetcher = (
  index?: number,
  count?: number,
  sort?: string
) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      return axios.get<{ styles: Style[]; totalPages: number }>('/api/styles', {
        params: { index, count, sort },
        cancelToken,
      });
    },
    [index, count, sort]
  );
  return f;
};

export const useApiUserFectcher = (id: number | null, token: string | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      return axios.get<{
        user: User;
        count: {
          styleCount: number;
          followerCount: number;
          followingCount: number;
        };
        isFollow: boolean;
      }>(`/api/user/${id}`, {
        headers: token ? auth(token) : undefined,
        cancelToken,
      });
    },
    [id, token]
  );
  return id === null ? null : f;
};

export const useApiUserStyleFecther = (id: number | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) => {
      return axios.get<{
        styles: { id: number; image: string }[];
      }>(`/api/user/${id}/styles`, {
        cancelToken,
      });
    },
    [id]
  );
  return id === null ? null : f;
};
