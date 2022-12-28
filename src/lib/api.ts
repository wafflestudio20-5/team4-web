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
import { ApiRegisterParams, Category, Item, Session } from './interface';

const url = (path: string, param?: Record<string, string>) =>
  `http://localhost:4000${path}` +
  (param ? '?' + new URLSearchParams(param).toString() : '');

export const apiRegister = (registerInfo: ApiRegisterParams, token: string) => {
  return axios.post(url('/login'), null);
};

export const apiLogin = (username: string, password: string) => {
  return axios.get<Session>(url('/login'));
};

export const apiLogout = (token: string) => {
  return axios.post(url('/login'), null);
};

export const apiRefresh = () => {
  return axios.get<{ accessToken: string }>(url('/login/accessToken'));
};

export const apiCheckUsername = () => {
  return axios.get<{ duplicate: boolean }>(url('/check'));
};

export const apiCheckNickname = () => {
  return axios.get<{ duplicate: boolean }>(url('/check'));
};

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

export const useApiItemListFetcher = (category: Category | null) => {
  const f = useCallback(
    (cancelToken: CancelToken) =>
      axios.get<{ data: Item[] }>(url('/data'), { cancelToken }),
    []
  );
  return f;
};
