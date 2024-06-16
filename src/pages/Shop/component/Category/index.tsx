import React, { useEffect, useState } from "react";
import "./index.scss";
import { fetchAndProcessCategory } from "../../../../constants/category";
import { ListType } from "../../../../constants";
const Category: React.FC = () => {
  const [category, setCategory] = useState<ListType[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const category = await fetchAndProcessCategory();
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
            <li key={index} className="mr-2">
              <a className="btn-category">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
