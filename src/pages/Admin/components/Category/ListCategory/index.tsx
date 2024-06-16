import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message, Modal, Form, Select } from "antd";
import type { TableProps } from "antd";
import { CiViewList } from "react-icons/ci";
import { Input } from "antd";
import { ListType, defaultQueryParam } from "../../../../../constants/type";
import {
  deleteCategory,
  editCategory,
  getAllCategory,
} from "../../../../../services/category";
import { AdminButton } from "../../../../../components";
import { fetchAndProcessBrands } from "../../../../../constants/brand";
const { Search } = Input;
export interface CategoryType {
  id: number;
  brandName: string;
  categoryName: string;
}

export type EditCategoryType = {
  name: string;
  brandId: number;
};

const ListCategory: React.FC = () => {
  useEffect(() => {
    const fetchBrands = async () => {
      const processedBrands = await fetchAndProcessBrands();
      setBrands(processedBrands);
    };
    fetchBrands();
  }, []);
  const [brands, setBrands] = useState<ListType[]>([]);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const columns: TableProps<CategoryType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tên nhãn hàng",
      dataIndex: "brandName",
      key: "brandName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className=" text-yellow-400"
            onClick={() => {
              handleEditCategory(record.id);
            }}
          >
            Edit
          </a>
          <a className=" text-red-400" onClick={() => handleDelete(record.id)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];
  const handleEditCategory = (id: number) => {
    setOpen(true);
    const category = dataCategory.find((category) => category.id === id);
    if (category) {
      form.setFieldsValue({
        name: category.categoryName,
        brandId: category.brandName,
      });
    }
    setCategoryId(id);
  };
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteCategory(id);
      fetchAllCategory();
      messageApi.success(res.message);
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };
  const [dataCategory, setDataCategory] = useState<CategoryType[]>([]);
  useEffect(() => {
    fetchAllCategory();
  }, []);
  const fetchAllCategory = async () => {
    const res = await getAllCategory({ ...defaultQueryParam });
    const data: CategoryType[] = res.data.map(
      (category: any, index: number) => ({
        categoryName: category.name,
        brandName: category.brand.name,
        id: +category.id,
      })
    );
    setDataCategory(data);
  };
  const handleSearch = async (value: string) => {
    const res = await getAllCategory({ ...defaultQueryParam, name: value });
    const data: CategoryType[] = res.data.map(
      (category: any, index: number) => ({
        categoryName: category.name,
        brandName: category.brand.name,
        id: +category.id,
      })
    );
    setDataCategory(data);
  };
  const handleOk = async () => {
    const res = await editCategory(categoryId!, form.getFieldsValue());
    setOpen(false);
    fetchAllCategory();
    messageApi.success(res.message);
  };
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  const data: CategoryType[] = dataCategory.map((category, index) => ({
    stt: index + 1,
    brandName: category.brandName,
    categoryName: category.categoryName,
    id: +category.id,
  }));
  return (
    <div>
      {contextHolder}
      <div className="text-4xl font-semibold mt-4 ">Quản lý danh mục</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <CiViewList />
          <span>Danh sách danh mục</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center py-2">
            <Search
              placeholder="Tìm kiếm theo tên danh mục"
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
        <Form<EditCategoryType> form={form} layout="vertical">
          <Form.Item label="Tên danh mục" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Tên nhãn hàng" name="brandId">
            <Select
              className="w-full"
              showSearch
              placeholder="Chọn loại sản phẩm"
              optionFilterProp="children"
              size="large"
              options={brands}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListCategory;
