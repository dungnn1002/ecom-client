import React, { useEffect, useState } from "react";
import "./index.scss";
import { fetchAndProcessCategory } from "../../../../constants/category";
import { ListType } from "../../../../constants";
const Category: React.FC<{
  onSelectCategory: (value: number) => void;
  valueActive: number;
}> = ({ onSelectCategory, valueActive }) => {
  const [category, setCategory] = useState<ListType[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const category = await fetchAndProcessCategory();
      category.unshift({ label: "Tất cả", value: 0 });
      setCategory(category);
    };
    fetchCategory();
  }, []);
  return (
    <div>
      <div className="category-container">
        <div className="title-category-list">
          <h3>Các loại sản phẩm</h3>
        </div>
        <ul className="list-category">
          {category.map((item, index) => (
            <li
              onClick={() => onSelectCategory(item.value)}
              key={index}
              className={`category-item ${
                valueActive === item.value ? "active" : ""
              }`}
            >
              <a className="btn-category">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
