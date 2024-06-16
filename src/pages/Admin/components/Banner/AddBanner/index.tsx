import React, { useState } from "react";
import { PiFlagBanner } from "react-icons/pi";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  GetProp,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from "antd";
import { AdminButton } from "../../../../../components";
// import { AddBanner } from "../../../../../services/";
import { BannerType } from "../ListBanner";
import { message } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddBanner: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleSubmit = async (value: BannerType) => {
    // try {
    //   const res = await AddBanner(value);
    //   const message = res.data.message.message;
    //   messageApi.open({
    //     type: "success",
    //     content: message,
    //   });
    // } catch (error: any) {
    //   message.error(error.response.data.message);
    // }
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className="text-4xl font-semibold mt-4 ">Quản lý băng rôn</div>
        <div className="border-2 mt-4">
          <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
            <PiFlagBanner />
            <span>Thêm băng rôn</span>
          </div>
          <div className="px-4 py-2">
            <Form onFinish={handleSubmit}>
              <div className="flex gap-10">
                <div className="w-1/2">
                  <label className="label" htmlFor="name">
                    Tên băng rôn
                  </label>
                  <Form.Item<BannerType>
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên băng rôn!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="name"
                      size="large"
                      className="mb-[8px]"
                      placeholder="Tên băng rôn"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="w-1/2">
                <label className="label">Ảnh băng rôn</label>
                <div>
                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                    />
                  )}
                </div>
              </div>
              <div className="my-3">
                <AdminButton type="submit">Lưu thông tin</AdminButton>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddBanner;
