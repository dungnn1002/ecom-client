import React, { useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { Form, Input, Select } from "antd";
import { AdminButton } from "../../../../../components";
import { addTypeVoucher } from "../../../../../services/voucher";
import { TypeVoucher } from "../ListTypeVoucher";
import { message } from "antd";
const AddTypeVoucher: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (value: TypeVoucher) => {
    value.value = Number(value.value);
    value.minValue = Number(value.minValue);
    value.maxValue = Number(value.maxValue);
    try {
      const res = await addTypeVoucher(value);
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
        <div className="text-4xl font-semibold mt-4 ">Quản lý voucher</div>
        <div className="border-2 mt-4">
          <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
            <CiDiscount1 />
            <span>Thêm loại khuyến mãi</span>
          </div>
          <div className="px-4 py-2">
            <Form onFinish={handleSubmit}>
              <div className="flex gap-10">
                <div className="w-1/2">
                  <label className="label" htmlFor="typeVoucher">
                    Loại Voucher
                  </label>
                  <Form.Item<TypeVoucher>
                    name="typeVoucher"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn loại voucher ",
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      className="w-full"
                      showSearch
                      placeholder="Chọn loại voucher"
                      optionFilterProp="children"
                      size="large"
                      options={[
                        { label: "Phần trăm", value: "PHAN_TRAM" },
                        { label: "VNĐ", value: "VND" },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="w-1/2">
                  <label className="label" htmlFor="value">
                    Giá trị
                  </label>
                  <Form.Item<TypeVoucher>
                    name="value"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá trị!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="value"
                      size="large"
                      className="mb-[8px]"
                      placeholder="Giá tiền"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="w-1/2">
                  <label className="label" htmlFor="minValue">
                    Giá trị tối thiểu
                  </label>
                  <Form.Item<TypeVoucher>
                    name="minValue"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá trị tối thiểu!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="minValue"
                      size="large"
                      className="mb-[8px]"
                      placeholder="Giá trị tối thiểu"
                    />
                  </Form.Item>
                </div>
                <div className="w-1/2">
                  <label className="label" htmlFor="maxValue">
                    Giá tiền
                  </label>
                  <Form.Item<TypeVoucher>
                    name="maxValue"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá trị tối đa!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="maxValue"
                      size="large"
                      className="mb-[8px]"
                      placeholder="Giá trị tối đa"
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
export default AddTypeVoucher;
