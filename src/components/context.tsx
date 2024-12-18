import React, { createContext } from "react";
import type { Context, ProviderProps, ConsumerProps } from "react";

class ContextInstance<T> {
  static instance: Context<any> = null as any;

  constructor(arg: T) {
    if (!ContextInstance.instance) {
      ContextInstance.instance = createContext(arg);
    }
  }

  get Provider(): React.FC<ProviderProps<T>> {
    const { Provider } = ContextInstance.instance || {};
    return (props) => {
      return <Provider value={props?.value}>{props?.children}</Provider>;
    };
  }

  get Consumer() {
    const { Consumer } = ContextInstance.instance || {};
    return (props: ConsumerProps<T>) => {
      return <Consumer>{props?.children}</Consumer>;
    };
  }
}

new ContextInstance<any>({});

export default ContextInstance;

// 单例模式+返回react组件