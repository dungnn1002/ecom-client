import React, { useEffect, useState } from "react";
import "./index.scss";
import { fetchAndProcessBrands } from "../../../../constants/brand";
import { ListType } from "../../../../constants";
// props valueActive
const Brand: React.FC<{
  onSelectBrand: (value: number) => void;
  valueActive: number;
}> = ({ onSelectBrand, valueActive }) => {
  const [brands, setBrands] = useState<ListType[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const brands = await fetchAndProcessBrands();
      brands.unshift({ label: "Tất cả", value: 0 });
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
            <li
              onClick={() => onSelectBrand(item.value)}
              key={index}
              className={`brand-item ${
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

export default Brand;
