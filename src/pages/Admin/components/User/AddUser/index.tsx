import { FaPersonBreastfeeding } from "react-icons/fa6";
import { Form, Input, DatePicker, Select, message } from "antd";
import { AdminButton } from "../../../../../components";
import { COMMON } from "../../../../../constants";
import { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import { addUser } from "../../../../../services/user";
export interface UserState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  roleId: string;
  image?: string;
}

const AddUser: React.FC = () => {
  const [user, setUser] = useState<UserState>();
  const [messageApi, contextHolder] = message.useMessage();
  const handleData = (data: UserState) => {
    data.dateOfBirth = dayjs(data.dateOfBirth).format("YYYY-MM-DD");
    setUser(data);
  };
  const handleSubmit = async (value: UserState) => {
    handleData(value);
    if (user && user.roleId) {
      try {
        const res = await addUser(user);
        messageApi.success(res.data.data.message.message);
      } catch (error: any) {
        messageApi.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      {contextHolder}
      <div className="text-4xl font-semibold mt-4 ">Quản lý người dùng</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <FaPersonBreastfeeding />
          <span>Thêm người dùng</span>
        </div>
        <div className="px-4 py-2">
          <Form onFinish={handleSubmit}>
            <div className="flex gap-10">
              <div className="w-1/2">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <Form.Item<UserState>
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ email!" },
                  ]}
                  hasFeedback
                >
                  <Input
                    id="email"
                    size="large"
                    className="mb-[8px]"
                    placeholder="Địa chỉ email"
                  />
                </Form.Item>
              </div>
              <div className="w-1/2">
                <label className="label" htmlFor="password">
                  Mật khẩu
                </label>
                <Form.Item<UserState>
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                    { max: 32, message: "Mật khẩu không được quá 32 ký tự" },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    className="mb-[8px]"
                    id="password"
                    size="large"
                    placeholder="Mật khẩu"
                    // prefix={<BiLockAlt />}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="w-1/3">
                <label className="label" htmlFor="firstName">
                  Họ
                </label>
                <Form.Item<UserState>
                  name="firstName"
                  rules={[{ required: true, message: "Vui lòng nhập họ !" }]}
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
                  rules={[{ required: true, message: "Vui lòng nhập tên " }]}
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
                    { required: true, message: "Vui lòng nhập số điện thoại" },
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
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ " }]}
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
                    { required: true, message: "Vui lòng chọn ngày sinh " },
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
                  rules={[{ required: true, message: "Vui lòng giới tính " }]}
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
                  rules={[{ required: true, message: "Vui lòng chọn quyền " }]}
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
            <div className="my-3">
              <AdminButton type="submit">Lưu thông tin</AdminButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AddUser;
