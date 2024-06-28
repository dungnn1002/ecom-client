import React, { useEffect, useState } from "react";
import bannerPhoto from "../../assets/img/banner-voucher.jpg";
import voucherTodayPhoto from "../../assets/img/voucher-today.png";
import "./index.scss";
import { HeaderLogin, Footer, BigVoucher } from "../../components";
import { TypeVoucher } from "../ShopCart";
import { getAllCodeVoucher } from "../../services/voucher";
const VoucherPage: React.FC = () => {
  const [listVoucher, setListVoucher] = useState<TypeVoucher[]>([]);
  useEffect(() => {
    getAllCodeVoucher().then((res) => {
      const listVoucher = res.data.map((item: any) => {
        if (item.typeVoucher.typeVoucher === "PHAN_TRAM") {
          item.typeVoucher.typeVoucher = "%";
        } else {
          item.typeVoucher.typeVoucher = "VNĐ";
        }
        return {
          id: item.id,
          name: item.codeVoucher,
          value: item.typeVoucher.value + item.typeVoucher.typeVoucher,
          maxValue: item.typeVoucher.maxValue,
          amount: item.amount,
          typeVoucher: item.typeVoucher.typeVoucher,
        };
      });
      setListVoucher(listVoucher);
    });
  }, []);
  return (
    <>
      <HeaderLogin />
      <div className="voucher-container">
        <div className="voucher-banner mb-4">
          <img className="photo-banner" src={bannerPhoto}></img>
          <img src={voucherTodayPhoto}></img>
          <img src="https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lwhr7woufh7d2c@resize_w960_nl.webp"></img>
        </div>
        <div className="voucher-list">
          {listVoucher.map((voucher) => (
            <div className="mb-4">
              <BigVoucher
                name={voucher.name}
                typeVoucher={voucher.typeVoucher}
                maxValue={voucher.maxValue}
                amount={voucher.amount}
                value={voucher.value}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VoucherPage;
