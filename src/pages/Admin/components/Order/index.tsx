import React, { useEffect, useState } from "react";
import { Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { CiViewList } from "react-icons/ci";
import { Input } from "antd";
import { ListType, defaultQueryParam } from "../../../../constants/type";
// import {getAll} from "../../../../services/category";
import { getAllOrder } from "../../../../services/user";
import { authSelector } from "../../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { Search } = Input;

const ListOrder: React.FC = () => {
  const navigate = useNavigate();
  const [dataOrder, setDataOrder] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const { user } = useSelector(authSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllOrder({ ...defaultQueryParam });
        setDataOrder(res);
        setFilteredData(res); // Initialize filteredData with the full dataset
      } catch (error) {
        message.error("Lỗi khi lấy dữ liệu");
      }
    };
    fetchData();
  }, []);

  const handleViewDetail = (id: number) => {
    navigate(`/admin/detail-order/${id}`);
  };

  const handleSearch = (value: string) => {
    const filtered = dataOrder.filter((order: any) =>
      order.addressUser.user.phoneNumber.includes(value)
    );
    setFilteredData(filtered);
  };

  const columns: TableProps["columns"] = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Loại ship",
      dataIndex: "typeShip",
      key: "typeShip",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Mã voucher",
      dataIndex: "voucher",
      key: "voucher",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Hình thức",
      dataIndex: "payment",
      key: "payment",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className=" text-blue-400"
            onClick={() => {
              handleViewDetail(record.id);
            }}
          >
            Xem chi tiết
          </a>
        </Space>
      ),
    },
  ];

  const data = filteredData.map((order, index) => ({
    key: index,
    id: order.id,
    phoneNumber: order.addressUser.user.phoneNumber,
    email: order.addressUser.user.email,
    createdAt: dayjs(order.createdAt).format("DD/MM/YYYY"),
    typeShip: order.TypeShip.name,
    voucher: order.Voucher.codeVoucher,
    payment:
      order.isPaymentOnline === 1
        ? "Thanh toán Online"
        : "Thanh toán khi nhận hàng",
    status: "Chờ xác nhận",
  }));

  return (
    <div>
      <div className="text-4xl font-semibold mt-4">Quản lý đơn hàng</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <CiViewList />
          <span>Danh sách đơn hàng</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center py-2">
            <Search
              placeholder="Tìm kiếm theo SĐT"
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
    </div>
  );
};

export default ListOrder;
