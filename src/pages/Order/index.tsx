import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import "./index.scss";
import { AdminButton, ButtonShop, Voucher } from "../../components";
import {
  getShopCart,
  getShipAddress,
  addShipAddress,
  deleteShipAddress,
} from "../../services/user";
import { getAllTypeShip } from "../../services/typeship";
import { Cart } from "../ShopCart/index";
import commonUtils from "../../utils/commonUtils";
import { TypeShipAddressResponse } from "../../constants/type";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  message,
} from "antd";
import { TypeShip, TypeVoucher } from "../ShopCart/index";
import { getAllCodeVoucher } from "../../services/voucher";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
const Order: React.FC = () => {
  const { user } = useSelector(authSelector);
  const [priceTypeShip, setPriceTypeShip] = useState<number>(0); // Giá trị typeShip được chọn
  const [priceDiscount, setPriceDiscount] = useState<number>(0); // Giá trị giảm giá
  const [totalShopCart, setTotalShopCart] = useState<number>(0);
  const [listProduct, setListProduct] = useState<Cart[]>([]);
  const [listShipAddress, setListShipAddress] = useState<
    TypeShipAddressResponse[]
  >([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [listTypeShip, setListTypeShip] = useState<TypeShip[]>([]);
  const [listVoucher, setListVoucher] = useState<TypeVoucher[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<TypeVoucher | null>(
    null
  );

  const [selectedAddress, setSelectedAddress] = useState<number>(0); // Chỉ số địa chỉ đang được chọn
  const [temSelectedAddress, setTemSelectedAddress] = useState<number>(0); // Chỉ số địa chỉ đang được chọn
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false); // Trạng thái mở của modal địa chỉ
  const [openModalAddNewAddress, setOpenModalAddNewAddress] =
    useState<boolean>(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
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

    getShipAddress().then((res) => {
      setListShipAddress(res);
    });

    getAllTypeShip().then((res) => {
      const listTypeShip = res.data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
        };
      });
      setListTypeShip(listTypeShip);
      if (listTypeShip.length > 0) {
        setPriceTypeShip(
          parseFloat(
            localStorage.getItem("priceTypeShip") || listTypeShip[0].price
          )
        );
      }
    });
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
          usedAmount: item.usedAmount,
          typeVoucher: item.typeVoucher.typeVoucher,
        };
      });
      setListVoucher(listVoucher);
      if (listVoucher.length > 0) {
        setPriceDiscount(
          parseFloat(localStorage.getItem("priceDiscount") || "0")
        );
        setSelectedVoucher(
          JSON.parse(localStorage.getItem("selectedVoucher") || "{}")
        );
      }
    });
  }, []);
  useEffect(() => {
    const subtotal = listProduct.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    setTotalShopCart(subtotal + priceTypeShip - priceDiscount); // Cộng thêm giá trị vận chuyển
  }, [listProduct, priceTypeShip, priceDiscount]);
  const handlePaymentOnline = () => {
    setSelectedPayment("online");
  };
  const handlePaymentOffice = () => {
    setSelectedPayment("office");
  };
  const handlePaymentPaypal = () => {
    setSelectedPaymentOption("paypal");
  };
  const handlePaymentVnpay = () => {
    setSelectedPaymentOption("vnpay");
  };
  const onChangeTypeShip = (e: RadioChangeEvent) => {
    const newPrice = parseFloat(e.target.value);
    setPriceTypeShip(newPrice);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleClickApplyVoucher = (
    typeVoucher: string,
    maxValue: number,
    value: string,
    name: string
  ) => {
    const voucherValue = parseFloat(value.slice(0, -1));
    const currentTotalShopCart = totalShopCart + priceDiscount;
    let newPriceDiscount = 0;
    if (typeVoucher === "%") {
      newPriceDiscount = Math.min(
        (currentTotalShopCart * voucherValue) / 100,
        maxValue
      );
    }
    setSelectedVoucher({ name, value, maxValue, typeVoucher, usedAmount: 0 });
    setPriceDiscount(newPriceDiscount);
    setIsModalOpen(false);
  };

  const handleAddressChange = () => {
    setIsAddressModalOpen(true);
  };

  const handleAddressOk = () => {
    setSelectedAddress(temSelectedAddress);
    setIsAddressModalOpen(false);
  };

  const handleSelectAddress = (e: RadioChangeEvent) => {
    setTemSelectedAddress(parseInt(e.target.value));
  };
  const handleAddNewAddress = () => {
    setIsAddressModalOpen(false);
    setOpenModalAddNewAddress(true);
  };
  const handleAddNewAddressOk = () => {
    form.validateFields().then((values) => {
      const paramPostShipAddress = {
        userId: user!.id,
        shipName: form.getFieldValue("shipName"),
        shipPhone: form.getFieldValue("shipPhone"),
        shipEmail: form.getFieldValue("shipEmail"),
        shipAddress: form.getFieldValue("shipAddress"),
      };
      addShipAddress(paramPostShipAddress).then((res) => {
        setListShipAddress([...listShipAddress, res]);
      });
      setOpenModalAddNewAddress(false);
    });
  };
  const handleCancelAddNewAddress = () => {
    setOpenModalAddNewAddress(false);
  };
  const handleDeleteAddress = async (id: number) => {
    await deleteShipAddress(id).then(() => {
      setListShipAddress(listShipAddress.filter((item) => item.id !== id));
    });
    messageApi.success("Xóa địa chỉ thành công");
  };
  return (
    <>
      {contextHolder}
      <div className="order-container">
        <div className="wrap">
          <div className="wrap-address">
            <div className="border-top-address-order"></div>
            {listShipAddress.length > 0 && (
              <div className="address">
                <div className="flex items-center gap-2 text-[#60b108] mb-3">
                  <FaMapMarkerAlt className="icon" />
                  <div className="text-xl font-medium">Địa chỉ giao hàng</div>
                </div>
                <div className="content flex justify-between">
                  <div className="flex font-bold">
                    <div className="name">
                      {listShipAddress[selectedAddress].shipName}
                    </div>
                    <div className="phone ml-1">
                      ({listShipAddress[selectedAddress]?.shipPhone})
                    </div>
                  </div>
                  <div className="address-detail">
                    {listShipAddress[selectedAddress].shipAddress}
                  </div>
                  <div
                    className="edit text-[#60b108] cursor-pointer"
                    onClick={handleAddressChange}
                  >
                    Thay đổi
                  </div>
                </div>
              </div>
            )}
          </div>
          <Modal
            title="Chọn địa chỉ giao hàng"
            open={isAddressModalOpen}
            footer={[
              <div>
                <AdminButton key="submit" onClick={handleAddressOk}>
                  Cập nhật
                </AdminButton>
              </div>,
            ]}
          >
            <Space direction="vertical" className="w-full">
              {listShipAddress.map((address, index) => (
                <Radio
                  key={index}
                  value={index}
                  onChange={handleSelectAddress}
                  checked={temSelectedAddress === index}
                  className="block p-2 border rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-200 ease-in-out"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">
                        {address.shipName} ({address.shipPhone})
                      </span>
                      <span
                        className=" text-red-500"
                        onClick={() => handleDeleteAddress(address.id)}
                      >
                        Xóa
                      </span>
                    </div>
                    <span className="text-gray-500">{address.shipAddress}</span>
                  </div>
                </Radio>
              ))}
            </Space>
            <Button
              type="dashed"
              className="mt-4 w-full border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-200 ease-in-out"
              onClick={handleAddNewAddress}
            >
              Thêm địa chỉ mới
            </Button>
          </Modal>
          <Modal
            title="Thêm địa chỉ mới"
            open={openModalAddNewAddress}
            footer={[
              <div className="flex gap-2 items-center justify-end">
                <div>
                  <button
                    className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                    key="back"
                    onClick={handleCancelAddNewAddress}
                  >
                    Hủy
                  </button>
                </div>
                ,
                <div>
                  <AdminButton key="submit" onClick={handleAddNewAddressOk}>
                    Cập nhật
                  </AdminButton>
                </div>
                ,
              </div>,
            ]}
          >
            <Form form={form} layout="vertical">
              <div className="flex justify-between">
                <Form.Item
                  label="Họ và tên"
                  name="shipName"
                  rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="shipPhone"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <Form.Item
                label="Email"
                name="shipEmail"
                rules={[{ required: true, message: "Vui lòng nhập email" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="shipAddress"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
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
                      {commonUtils.formatPriceToVND(
                        product.price * product.quantity
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="shipper px-2 flex justify-between py-4">
              <div>Đơn vị vận chuyển</div>
              <Radio.Group onChange={onChangeTypeShip} value={priceTypeShip}>
                <Space direction="vertical">
                  {listTypeShip.map((typeShip) => (
                    <Radio value={typeShip.price}>{typeShip.name}</Radio>
                  ))}
                </Space>
              </Radio.Group>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8 mt-8">
                <div>ShopEase Voucher</div>
                <div>
                  <a
                    className="font-semibold text cursor-pointer text-[#60b108]"
                    type="link"
                    onClick={showModal}
                  >
                    Chọn hoặc nhập mã
                  </a>
                </div>
                <div>
                  <a className="font-semibold text cursor-pointer text-[#60b108]">
                    {selectedVoucher?.name}
                  </a>
                </div>
                <Modal
                  title="Chọn EaseVoucher"
                  open={isModalOpen}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="cancel" onClick={handleCancel}>
                      Hủy
                    </Button>,
                  ]}
                >
                  {listVoucher.map((voucher) => (
                    <div className="mb-4">
                      <Voucher
                        name={voucher.name}
                        typeVoucher={voucher.typeVoucher}
                        maxValue={voucher.maxValue}
                        usedAmount={voucher.usedAmount}
                        value={voucher.value}
                        handleClickApplyVoucher={handleClickApplyVoucher}
                      />
                    </div>
                  ))}
                </Modal>
              </div>
              <div className="flex justify-between mt-8 px-2 items-center">
                <div>Tổng thanh toán </div>
                <div>({listProduct.length} sản phẩm) :</div>
                <div className="font-semibold text-[#60b108] text-2xl ml-4">
                  {commonUtils.formatPriceToVND(totalShopCart)}
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
                        selectedPaymentOption === "paypal"
                          ? "selectedOption"
                          : ""
                      }`}
                    >
                      Thanh toán PAYPAL
                    </div>
                    <div
                      onClick={handlePaymentVnpay}
                      className={`payment-option ${
                        selectedPaymentOption === "vnpay"
                          ? "selectedOption"
                          : ""
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
                <span className="value">
                  {commonUtils.formatPriceToVND(
                    totalShopCart + priceDiscount - priceTypeShip
                  )}
                </span>
              </div>
              <div className="payment-detail">
                <span className="label">Tổng giảm giá:</span>
                <span className="value">
                  {commonUtils.formatPriceToVND(priceDiscount)}
                </span>
              </div>
              <div className="payment-detail">
                <span className="label">Phí vận chuyển:</span>
                <span className="value">
                  {" "}
                  {commonUtils.formatPriceToVND(priceTypeShip)}
                </span>
              </div>
              <div className="payment-detail">
                <span className="label">Tổng thanh toán:</span>
                <span className="value">
                  {commonUtils.formatPriceToVND(totalShopCart)}
                </span>
              </div>
              <div className="button-payment">
                <ButtonShop>Đặt hàng</ButtonShop>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
