import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import "./index.scss";
import { ButtonShop } from "../../components";
import { getShopCart } from "../../services/user";
import { getAllTypeShip } from "../../services/typeship";
import { Cart } from "../ShopCart/index";

const Order: React.FC = () => {
  useEffect(() => {
    getShopCart().then((res) => {
      const listProduct = res.map((item: any) => {
        return {
          id: item.id,
          name: item.productSize.product.name + " - " + item.productSize.size,
          price: item.productSize.product.discountPrice,
          quantity: item.quantity,
          image: item.productSize.productImage,
        };
      });
      setListProduct(listProduct);
    });
  }, []);
  const [listProduct, setListProduct] = useState<Cart[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const handlePaymentOnline = () => {
    setSelectedPayment("online");
    console.log("Thanh toán online");
  };
  const handlePaymentOffice = () => {
    setSelectedPayment("office");
    console.log("Thanh toán khi nhận hàng");
  };
  const handlePaymentPaypal = () => {
    setSelectedPaymentOption("paypal");
    console.log("Thanh toán paypal");
  };
  const handlePaymentVnpay = () => {
    setSelectedPaymentOption("vnpay");
    console.log("Thanh toán vnpay");
  };
  return (
    <div className="order-container">
      <div className="wrap">
        <div className="wrap-address">
          <div className="border-top-address-order"></div>
          <div className="address">
            <div className="flex items-center gap-2 text-[#60b108] mb-3">
              <FaMapMarkerAlt className="icon" />
              <div className="text-xl font-medium"> Địa chỉ giao hàng</div>
            </div>
            <div className="content flex justify-between">
              <div className="flex font-bold">
                <div className="name">Nguyễn Văn A </div>
                <div className="phone">(0974979259)</div>
              </div>
              <div className="address-detail">
                Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội
              </div>
              <div className="edit">Thay đổi</div>
            </div>
          </div>
        </div>
        <div className="shop-cart mt-8">
          <div className="header-table pb-2 text-[#797979]">
            <div className="header-product-item">Sản phẩm</div>
            <div className="header-product-price">Giá</div>
            <div className="header-product-quantity">Số lượng</div>
            <div className="header-product-total">Tổng tiền</div>
          </div>
          <div className="mt-8">
            {listProduct.map((product) => (
              <div className="pb-8 list-product mt-8 px-2">
                <div className="body-table">
                  <div className="product-item">
                    <div className="product-img">
                      <img src={product.image} alt="" />
                    </div>
                    <div className="product-name">{product.name}</div>
                  </div>
                  <div className="product-price">{product.price}</div>
                  <div className="product-quantity text-center">
                    {product.quantity}
                  </div>
                  <div className="product-total text-[#60b108]">
                    {/* {product.total} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="shipper px-2 flex justify-between py-4">
            <div>Đơn vị vận chuyển</div>
            <div className="font-semibold text-[#60b108]">
              Giao hàng tiết kiệm
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8 mt-8">
              <div>ShopEase Voucher</div>
              <div>
                <a
                  className="font-semibold text cursor-pointer text-[#60b108]"
                  type="link"
                >
                  Chọn hoặc nhập mã
                </a>
              </div>
            </div>
            <div className="flex justify-between mt-8 px-2 items-center">
              <div>Tổng thanh toán </div>
              <div>(2 sản phẩm) :</div>
              <div className="font-semibold text-[#60b108] text-2xl ml-4">
                200000đ
              </div>
            </div>
          </div>
        </div>
        <div className="wrap-payment mt-8">
          <div className="payment">
            <div className="">
              <div className="flex items-center gap-2 text-[#60b108] mb-3">
                <MdOutlinePayment className="icon" />
                <div className="text-xl font-medium">
                  Phương thức thanh toán
                </div>
              </div>
              <div className="content flex gap-8">
                <div
                  onClick={handlePaymentOnline}
                  className={selectedPayment === "online" ? "selected" : ""}
                >
                  Thanh toán Online
                </div>
                <div
                  onClick={handlePaymentOffice}
                  className={selectedPayment === "office" ? "selected" : ""}
                >
                  Thay toán khi nhận hàng
                </div>
              </div>
              {selectedPayment === "online" && (
                <div className="mt-2 flex gap-8">
                  <div
                    onClick={handlePaymentPaypal}
                    className={`payment-option ${
                      selectedPaymentOption === "paypal" ? "selectedOption" : ""
                    }`}
                  >
                    Thanh toán PAYPAL
                  </div>
                  <div
                    onClick={handlePaymentVnpay}
                    className={`payment-option ${
                      selectedPaymentOption === "vnpay" ? "selectedOption" : ""
                    }`}
                  >
                    Thanh toán VNPAY
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="detail-payment">
            <div className="payment-detail">
              <span className="label">Tổng tiền hàng:</span>
              <span className="value">₫0</span>
            </div>
            <div className="payment-detail">
              <span className="label">Tổng giảm giá:</span>
              <span className="value">₫0</span>
            </div>
            <div className="payment-detail">
              <span className="label">Phí vận chuyển:</span>
              <span className="value">₫0</span>
            </div>
            <div className="payment-detail">
              <span className="label">Tổng thanh toán:</span>
              <span className="value">₫0</span>
            </div>
            <div className="button-payment">
              <ButtonShop>Thanh toán</ButtonShop>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
