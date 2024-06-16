import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { LiaShippingFastSolid } from "react-icons/lia";
import { Input } from "antd";
import { defaultQueryParam } from "../../../../../constants/type";
import { getAllTypeShip } from "../../../../../services/typeship";
const { Search } = Input;
export interface TypeShip {
  name: string;
  price: number;
}

const columns: TableProps<TypeShip>["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên loại ship",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Giá tiền",
    dataIndex: "price",
    key: "price",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a className=" text-yellow-400">Edit</a>
        <a className=" text-red-400">Delete</a>
      </Space>
    ),
  },
];

const ListTypeShip: React.FC = () => {
  const [dataTypeShip, setDataTypeShip] = useState<TypeShip[]>([]);
  useEffect(() => {
    fetchAllTypeShip();
  }, []);
  const fetchAllTypeShip = async () => {
    const data = await getAllTypeShip({ ...defaultQueryParam });
    setDataTypeShip(data.data);
  };
  const data: TypeShip[] = dataTypeShip.map((typeship, index) => ({
    stt: index + 1,
    name: typeship.name,
    price: typeship.price,
  }));
  return (
    <div>
      <div className="text-4xl font-semibold mt-4 ">Quản lý loại giao hàng</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <LiaShippingFastSolid />
          <span>Danh sách loại giao hàng</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center py-2">
            <Search
              placeholder="Tìm kiếm theo tên loại giao hàng"
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

export default ListTypeShip;
