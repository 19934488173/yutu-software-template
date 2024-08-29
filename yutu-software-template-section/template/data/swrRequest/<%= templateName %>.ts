import axios from 'src/axios-fetch/example-data-fetch-v2';
import useSWR from 'swr';

interface I<%= templateName
  .replace(/^use-/, '')
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('') %>Res {
  [key: string]: any
}

interface I<%= templateName
  .replace(/^use-/, '')
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('') %>Params {
  [key: string]: any
}

export const <%= templateName
  .split('-')
  .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
  .join('') %> = (params: I<%= templateName
  .replace(/^use-/, '')
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('') %>Params) =>
  useSWR(
    params 
      ? ['/category/detail/video/trend', params]
      : null,
    ([url, params]) =>
      axios
        .post<ApiResData<I<%= templateName
  .replace(/^use-/, '')
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('') %>Res>>(url, params)
        .then((res) => res.data.data)
  );




