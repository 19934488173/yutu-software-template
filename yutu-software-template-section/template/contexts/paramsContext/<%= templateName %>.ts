import {
  ReactNode,
  createContext,
  createElement,
  useContext,
  useReducer,
  Reducer,
  useMemo,
} from "react";

export const initialData = {
  sort: "",
  start: 1,
  size: 20,
};

export type IParamsType = typeof initialData;

type Action =
  | {
      type: "changeParams";
      payload?: Partial<IParamsType>;
    }
  | {
      type: keyof IParamsType;
      payload: IParamsType[keyof IParamsType];
    };

const createParamsContext = createContext(
  {} as {
    state: IParamsType;
    dispatch: React.Dispatch<Action>;
  }
);

const reducer: Reducer<IParamsType, Action> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "changeParams":
      return { ...state, ...payload };
    default:
      return { ...state, [type]: payload, start: 1 };
  }
};

export const <%= templateName %> = () => useContext(createParamsContext);

const CreateParamsContext = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return createElement(
    createParamsContext.Provider,
    {
      value: contextValue,
    },
    children
  );
};

export default CreateParamsContext;
