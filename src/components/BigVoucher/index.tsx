import React from "react";
import "./index.scss";
import logoVoucher from "../../assets/img/logoVoucher.png";
import commonUtils from "../../utils/commonUtils";
type VoucherProps = {
  name: string;
  typeVoucher: string;
  value: string;
  maxValue: number;
  amount: number;
};

const BigVoucher: React.FC<VoucherProps> = (props: VoucherProps) => {
  return (
    <div>
      <div style={{ width: "550px", height: "330px" }} className="box-voucher">
        <div className="content-left">
          <img src={logoVoucher}></img>
          <span>{props.name}</span>
        </div>
        <div className="border-center"></div>
        <div className="content-right">
          <div className="box-content-right">
            <span className="name-voucher">Giảm {props.value}</span>
            <span className="max-value-voucher">
              {" "}
              Giảm tối đa {commonUtils.formatPriceToVND(props.maxValue)}
            </span>
            <div className="box-percent">
              <span className="used-percent">Số lượng {props.amount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BigVoucher;
