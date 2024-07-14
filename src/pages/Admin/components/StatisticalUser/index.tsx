import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import type { TableProps } from "antd";
import { CiViewList } from "react-icons/ci";
import { getAllUser, getAllPriceOrderByUser } from "../../../../services/user";
import { defaultQueryParam } from "../../../../constants/type";
import { User } from "../../../../redux/slices/authSlice";
import dayjs from "dayjs";

const { Search } = Input;

interface DataUserType {
  id: number;
  stt: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  sex: string;
  role: string;
  money: number;
}

export type EditUserType = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  roleId: string;
  gender: string;
};

const StatisticalUser: React.FC = () => {
  const columns: TableProps<DataUserType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Tổng tiền đã mua",
      dataIndex: "money",
      key: "money",
      sorter: (a, b) => b.money - a.money,
    },
  ];

  const [dataUser, setDataUser] = useState<DataUserType[]>([]);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const fetchAllUser = async () => {
    const users = await getAllUser({ ...defaultQueryParam });
    const userData = await Promise.all(
      users.data.map(async (user: User, index: number) => {
        const totalPrice = await getAllPriceOrderByUser(user.id).then((res) =>
          res.reduce((acc: any, cur: any) => acc + cur.totalPrice, 0)
        );
        return {
          stt: index + 1,
          email: user.email,
          name: user.firstName + " " + user.lastName,
          phoneNumber: user.phoneNumber?.toString() || "",
          dateOfBirth: user.dob ? dayjs(user.dob).format("DD-MM-YYYY") : "",
          sex: user.gender?.toString() || "",
          role: user.roleId,
          id: +user.id,
          money: totalPrice,
        };
      })
    );
    setDataUser(userData.sort((a, b) => b.money - a.money));
  };

  const handleSearch = async (value: string) => {
    const users = await getAllUser({
      ...defaultQueryParam,
      phoneNumber: value,
    });
    const userData = await Promise.all(
      users.data.map(async (user: User, index: number) => {
        const totalPrice = await getAllPriceOrderByUser(user.id).then((res) =>
          res.reduce((acc: any, cur: any) => acc + cur.totalPrice, 0)
        );
        return {
          stt: index + 1,
          email: user.email,
          name: user.firstName + " " + user.lastName,
          phoneNumber: user.phoneNumber?.toString() || "",
          dateOfBirth: user.dob ? dayjs(user.dob).format("DD-MM-YYYY") : "",
          sex: user.gender?.toString() || "",
          role: user.roleId,
          id: +user.id,
          money: totalPrice,
        };
      })
    );
    setDataUser(userData.sort((a, b) => b.money - a.money));
  };

  return (
    <div>
      <div className="text-4xl font-semibold mt-4">Quản lý người dùng</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <CiViewList />
          <span>Danh sách người dùng</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center py-2">
            <Search
              placeholder="Tìm kiếm theo số điện thoại"
              style={{ width: 320 }}
              onSearch={handleSearch}
            />
            <button className="p-2 bg-green-700 rounded-md text-white">
              Xuất excel
            </button>
          </div>
          <Table columns={columns} dataSource={dataUser} />
        </div>
      </div>
    </div>
  );
};

export default StatisticalUser;
