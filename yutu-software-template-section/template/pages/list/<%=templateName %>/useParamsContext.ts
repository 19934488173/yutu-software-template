import {
  ReactNode,
  createContext,
  createElement,
  useContext,
  useReducer,
  Reducer,
  useRef,
  useMemo,
} from 'react';

export const initialData = {
  categoryV1: '',
  categoryV2: '',
  target: 'day',
  rankDate: '',
  sort: 'salesMoneyCompare',
  start: 1,
  size: 20,
};

export type IParamsType = typeof initialData;

type Action =
  | {
      type: 'changeParams';
      payload?: Partial<IParamsType>;
    }
  | {
      type: keyof IParamsType;
      payload: IParamsType[keyof IParamsType];
    };

const paramsCreateContext = createContext(
  {} as {
    state: IParamsType;
    dispatch: React.Dispatch<Action>;
    filterRef?: React.RefObject<HTMLDivElement> | null;
  }
);

const reducer: Reducer<IParamsType, Action> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'changeParams':
      return { ...state, ...payload };
    default:
      return { ...state, [type]: payload, start: 1 };
  }
};

export const useParamsContext = () => useContext(paramsCreateContext);

const ParamsContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialData);
  const filterRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(() => ({ state, dispatch, filterRef }), [state]);

  return createElement(
    paramsCreateContext.Provider,
    {
      value: contextValue,
    },
    children
  );
};

export default ParamsContextProvider;
