import React, { useEffect, useState } from "react";
import "./index.scss";
import {
  InputNumber,
  Radio,
  RadioChangeEvent,
  Space,
  Modal,
  Button,
} from "antd";
import { ButtonShop } from "../../components";
import { useNavigate } from "react-router-dom";
import { getShopCart } from "../../services/user";
import { getAllTypeShip } from "../../services/typeship";
import { BiSolidDiscount } from "react-icons/bi";
import commonUtils from "../../utils/commonUtils";
import { Voucher } from "../../components";
import { getAllCodeVoucher } from "../../services/voucher";
import { useAppDispatch } from "../../redux/store";
import {
  deleteProductShopCart,
  updateProductShopCart,
} from "../../redux/actions/shopCart.action";
export type Cart = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  productSizeId?: number;
  image: string;
};
export type TypeShip = {
  id: number;
  name: string;
  price: number;
};
export type TypeVoucher = {
  id: number;
  name: string;
  typeVoucher: string;
  maxValue: number;
  amount: number;
  value: string;
};
const ShopCart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [listProduct, setListProduct] = useState<Cart[]>([]);
  const [listTypeShip, setListTypeShip] = useState<TypeShip[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [listVoucher, setListVoucher] = useState<TypeVoucher[]>([]);
  const [totalShopCart, setTotalShopCart] = useState<number>(0);
  const [priceTypeShip, setPriceTypeShip] = useState<number>(0); // Giá trị typeShip được chọn
  const [priceDiscount, setPriceDiscount] = useState<number>(0); // Giá trị giảm giá
  const [selectedVoucher, setSelectedVoucher] = useState<TypeVoucher | null>(
    null
  );
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

    getAllTypeShip().then((res) => {
      const listTypeShip = res.data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          price: item.price,
        };
      });
      setListTypeShip(listTypeShip);
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
          amount: item.amount,
          typeVoucher: item.typeVoucher.typeVoucher,
        };
      });
      setListVoucher(listVoucher);
    });
  }, []);

  useEffect(() => {
    const subtotal = listProduct.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    setTotalShopCart(subtotal + priceTypeShip - priceDiscount);
  }, [listProduct, priceTypeShip, priceDiscount]);

  const navigate = useNavigate();
  const onChangeTypeShip = (e: RadioChangeEvent) => {
    const newPrice = parseFloat(e.target.value);
    setPriceTypeShip(newPrice);
  };
  const onChangeQuantityShopCart = (value: number, productId: number) => {
    dispatch(updateProductShopCart({ id: productId, quantity: value }));
    setListProduct((prevListProduct) =>
      prevListProduct.map((product) =>
        product.id === productId ? { ...product, quantity: value } : product
      )
    );
  };

  const handleDeleteCart = (productId: number) => async () => {
    try {
      dispatch(deleteProductShopCart(productId));
      setListProduct((prevListProduct) =>
        prevListProduct.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateOrder = () => {
    // pass data to order page
    localStorage.setItem("priceTypeShip", priceTypeShip.toString());
    localStorage.setItem("priceDiscount", priceDiscount.toString());
    localStorage.setItem("selectedVoucher", JSON.stringify(selectedVoucher));
    navigate("/order");
  };

  const handleClickApplyVoucher = (
    typeVoucher: string,
    maxValue: number,
    value: string,
    name: string,
    id: number
  ) => {
    const voucherValue = parseFloat(value.slice(0, -1));
    const currentTotalShopCart = totalShopCart + priceDiscount;
    let newPriceDiscount = 0;
    if (typeVoucher === "%") {
      newPriceDiscount = Math.min(
        (currentTotalShopCart * voucherValue) / 100,
        maxValue
      );
    } else {
      newPriceDiscount = voucherValue;
    }
    setSelectedVoucher({ id, name, value, maxValue, typeVoucher, amount: 1 });
    setPriceDiscount(newPriceDiscount);
    setIsModalOpen(false);
  };

  return (
    <div className="shop-cart">
      <div className="header-table pb-2 text-[#797979]">
        <div className="header-product-item">Sản phẩm</div>
        <div className="header-product-price">Giá</div>
        <div className="header-product-quantity">Số lượng</div>
        <div className="header-product-total">Tổng tiền</div>
        <div className="header-product-action">Thao tác</div>
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
              <div className="product-price">
                {commonUtils.formatPriceToVND(product.price)}
              </div>
              <div className="product-quantity">
                <InputNumber
                  min={1}
                  value={product.quantity}
                  onChange={(value) =>
                    onChangeQuantityShopCart(value as number, product.id)
                  }
                />
              </div>
              <div className="product-total text-[#60b108]">
                {commonUtils.formatPriceToVND(product.price * product.quantity)}
              </div>
              <div className="product-action">
                <button onClick={handleDeleteCart(product.id)}>Xóa</button>
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
          <div className="flex items-center gap-2">
            <BiSolidDiscount />
            <div>ShopEase Voucher</div>
          </div>
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
              <div key={voucher.id} className="mb-4">
                <Voucher
                  id={voucher.id}
                  name={voucher.name}
                  typeVoucher={voucher.typeVoucher}
                  maxValue={voucher.maxValue}
                  amount={voucher.amount}
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
          <div className="ml-4">
            <ButtonShop onClick={handleNavigateOrder}>Thanh toán</ButtonShop>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShopCart;
