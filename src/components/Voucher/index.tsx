import React from "react";
import "./index.scss";
import logoVoucher from "../../assets/img/logoVoucher.png";
import commonUtils from "../../utils/commonUtils";
type VoucherProps = {
  handleClickApplyVoucher(
    typeVoucher: string,
    maxValue: number,
    value: string,
    name: string
  ): void;
  name: string;
  typeVoucher: string;
  value: string;
  maxValue: number;
  usedAmount: number;
};

const Voucher: React.FC<VoucherProps> = (props: VoucherProps) => {
  const handleClickApplyVoucher = () => {
    props.handleClickApplyVoucher(
      props.typeVoucher,
      props.maxValue,
      props.value,
      props.name
    );
  };
  return (
    <div className="box-voucher-small">
      <div className="content-left">
        <img src={logoVoucher}></img>
        <span>{props.name}</span>
      </div>
      <div className="border-center"></div>
      <div className="content-right">
        <div className="box-content-right">
          <span className="name-voucher">Giảm {props.value}</span>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => handleClickApplyVoucher()}
            className="use-voucher"
          >
            Dùng ngay
          </a>
          <span className="max-value-voucher">
            Giảm tối đa {props.maxValue}
          </span>
          <div className="box-percent">
            <div className="wrap-percent">
              <div
                style={{ width: `${props.usedAmount}%` }}
                className="percent"
              ></div>
            </div>
            <span className="used-percent">Đã dùng {props.usedAmount}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Voucher;
