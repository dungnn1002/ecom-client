import React, { useEffect, useState } from "react";
import { getAllOrder } from "../../../../../../services/user";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrderChart: React.FC = () => {
  const [dataOrder, setDataOrder] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllOrder();
        setDataOrder(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const [timeRange, setTimeRange] = useState<"day" | "month" | "year">("month");
  //
  const handleDataOrderByDay = (dataOrder: any) => {
    const result: any = {};
    dataOrder.forEach((order: any) => {
      const date = new Date(order.createdAt);
      const key = `${date.getDate()}`;
      if (result[key]) {
        result[key] += 1;
      } else {
        result[key] = 1;
      }
    });
    return result;
  };

  // Xử lý dữ liệu theo tháng
  const handleDataOrderByMonth = (dataOrder: any) => {
    const result: any = {};
    dataOrder.forEach((order: any) => {
      const date = new Date(order.createdAt);
      const key = `${date.getMonth()}`;
      if (result[key]) {
        result[key] += 1;
      } else {
        result[key] = 1;
      }
    });
    return result;
  };
  const handleDataOrderByYear = (dataOrder: any) => {
    const result: any = {};
    dataOrder.forEach((order: any) => {
      const date = new Date(order.createdAt);
      const key = `${date.getFullYear()}`;
      if (result[key]) {
        result[key] += 1;
      } else {
        result[key] = 1;
      }
    });
    return result;
  };

  // Hàm để tạo dữ liệu biểu đồ dựa trên lựa chọn thời gian
  const generateData = (range: "day" | "month" | "year") => {
    switch (range) {
      case "day":
        return {
          // lấy ngày và số lượng đơn hàng thèo ngày
          labels: Object.keys(handleDataOrderByDay(dataOrder)),
          datasets: [
            {
              label: "Số lượng đơn hàng theo ngày",
              data: Object.values(handleDataOrderByDay(dataOrder)),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        };
      case "month":
        return {
          labels: Object.keys(handleDataOrderByMonth(dataOrder)),
          datasets: [
            {
              label: "Số lượng đơn hàng theo ngày",
              data: Object.values(handleDataOrderByMonth(dataOrder)),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        };
      case "year":
        return {
          labels: Object.keys(handleDataOrderByYear(dataOrder)),
          datasets: [
            {
              label: "Số lượng đơn hàng theo ngày",
              data: Object.values(handleDataOrderByYear(dataOrder)),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        };
      default:
        return {
          labels: [],
          datasets: [],
        };
    }
  };

  const data = generateData(timeRange);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Biểu đồ thống kê đơn hàng theo ${
          timeRange === "day" ? "ngày" : timeRange === "month" ? "tháng" : "năm"
        }`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: timeRange === "day" ? 5 : timeRange === "month" ? 100 : 500,
        },
      },
    },
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-end mb-4">
        <select
          className="border border-gray-300 rounded px-2 py-1"
          value={timeRange}
          onChange={(e) =>
            setTimeRange(e.target.value as "day" | "month" | "year")
          }
        >
          <option value="day">Ngày</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default OrderChart;
