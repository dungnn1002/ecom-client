import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  message,
  Modal,
  Form,
  DatePicker,
  Select,
  Input,
} from "antd";
import type { TableProps } from "antd";
import { CiViewList } from "react-icons/ci";
import { getAllUser } from "../../../../../services/user";
import { defaultQueryParam } from "../../../../../constants/type";
import { UserQueryParamType } from "../../../../../constants/type";
import { User } from "../../../../../redux/slices/authSlice";
import { deleteUser } from "../../../../../services/user";
import { AdminButton } from "../../../../../components";
import { COMMON, DATE_FORMAT } from "../../../../../constants";
import { editUser } from "../../../../../services/user";
import dayjs from "dayjs";
const { Search } = Input;
interface DataUserType {
  id: number;
  stt: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  sex: string;
  role: string;
}

export type EditUserType = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  roleId: string;
  gender: string;
};

const ManageUser: React.FC = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const handleOk = async () => {
    form.validateFields().then((values) => {
      values.dateOfBirth = dayjs(values.dateOfBirth).format(DATE_FORMAT);
    });
    const res = await editUser(userId!, form.getFieldsValue());
    fetchAllUser();
    messageApi.success(res.message);
    setOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  const columns: TableProps<DataUserType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className=" text-yellow-400"
            onClick={() => {
              handleEditUser(record.id);
            }}
          >
            Edit
          </a>
          <a className=" text-red-400" onClick={() => handleDelUser(record.id)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];
  const handleEditUser = (id: number) => {
    const user = dataUser.find((user) => user.id === id);
    if (user) {
      form.setFieldsValue({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        dateOfBirth: dayjs(user.dob),
        gender: user.gender,
        roleId: user.roleId,
      });
      setOpen(true);
      setUserId(user.id);
    }
  };
  const handleDelUser = async (id: number) => {
    const res = await deleteUser(id);
    fetchAllUser();
    messageApi.success(res.message);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [dataUser, setDataUser] = useState<User[]>([]);
  useEffect(() => {
    fetchAllUser();
  }, []);
  const fetchAllUser = async () => {
    const data = await getAllUser({ ...defaultQueryParam });
    setDataUser(data.data);
  };
  const handleSearch = async (value: string) => {
    const data = await getAllUser({ ...defaultQueryParam, phoneNumber: value });
    setDataUser(data.data);
  };
  const data: DataUserType[] = dataUser.map((user, index) => ({
    stt: index + 1,
    email: user.email,
    name: user.firstName + " " + user.lastName,
    phoneNumber: user.phoneNumber?.toString() || "",
    dateOfBirth: user.dob ? dayjs(user.dob).format("DD-MM-YYYY") : "",
    sex: user.gender?.toString() || "",
    role: user.roleId,
    id: +user.id,
  }));
  return (
    <div>
      {contextHolder}
      <div className="text-4xl font-semibold mt-4 ">Quản lý người dùng</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <CiViewList />
          <span>Danh sách người dùng</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center py-2">
            <Search
              placeholder="Tìm kiếm theo số điện thoại"
              style={{ width: 320 }}
              onSearch={handleSearch}
            />
            <button className="p-2 bg-green-700 rounded-md text-white">
              Xuất excel
            </button>
          </div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <Modal
        title="Cập nhật thông tin người dùng"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="flex gap-2 items-center justify-end">
            <div>
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                key="back"
                onClick={handleCancel}
              >
                Hủy
              </button>
            </div>
            ,
            <div>
              <AdminButton key="submit" onClick={handleOk}>
                Cập nhật
              </AdminButton>
            </div>
            ,
          </div>,
        ]}
      >
        <Form<EditUserType> form={form} layout="vertical">
          <Form.Item label="Email" name="email">
            <Input disabled />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item
              label="Họ"
              name="firstName"
              rules={[{ required: true, message: "Vui lòng nhập họ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="lastName"
              rules={[{ required: true, message: "Vui lòng nhập tên" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-between">
            <Form.Item
              label="Ngày sinh"
              name="dateOfBirth"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
            >
              <DatePicker size="large" format="DD-MM-YYYY" />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
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
            </Form.Item>

            <Form.Item
              label="Quyền"
              name="roleId"
              rules={[{ required: true, message: "Vui lòng chọn quyền" }]}
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
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageUser;
