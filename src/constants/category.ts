import { getAllCategory } from "./../services/category";
import { defaultQueryParam } from "./type";

export const fetchAndProcessCategory = async () => {
  try {
    const res = await getAllCategory({ ...defaultQueryParam });
    const categorys = res.data;
    return categorys.map((category) => ({
      value: category.id,
      label: category.name,
    }));
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};
