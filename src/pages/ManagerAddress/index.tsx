import React, { useEffect, useState } from "react";
import { TypeShipAddressResponse } from "../../constants";
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import {
  getShipAddress,
  addShipAddress,
  deleteShipAddress,
  editShipAddress,
} from "../../services/user";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AdminButton } from "../../components";
import { Form, Input, Modal, message } from "antd";
const ManagerAddress: React.FC = () => {
  const { user } = useSelector(authSelector);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const navigate = useNavigate();
  const [idAddress, setIdAddress] = useState<number>(0);
  const [listShipAddress, setListShipAddress] = useState<
    TypeShipAddressResponse[]
  >([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [openModalAddNewAddress, setOpenModalAddNewAddress] =
    useState<boolean>(false);
  const handleCancelAddNewAddress = () => {
    setOpenModalAddNewAddress(false);
  };
  const handleAddNewAddress = () => {
    setOpenModalAddNewAddress(true);
  };
  const handleAddNewAddressOk = () => {
    form.validateFields().then((values) => {
      const paramPostShipAddress = {
        userId: user!.id,
        shipName: form.getFieldValue("shipName"),
        shipPhone: form.getFieldValue("shipPhone"),
        shipEmail: form.getFieldValue("shipEmail"),
        shipAddress: form.getFieldValue("shipAddress"),
      };
      addShipAddress(paramPostShipAddress).then((res) => {
        setListShipAddress([...listShipAddress, res]);
      });
      setOpenModalAddNewAddress(false);
    });
  };
  const handleDeleteAddress = async (id: number) => {
    await deleteShipAddress(id).then(() => {
      setListShipAddress(listShipAddress.filter((item) => item.id !== id));
    });
    messageApi.success("Xóa địa chỉ thành công");
  };
  const [openModalEditAddress, setOpenModalEditAddress] =
    useState<boolean>(false);
  const handleCancelEditAddress = () => {
    setOpenModalEditAddress(false);
  };
  const handleEditAddress = (id: number) => {
    setOpenModalEditAddress(true);
    form2.setFieldsValue(listShipAddress.find((item) => item.id === id));
    setIdAddress(id);
  };
  const handleEditAddressOk = () => {
    form2.validateFields().then((values) => {
      const paramPostShipAddress = {
        id: idAddress,
        userId: user!.id,
        shipName: form2.getFieldValue("shipName"),
        shipPhone: form2.getFieldValue("shipPhone"),
        shipEmail: form2.getFieldValue("shipEmail"),
        shipAddress: form2.getFieldValue("shipAddress"),
      };
      editShipAddress(paramPostShipAddress).then((res) => {
        setListShipAddress(
          listShipAddress.map((item) => (item.id === idAddress ? res : item))
        );
      });
      setOpenModalEditAddress(false);
    });
  };

  useEffect(() => {
    getShipAddress().then((res) => {
      setListShipAddress(res);
    });
  }, [listShipAddress]);
  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="grid grid-cols-5 gap-4 ml-20 mr-20">
          <div className="col-span-4 p-6 bg-white  rounded-md">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-semibold text-gray-800">
                Địa chỉ của tôi
              </div>
              <div className="flex items-center text-blue-500 cursor-pointer hover:text-blue-700">
                <FiPlus className="mr-2" />
                <span onClick={handleAddNewAddress}>Thêm địa chỉ mới</span>
              </div>
              <Modal
                title="Thêm địa chỉ mới"
                open={openModalAddNewAddress}
                footer={[
                  <div className="flex gap-2 items-center justify-end">
                    <div>
                      <button
                        className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                        key="back"
                        onClick={handleCancelAddNewAddress}
                      >
                        Hủy
                      </button>
                    </div>
                    <div>
                      <AdminButton key="submit" onClick={handleAddNewAddressOk}>
                        Cập nhật
                      </AdminButton>
                    </div>
                  </div>,
                ]}
              >
                <Form form={form} layout="vertical">
                  <div className="flex justify-between">
                    <Form.Item
                      label="Họ và tên"
                      name="shipName"
                      rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Số điện thoại"
                      name="shipPhone"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="Email"
                    name="shipEmail"
                    rules={[{ required: true, message: "Vui lòng nhập email" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Địa chỉ"
                    name="shipAddress"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </Modal>
            </div>

            {/* Address List */}
            {listShipAddress.map((item) => (
              <div key={item.id} className="flex flex-col space-y-4">
                <div className="p-4 bg-gray-50 rounded-md shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-lg text-gray-800">
                      {item.shipName} - {item.shipPhone}
                    </span>
                    <div className="flex gap-8">
                      <span
                        className="text-yellow-500 cursor-pointer hover:text-yellow-700"
                        onClick={() => handleEditAddress(item.id)}
                      >
                        Sửa
                      </span>
                      <span
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => handleDeleteAddress(item.id)}
                      >
                        Xóa
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-600">{item.shipAddress}</span>
                  <Modal
                    title="Chỉnh sửa địa chỉ"
                    open={openModalEditAddress}
                    footer={[
                      <div className="flex gap-2 items-center justify-end">
                        <div>
                          <button
                            className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                            key="back"
                            onClick={handleCancelEditAddress}
                          >
                            Hủy
                          </button>
                        </div>
                        <div>
                          <AdminButton
                            key="submit"
                            onClick={handleEditAddressOk}
                          >
                            Cập nhật
                          </AdminButton>
                        </div>
                      </div>,
                    ]}
                  >
                    <Form form={form2} layout="vertical">
                      <div className="flex justify-between">
                        <Form.Item
                          label="Họ và tên"
                          name="shipName"
                          rules={[
                            { required: true, message: "Vui lòng nhập tên" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Số điện thoại"
                          name="shipPhone"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập số điện thoại",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <Form.Item
                        label="Email"
                        name="shipEmail"
                        rules={[
                          { required: true, message: "Vui lòng nhập email" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Địa chỉ"
                        name="shipAddress"
                        rules={[
                          { required: true, message: "Vui lòng nhập địa chỉ" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
                {/* You can add more addresses here following the same structure */}
              </div>
            ))}
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
                    <div
                      onClick={() => {
                        navigate(`/profile/${user?.id}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Thông tin cá nhân
                    </div>
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
                  <div className="font-medium">Đơn hàng</div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                  <BiSolidDiscount className="text-red-400 text-2xl" />
                  <a href="/voucher" className="font-medium">
                    Voucher
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagerAddress;
