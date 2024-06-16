import React from "react";
import "./index.scss";

const DetailedSpecifications: React.FC = () => {
  return (
    <div className="specifications">
      <div className="spec-row">
        <div className="spec-title">Chiều rộng:</div>
        <div className="spec-detail">27.5cm</div>
      </div>
      <div className="spec-row">
        <div className="spec-title">Chiều dài:</div>
        <div className="spec-detail">47cm</div>
      </div>
      <div className="spec-row">
        <div className="spec-title">Khối lượng:</div>
        <div className="spec-detail">320gam</div>
      </div>
      <div className="spec-row">
        <div className="spec-title">Kiểm tra chất lượng:</div>
        <div className="spec-detail">có</div>
      </div>
      <div className="spec-row">
        <div className="spec-title">Bảo hành:</div>
        <div className="spec-detail">có</div>
      </div>
    </div>
  );
};

export default DetailedSpecifications;
