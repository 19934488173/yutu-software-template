declare module 'click-to-react-component' {
  import { FC } from 'react';

  // 定义组件的 props 类型
  interface ClickToComponentProps {
    // 根据实际需要定义 props
    someProp?: string;
  }

  // 导出组件
  export const ClickToComponent: FC<ClickToComponentProps>;
}
