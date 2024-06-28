import React, { useEffect, useState } from "react";
import { Space, Table, Tag, message } from "antd";
import type { TableProps } from "antd";
import { CiViewList } from "react-icons/ci";
import { Input } from "antd";
import { defaultQueryParam } from "../../../../../constants/type";
import { getAllBrand, deleteBrand } from "../../../../../services/brand";
import { deleteCategory } from "../../../../../services/category";

const { Search } = Input;
export interface BrandType {
  id: number;
  name: string;
}

const ListBrand: React.FC = () => {
  const columns: TableProps<BrandType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên nhãn hàng",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a className=" text-yellow-400">Edit</a>
          <a className=" text-red-400" onClick={() => handleDelete(record.id)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteBrand(id);
      fetchAllBrand();
      messageApi.success(res.message);
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [dataBrand, setDataBrand] = useState<BrandType[]>([]);
  useEffect(() => {
    fetchAllBrand();
  }, []);
  const fetchAllBrand = async () => {
    const data = await getAllBrand({ ...defaultQueryParam });
    setDataBrand(data.data);
  };
  const data: BrandType[] = dataBrand.map((brand, index) => ({
    key: brand.id,
    stt: index + 1,
    name: brand.name,
    id: brand.id,
  }));
  return (
    <div>
      {contextHolder}
      <div className="text-4xl font-semibold mt-4 ">Quản lý nhãn hàng</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <CiViewList />
          <span>Danh sách nhãn hàng</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center py-2">
            <Search
              placeholder="Tìm kiếm theo tên nhãn hàng"
              style={{ width: 320 }}
            />
            <button className="p-2 bg-green-700 rounded-md text-white">
              Xuất excel
            </button>
          </div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
};

export default ListBrand;
