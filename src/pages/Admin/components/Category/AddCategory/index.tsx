import React, { useEffect, useState } from "react";
import { TbBrandAlgolia } from "react-icons/tb";
import { Form, Input, Select } from "antd";
import { AdminButton } from "../../../../../components";
import { message } from "antd";
import { addCategory } from "../../../../../services/category";
import { ListType } from "../../../../../constants";
import { fetchAndProcessBrands } from "../../../../../constants/brand";
export interface CategoryType {
  categoryName: string;
  brandId: number;
}

const AddCategory: React.FC = () => {
  const [brands, setBrands] = useState<ListType[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchBrands = async () => {
      const processedBrands = await fetchAndProcessBrands();
      setBrands(processedBrands);
    };
    fetchBrands();
  }, []);
  const handleSubmit = async (value: CategoryType) => {
    try {
      //convert brandID to number
      value.brandId = parseInt(value.brandId.toString());
      const res = await addCategory(value);
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
        <div className="text-4xl font-semibold mt-4 ">Quản lý danh mục</div>
        <div className="border-2 mt-4">
          <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
            <TbBrandAlgolia />
            <span>Thêm danh mục</span>
          </div>
          <div className="px-4 py-2">
            <Form onFinish={handleSubmit}>
              <div className="flex gap-10">
                <div className="w-1/2">
                  <label className="label" htmlFor="brandName">
                    Tên danh mục
                  </label>
                  <Form.Item<CategoryType>
                    name="categoryName"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên danh mục!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input
                      id="brandName"
                      size="large"
                      className="mb-[8px]"
                      placeholder="Tên danh mục"
                    />
                  </Form.Item>
                </div>
                <div className="w-1/2">
                  <label className="label" htmlFor="brandID">
                    Mã nhãn hàng
                  </label>
                  <Form.Item<CategoryType>
                    name="brandId"
                    rules={[
                      { required: true, message: "Vui lòng chọn nhãn hàng " },
                    ]}
                    hasFeedback
                  >
                    <Select
                      className="w-full"
                      showSearch
                      placeholder="Chọn loại sản phẩm"
                      optionFilterProp="children"
                      size="large"
                      options={brands}
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
export default AddCategory;
