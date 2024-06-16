import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { CiDiscount1 } from "react-icons/ci";
import { Input } from "antd";
import { defaultQueryParam } from "../../../../../constants/type";
import { getAllCodeVoucher } from "../../../../../services/voucher";
import { TypeCodeVoucherResponse } from "../../../../../constants/type";
const { Search } = Input;

const columns: TableProps["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Mã voucher",
    dataIndex: "codeVoucher",
    key: "codeVoucher",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Loại voucher",
    dataIndex: "typeVoucher",
    key: "codeVoucher",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Số lượng",
    dataIndex: "amount",
    key: "amount",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Đã sử dụng",
    dataIndex: "usedMount",
    key: "usedMount",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "fromDate",
    key: "fromDate",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Ngày kết thúc",
    dataIndex: "toDate",
    key: "toDate",
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

const ListCodeVoucher: React.FC = () => {
  const [dataCodeVoucher, setDataCodeVoucher] = useState<
    TypeCodeVoucherResponse[]
  >([]);
  useEffect(() => {
    fetchAllCodeVoucher();
  }, []);
  const fetchAllCodeVoucher = async () => {
    const data = await getAllCodeVoucher({ ...defaultQueryParam });
    setDataCodeVoucher(data.data);
  };
  const data = dataCodeVoucher.map((typevoucher, index) => ({
    typeVoucherId: +typevoucher.typeVoucherId,
    fromDate: typevoucher.fromDate,
    stt: index + 1,
    codeVoucher: typevoucher.codeVoucher,
    amount: +typevoucher.amount,
    toDate: typevoucher.toDate,
    typeVoucher:
      typevoucher.typeVoucher.value + " " + typevoucher.typeVoucher.typeVoucher,
  }));
  return (
    <div>
      <div className="text-4xl font-semibold mt-4 ">Quản lý mã voucher</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <CiDiscount1 />
          <span>Danh sách mã voucher</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center py-2">
            <Search
              placeholder="Tìm kiếm theo mã voucher"
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

export default ListCodeVoucher;
