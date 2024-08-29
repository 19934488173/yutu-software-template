import useSWR, { SWRConfiguration, mutate } from "swr";
import { cache } from "swr/_internal";

/** 初始状态 */
export const INIT_STATE = {
  open: false,
};
type TInitState = typeof INIT_STATE;
/** 通用 Hook */
const useInitParams = (key: string, initialState = INIT_STATE) =>
  useSWR<TInitState,any,{fallbackData: TInitState;} & SWRConfiguration<TInitState>
  >(key, { fallbackData: initialState });

/** 更新参数的方法 */
const updateParams = (
  key: string,
  newParams: Partial<TInitState> = {}
) => {
  const currentData = cache.get(key)?.data ?? INIT_STATE;
  return mutate(key, { ...currentData, ...newParams });
};

const KEY = "<%= templateName.replace(/-/g, '_').replace(/^use-/, '') %>";
/** 初始化参数 */
export const <%= templateName
  .split('-')
  .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
  .join('') %>Params = () => useInitParams(KEY);

/** 更改参数 */
export const update<%= templateName
  .replace(/^use-/, '')
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('') %>Params = (
  newParams: Partial<TInitState>
) => updateParams(KEY, newParams);