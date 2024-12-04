import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import fetch from './utils'
import ImageUpload from './imageUpload';

function App() {
  // useEffect(() => {
  //   (async function () {
  //     // fetch.instance.defaults.baseURL = 'https://www.baidu.com'
  //     fetch.baseUrl = 'https://www.baidu.com'
  //     console.log(fetch.baseUrl)
  //     const res = await fetch?.get('/todos/1')
  //     console.log('res', res)
  //   })()
  // }, [])
  const [file, setFile] = useState<any>(null);
  const instance = new ImageUpload({ url: 'http://localhost', maxSize: 1, onError: () => { alert('大小错误'); console.log(file) } })

  // console.log(instance.url)

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(file)
    instance.checkFileTypes(file)
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">上传</button>
      </form>
    </div>
  );
}

export default App;
