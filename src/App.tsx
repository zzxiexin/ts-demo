import React, { useContext, useEffect, useState } from 'react';
import ImageUpload from './components/imageUpload';
import context from './components/context';
import ImagePreview from './components/ImagePreview';
import { Button } from 'antd';

type Res<T> = {
  success: boolean;
  result: T;
  errorMsg: string;
};

const Test = () => {
  const { name } = useContext(context.instance)
  return <div>{name}</div>
}

function App() {

  const { Provider } = context.instance


  return (
    <div className="App">
      <ImageUpload<any> uploadApi={() => Promise.resolve({} as Res<any>)} />
      <Provider value={{ name: "test" }}>
        <Test />
      </Provider>
      <Button onClick={() => ImagePreview.show()}>开启</Button>
      <Button onClick={() => ImagePreview.close()}>关闭</Button>
    </div>
  );
}

export default App;
