import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../../services/user";
import commonUtils from "../../../../utils/commonUtils";
const DetailOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [address, setAddress] = useState<any>({});
  const [listOrderDetail, setListOrderDetail] = useState<any>([]);
  const [typeShip, setTypeShip] = useState<any>([]);
  const [voucher, setVoucher] = useState<any>([]);
  const [order, setOrder] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrderById(Number(id));
        setOrder(res);
        setAddress(res.addressUser);
        setListOrderDetail(res.OrderDetaill);
        setTypeShip(res.TypeShip);
        setVoucher(res.Voucher);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="order-container">
      <div className="wrap">
        <div className="wrap-address">
          <div className="border-top-address-order"></div>
          <div className="address">
            <div className="flex items-center gap-2 text-[#60b108] mb-3">
              <FaMapMarkerAlt className="icon" />
              <div className="text-xl font-medium">Địa chỉ giao hàng</div>
            </div>
            <div className="content flex justify-between">
              <div className="flex font-bold">
                <div className="name">{address.shipName}</div>
                <div className="phone ml-1">({address.shipPhone})</div>
              </div>
              <div className="address-detail">{address.shipAddress}</div>
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
            {listOrderDetail.map((item: any) => (
              <div key={item.id} className="pb-8 list-product mt-8 px-2">
                <div className="body-table">
                  <div className="product-item">
                    <div className="product-img">
                      <img
                        src={item.productSize.product.ProductImage[0].image_url}
                        alt=""
                      />
                    </div>
                    <div className="product-name">
                      {item.productSize.product.name +
                        " - " +
                        item.productSize.size}
                    </div>
                  </div>
                  <div className="product-price">
                    {commonUtils.formatPriceToVND(
                      item.productSize.product.discountPrice
                    )}
                  </div>
                  <div className="product-quantity text-center">
                    {item.quantity}
                  </div>
                  <div className="product-total text-[#60b108]">
                    {commonUtils.formatPriceToVND(
                      item.productSize.product.discountPrice * item.quantity
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="shipper px-2 flex justify-between py-4">
            <div>Đơn vị vận chuyển</div>
            <div>{typeShip.name}</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8 mt-8">
              <div>ShopEase Voucher</div>
              <div>
                <a className="font-semibold text cursor-pointer text-[#60b108]">
                  {voucher.codeVoucher}
                </a>
              </div>
            </div>
            <div className="flex justify-between mt-8 px-2 items-center">
              <div>Tổng thanh toán </div>
              {}
              <div className="font-semibold text-[#60b108] text-2xl ml-4">
                {commonUtils.formatPriceToVND(order.totalPrice)}
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
                <div className="content flex gap-8 ml-8">
                  <div>
                    {order.isPaymentOnline === 1
                      ? "Thanh toán Online"
                      : "Thanh toán khi nhận hàng"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
