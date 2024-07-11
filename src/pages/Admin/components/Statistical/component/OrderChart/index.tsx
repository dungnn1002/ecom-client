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
  const [timeRange, setTimeRange] = useState<"day" | "month" | "year" | "">(
    "day"
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

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

  const handleDataOrderByDayOfSpecificMonth = (
    dataOrder: any,
    month: number,
    year: number
  ) => {
    const result: any = {};
    dataOrder.forEach((order: any) => {
      const date = new Date(order.createdAt);
      if (date.getMonth() + 1 === month && date.getFullYear() === year) {
        const key = `${date.getDate()}`;
        if (result[key]) {
          result[key] += 1;
        } else {
          result[key] = 1;
        }
      }
    });
    return result;
  };

  const handleDataOrderByMonthOfSpecificYear = (
    dataOrder: any,
    year: number
  ) => {
    const result: any = {};
    dataOrder.forEach((order: any) => {
      const date = new Date(order.createdAt);
      if (date.getFullYear() === year) {
        const key = `${date.getMonth() + 1}`;
        if (result[key]) {
          result[key] += 1;
        } else {
          result[key] = 1;
        }
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

  const generateData = (range: "day" | "month" | "year" | "") => {
    switch (range) {
      case "day":
        return {
          labels: Object.keys(
            handleDataOrderByDayOfSpecificMonth(
              dataOrder,
              selectedMonth,
              selectedYear
            )
          ),
          datasets: [
            {
              label: "Số lượng đơn hàng theo ngày",
              data: Object.values(
                handleDataOrderByDayOfSpecificMonth(
                  dataOrder,
                  selectedMonth,
                  selectedYear
                )
              ),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        };
      case "month":
        return {
          labels: Object.keys(
            handleDataOrderByMonthOfSpecificYear(dataOrder, selectedYear)
          ),
          datasets: [
            {
              label: "Số lượng đơn hàng theo tháng",
              data: Object.values(
                handleDataOrderByMonthOfSpecificYear(dataOrder, selectedYear)
              ),
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
              label: "Số lượng đơn hàng theo năm",
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
          timeRange === "day"
            ? `ngày của tháng ${selectedMonth}/${selectedYear}`
            : timeRange === "month"
            ? `các tháng của năm ${selectedYear}`
            : "các năm"
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
      <div className="flex justify-end mb-4 space-x-2">
        <select
          className="border border-gray-300 rounded px-2 py-1"
          value={timeRange}
          onChange={(e) =>
            setTimeRange(e.target.value as "day" | "month" | "year" | "")
          }
        >
          <option value="day">Ngày</option>
          <option value="month">Tháng</option>
          <option value="year">Năm</option>
        </select>
        {timeRange === "day" && (
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
        )}
        {(timeRange === "day" || timeRange === "month") && (
          <select
            className="border border-gray-300 rounded px-2 py-1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option
                key={i + new Date().getFullYear() - 5}
                value={i + new Date().getFullYear() - 5}
              >
                {i + new Date().getFullYear() - 5}
              </option>
            ))}
          </select>
        )}
      </div>
      {timeRange && <Line data={data} options={options} />}
    </div>
  );
};

export default OrderChart;
