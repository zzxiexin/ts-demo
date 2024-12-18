import { Upload, Button, message } from "antd";
import { UploadProps } from "antd/lib/upload";
import {
  UploadFile,
} from "antd/lib/upload/interface";
import { UploadRequestOption } from "rc-upload/lib/interface"
import React, { useState, forwardRef, Ref, useImperativeHandle } from "react";

type Res<T> = {
  success: boolean;
  result: T;
  errorMsg: string;
};

type CustomeUploadProps<T> = Partial<UploadProps> & {
  uploadApi: (params: FormData) => Promise<Res<T>>;
  isManual?: boolean;
};

const defaultConfigs = {
  accept: "image/*",
  isManual: true,
};

const CustomeUpload = <T,>(
  props: CustomeUploadProps<T>,
  ref: Ref<any> // 修改了这里的 ref 类型
) => {
  const mergeProps = { ...defaultConfigs, ...props };
  const { isManual, uploadApi } = mergeProps;
  const [urlList, setUrlList] = useState<T[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useImperativeHandle(ref, () => ({
    getValue: (key: string) => {
      return [key];
    },
  }));

  const onRemove = (file: UploadFile) => {
    const index = fileList.indexOf(file);
    const newUrlList = urlList.slice();
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    newUrlList.splice(index, 1); // 修正这里的 urlList 修改方式
    setFileList(newFileList);
    setUrlList(newUrlList);
  };

  const customRequest = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    const params = new FormData();
    params.append("file", file);
    setFileList([...fileList, file as unknown as UploadFile]); // 修正类型强制转换
    const res = await uploadApi(params);
    if (res.success || true) {
      setUrlList([...urlList, res.result]);
      message.success("上传成功");
      // onSuccess?.(); // 调用 onSuccess
    } else {
      message.error(res.errorMsg);
      onError?.(new Error(res.errorMsg)); // 调用 onError
    }
    return false;
  };

  const finalProps = isManual
    ? { ...mergeProps, customRequest }
    : { ...mergeProps };

  return (
    <Upload {...finalProps} onRemove={onRemove} fileList={fileList}>
      <Button>
        上传
      </Button>
    </Upload>
  );
};

export default forwardRef(CustomeUpload) as <T>(
  props: CustomeUploadProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement;