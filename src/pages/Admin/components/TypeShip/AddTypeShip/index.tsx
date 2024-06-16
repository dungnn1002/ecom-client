import React, { useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { Form, Input } from "antd";
import { AdminButton } from "../../../../../components";
import { addTypeShip } from "../../../../../services/typeship";
import { TypeShip } from "../ListTypeShip";
import { message } from "antd";
const AddTypeShip: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (value: TypeShip) => {
    value.price = Number(value.price);
    try {
      const res = await addTypeShip(value);
      const message = res.data.message.message;
      messageApi.open({
        type: "success",
        content: message,
      });
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };

  return (
    <>
      {contextHolder}
      <div>
        <div className="text-4xl font-semibold mt-4 ">
          Quản lý loại giao hàng
        </div>
        <div className="border-2 mt-4">
          <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
            <LiaShippingFastSolid />
            <span>Thêm loại giao hàng</span>
          </div>
          <div className="px-4 py-2">
            <Form onFinish={handleSubmit}>
              <div className="flex gap-10">
                <div className="w-1/2">
                  <label className="label" htmlFor="name">
                    Tên loại ship
                  </label>
                  <Form.Item<TypeShip>
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên nhãn hàng!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="name"
                      size="large"
                      className="mb-[8px]"
                      placeholder="Tên nhãn hàng"
                    />
                  </Form.Item>
                </div>
                <div className="w-1/2">
                  <label className="label" htmlFor="price">
                    Giá tiền
                  </label>
                  <Form.Item<TypeShip>
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên nhãn hàng!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="price"
                      size="large"
                      className="mb-[8px]"
                      placeholder="Giá tiền"
                    />
                  </Form.Item>
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
export default AddTypeShip;
