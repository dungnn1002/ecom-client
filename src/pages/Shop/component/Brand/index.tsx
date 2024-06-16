import React, { useEffect, useState } from "react";
import "./index.scss";
import { fetchAndProcessBrands } from "../../../../constants/brand";
import { ListType } from "../../../../constants";
const Brand: React.FC = () => {
  const [brands, setBrands] = useState<ListType[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const brands = await fetchAndProcessBrands();
      setBrands(brands);
    };
    fetchCategory();
  }, []);
  return (
    <div>
      <div className="category-container">
        <div className="title-category-list">
          <h3>Các thương hiệu</h3>
        </div>
        <ul className="list-category">
          {brands.map((item, index) => (
            <li key={index} className="mr-2">
              <a className="btn-category">{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Brand;
