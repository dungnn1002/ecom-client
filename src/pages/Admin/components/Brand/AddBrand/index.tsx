import React, { useState } from "react";
import { BrandType } from "../ListBrand";
import { TbBrandAlgolia } from "react-icons/tb";
import { Form, Input } from "antd";
import { AdminButton } from "../../../../../components";
import { addBrand } from "../../../../../services/brand";
import { message } from "antd";
const AddBrand: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (value: BrandType) => {
    try {
      const res = await addBrand(value);
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
        <div className="text-4xl font-semibold mt-4 ">Quản lý nhãn hàng</div>
        <div className="border-2 mt-4">
          <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
            <TbBrandAlgolia />
            <span>Thêm nhãn hàng</span>
          </div>
          <div className="px-4 py-2">
            <Form onFinish={handleSubmit}>
              <div className="flex gap-10">
                <div className="w-1/2">
                  <label className="label" htmlFor="name">
                    Tên nhãn hàng
                  </label>
                  <Form.Item<BrandType>
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
export default AddBrand;
