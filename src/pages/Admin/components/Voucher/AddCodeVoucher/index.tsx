import React, { useEffect, useState } from "react";
import { CiDiscount1 } from "react-icons/ci";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import { AdminButton } from "../../../../../components";
import { addCodeVoucher } from "../../../../../services/voucher";
import { TypeVoucher } from "../ListTypeVoucher";
import { message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { fetchAndProcessTypeVouchers } from "../../../../../constants/typeVoucher";
import { ListType } from "../../../../../constants";
const AddCodeVoucher: React.FC = () => {
  const [listTypeVoucher, setListTypeVoucher] = useState<ListType[]>([]);
  useEffect(() => {
    const fetchTypeVoucher = async () => {
      const processedTypeVouchers = await fetchAndProcessTypeVouchers();
      setListTypeVoucher(processedTypeVouchers);
    };
    fetchTypeVoucher();
  }, []);
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (value: TypeVoucher) => {
    console.log(value);
    try {
      const res = await addCodeVoucher(value);
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
        <div className="text-4xl font-semibold mt-4 ">Quản lý mã voucher</div>
        <div className="border-2 mt-4">
          <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
            <CiDiscount1 />
            <span>Thêm mã voucher</span>
          </div>
          <div className="px-4 py-2">
            <Form onFinish={handleSubmit}>
              <div className="flex gap-10">
                <div className="w-1/2">
                  <label className="label" htmlFor="email">
                    Ngày bắt đầu
                  </label>
                  <FormItem
                    name="fromDate"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày bắt đầu ",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker
                      className="w-full"
                      size="large"
                      placeholder="Ngày bắt đầu"
                      inputReadOnly
                      format={"DD/MM/YYYY"}
                    />
                  </FormItem>
                </div>
                <div className="w-1/2">
                  <label className="label" htmlFor="email">
                    Ngày kết thúc
                  </label>
                  <FormItem
                    name="toDate"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày kết thúc ",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker
                      className="w-full"
                      size="large"
                      placeholder="Ngày kết thúc"
                      inputReadOnly
                      format={"DD/MM/YYYY"}
                    />
                  </FormItem>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="w-1/4">
                  <label className="label" htmlFor="typeVoucherId">
                    Loại Voucher
                  </label>
                  <Form.Item
                    name="typeVoucherId"
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
                      options={listTypeVoucher}
                    />
                  </Form.Item>
                </div>
                <div className="w-1/3">
                  <label className="label" htmlFor="amount">
                    Số lượng mã
                  </label>
                  <Form.Item
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng mã voucher",
                      },
                    ]}
                    hasFeedback
                  >
                    <InputNumber
                      id="amount"
                      min={1}
                      size="large"
                      className="w-full"
                    />
                  </Form.Item>
                </div>
                <div className="w-1/3">
                  <label className="label" htmlFor="codeVoucher">
                    Mã voucher
                  </label>
                  <Form.Item
                    name="codeVoucher"
                    rules={[
                      { required: true, message: "Vui lòng nhập mã voucher" },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="name"
                      size="large"
                      className="mb-[8px]"
                      placeholder="Mã voucher"
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
export default AddCodeVoucher;
