import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { PiFlagBanner } from "react-icons/pi";
import { Input } from "antd";
import { defaultQueryParam } from "../../../../../constants/type";
const { Search } = Input;
export interface BannerType {
  name: string;
  image: string;
}

const columns: TableProps<BannerType>["columns"] = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Tên băng rôn",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
    // render image
    render: (url) => <img src={url} alt="banner" />,
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

const ListBanner: React.FC = () => {
  const [dataBanner, setDataBanner] = useState<BannerType[]>([]);
  useEffect(() => {
    fetchAllUser();
  }, []);
  const fetchAllUser = async () => {
    const data = await getAllBanner({ ...defaultQueryParam });
    setDataBanner(data.data);
  };
  const data: BannerType[] = dataBanner.map((Banner, index) => ({
    stt: index + 1,
    name: Banner.name,
  }));
  return (
    <div>
      <div className="text-4xl font-semibold mt-4 ">Quản lý băng rôn</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <PiFlagBanner />
          <span>Danh sách băng rôn</span>
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

export default ListBanner;
