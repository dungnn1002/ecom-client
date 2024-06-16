const CommonUtils = {
  formatPriceToVND: (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  },
};

export default CommonUtils;
