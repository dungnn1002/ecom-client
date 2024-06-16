import { getAllTypeVoucher } from "./../services/voucher";
import { defaultQueryParam } from "./type";

export const fetchAndProcessTypeVouchers = async () => {
  try {
    const res = await getAllTypeVoucher({ ...defaultQueryParam });
    const typeVouchers = res.data;
    return typeVouchers.map((typeVoucher) => ({
      value: typeVoucher.id,
      label: typeVoucher.value + " " + typeVoucher.typeVoucher,
    }));
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};
