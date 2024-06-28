import { getAllBrand } from "../services/brand";
import { defaultQueryParam } from "./type";

export const fetchAndProcessBrands = async () => {
  try {
    const res = await getAllBrand({ ...defaultQueryParam });
    const brands = res.data;

    return brands.map((brand) => ({
      value: brand.id,
      label: brand.name,
    }));
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};
