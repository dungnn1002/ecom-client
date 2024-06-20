import React, { useState } from "react";
import "./index.scss";
import { HeaderLogin, Footer, AdminButton } from "../../components";
import {
  DatePicker,
  Form,
  GetProp,
  Image,
  Input,
  Select,
  Upload,
  UploadProps,
} from "antd";
import { COMMON } from "../../constants";
import FormItem from "antd/es/form/FormItem";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { UserState } from "../Admin/components/User/AddUser";
import { RcFile, UploadFile } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const ProfilePage: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const beforeUpload = (file: RcFile) => {
    return false;
  };
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
  const handleSubmit = async (value: UserState) => {
    console.log(value);
  };
  return (
    <>
      <HeaderLogin />
      <div className="container">
        <div className="grid grid-cols-5 gap-4 ml-20 mr-20">
          <div className="col-span-1">
            <div className="mt-4  flex flex-col justify-center items-center">
              <div>
                <Image
                  className="rounded-full"
                  width={200}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </div>
              <div className="font-bold ">Dũng</div>
              <div className="ml-2">ngocdungbkhn@gmail</div>
            </div>
          </div>
          <div className="col-span-3">
            <div className="border-2 mt-4">
              <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
                <FaPersonBreastfeeding />
                <span>Thêm người dùng</span>
              </div>
              <div className="px-4 py-2">
                <Form onFinish={handleSubmit}>
                  <div className="flex gap-10">
                    <div className="w-1/3">
                      <label className="label" htmlFor="firstName">
                        Họ
                      </label>
                      <Form.Item<UserState>
                        name="firstName"
                        rules={[
                          { required: true, message: "Vui lòng nhập họ !" },
                        ]}
                        hasFeedback
                      >
                        <Input
                          id="firstName"
                          size="large"
                          className="mb-[8px]"
                          placeholder="Họ "
                        />
                      </Form.Item>
                    </div>
                    <div className="w-1/3">
                      <label className="label" htmlFor="lastName">
                        Tên
                      </label>
                      <Form.Item<UserState>
                        name="lastName"
                        rules={[
                          { required: true, message: "Vui lòng nhập tên " },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="mb-[8px]"
                          id="lastName"
                          size="large"
                          placeholder="Tên "
                        />
                      </Form.Item>
                    </div>
                    <div className="w-1/3">
                      <label className="label" htmlFor="password">
                        Số điện thoại
                      </label>
                      <Form.Item<UserState>
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          className="mb-[8px]"
                          id="phoneNumber"
                          size="large"
                          placeholder="Số điện thoại"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="label" htmlFor="email">
                      Địa chỉ
                    </label>
                    <Form.Item<UserState>
                      name="address"
                      rules={[
                        { required: true, message: "Vui lòng nhập địa chỉ " },
                      ]}
                      hasFeedback
                    >
                      <Input
                        id="address"
                        size="large"
                        className="mb-[8px]"
                        placeholder="Địa chỉ "
                      />
                    </Form.Item>
                  </div>
                  <div className="flex gap-10">
                    <div className="w-1/3">
                      <label className="label" htmlFor="email">
                        Ngày sinh
                      </label>
                      <FormItem<UserState>
                        name="dateOfBirth"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn ngày sinh ",
                          },
                        ]}
                        hasFeedback
                      >
                        <DatePicker
                          className="w-full"
                          size="large"
                          placeholder="Ngày sinh"
                          inputReadOnly
                          format={"DD/MM/YYYY"}
                        />
                      </FormItem>
                    </div>
                    <div className="w-1/3">
                      <label className="label" htmlFor="password">
                        Giới tính
                      </label>
                      <FormItem<UserState>
                        name="gender"
                        rules={[
                          { required: true, message: "Vui lòng giới tính " },
                        ]}
                        hasFeedback
                      >
                        <Select
                          className="w-full"
                          showSearch
                          placeholder="Chọn giới tính"
                          optionFilterProp="children"
                          size="large"
                          options={[
                            {
                              value: COMMON.NAM,
                              label: "Nam",
                            },
                            {
                              value: COMMON.NU,
                              label: "Nữ",
                            },
                            {
                              value: COMMON.KHAC,
                              label: "Khác",
                            },
                          ]}
                        />
                      </FormItem>
                    </div>
                    <div className="w-1/3">
                      <label className="label" htmlFor="password">
                        Quyền
                      </label>
                      <FormItem<UserState>
                        name="roleId"
                        rules={[
                          { required: true, message: "Vui lòng chọn quyền " },
                        ]}
                        hasFeedback
                      >
                        <Select
                          className="w-full"
                          showSearch
                          placeholder="Chọn quyền"
                          optionFilterProp="children"
                          size="large"
                          options={[
                            {
                              value: COMMON.USER,
                              label: "User",
                            },
                            {
                              value: COMMON.SHIPPER,
                              label: "Shipper",
                            },
                            {
                              value: COMMON.ADMIN,
                              label: "Admin",
                            },
                          ]}
                        />
                      </FormItem>
                    </div>
                  </div>
                  <div className="flex gap-20">
                    <label className="label">Ảnh sản phẩm</label>
                    <div>
                      <Upload
                        beforeUpload={beforeUpload}
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
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
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
          <div className="col-span-1 p-6 rounded-lg">
            {/* Danh mục */}
            <h1 className="text-2xl font-bold mb-4">Danh mục</h1>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                  <IoPersonSharp className="text-sky-400 text-2xl" />
                  <a href="#" className="font-medium">
                    Tài khoản
                  </a>
                </div>
                <ul className="flex flex-col ml-8 mt-2 space-y-1">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Thông tin cá nhân
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Địa chỉ giao hàng
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                  <LuClipboardList className="text-sky-400 text-2xl" />
                  <a href="#" className="font-medium">
                    Đơn hàng
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                  <BiSolidDiscount className="text-red-400 text-2xl" />
                  <a href="#" className="font-medium">
                    Voucher
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default ProfilePage;
