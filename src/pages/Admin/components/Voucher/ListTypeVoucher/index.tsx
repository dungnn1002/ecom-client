import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { CiDiscount1 } from "react-icons/ci";
import { Input } from "antd";
import { defaultQueryParam } from "../../../../../constants/type";
import { getAllTypeVoucher } from "../../../../../services/voucher";
const { Search } = Input;
export interface TypeVoucher {
  typeVoucher: string;
  value: number;
  minValue: number;
  maxValue: number;
}

const columns: TableProps<TypeVoucher>["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Loại voucher",
    dataIndex: "typeVoucher",
    key: "typeVoucher",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Giá trị",
    dataIndex: "value",
    key: "value",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Giá trị tối thiểu",
    dataIndex: "minValue",
    key: "minValue",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Giá trị tối đa",
    dataIndex: "maxValue",
    key: "maxValue",
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

const ListTypeVoucher: React.FC = () => {
  const [dataTypeVoucher, setDataTypeVoucher] = useState<TypeVoucher[]>([]);
  useEffect(() => {
    fetchAllTypeVoucher();
  }, []);
  const fetchAllTypeVoucher = async () => {
    const data = await getAllTypeVoucher({ ...defaultQueryParam });
    setDataTypeVoucher(data.data);
  };
  const data: TypeVoucher[] = dataTypeVoucher.map((typevoucher, index) => ({
    stt: index + 1,
    typeVoucher: typevoucher.typeVoucher,
    value: typevoucher.value,
    minValue: typevoucher.minValue,
    maxValue: typevoucher.maxValue,
  }));
  return (
    <div>
      <div className="text-4xl font-semibold mt-4 ">Quản lý loại voucher</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <CiDiscount1 />
          <span>Danh sách loại khuyến mãi</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center py-2">
            <Search
              placeholder="Tìm kiếm theo tên voucher"
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

export default ListTypeVoucher;
