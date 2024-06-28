import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Modal,
  message,
  Form,
  Select,
  Upload,
  Image,
} from "antd";
import type { TableProps, GetProp, UploadFile, UploadProps } from "antd";
import { CiViewList } from "react-icons/ci";
import { Input } from "antd";
import { ListType, defaultQueryParam } from "../../../../../constants/type";
import {
  getAllProduct,
  editProduct,
  deleteProduct,
  getAllProductByFilter,
} from "../../../../../services/product";
import { AdminButton } from "../../../../../components";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { fetchAndProcessBrands } from "../../../../../constants/brand";
import { fetchAndProcessCategory } from "../../../../../constants/category";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
const { Search } = Input;
export interface ProductType {
  id: number;
  stt: number;
  productName: string;
  categoryName: string;
  categoryId: number;
  brandName: string;
  brandId: number;
  material: string;
  view: number;
  status: string;
  originalPrice: number;
  discountPrice: number;
  contentHTML?: string;
  contentMarkdown?: string;
}
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ListCategory: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [brands, setBrands] = useState<ListType[]>([]);
  const [category, setCategory] = useState<ListType[]>([]);
  useEffect(() => {
    const fetchBrands = async () => {
      const processedBrands = await fetchAndProcessBrands();
      processedBrands.unshift({ label: "Tất cả", value: 0 });
      setBrands(processedBrands);
    };
    const fetchCategory = async () => {
      const processedCategory = await fetchAndProcessCategory();
      processedCategory.unshift({ label: "Tất cả", value: 0 });
      setCategory(processedCategory);
    };
    fetchBrands();
    fetchCategory();
  }, []);
  const columns: TableProps<ProductType>["columns"] = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Nhãn hàng",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Chất liệu",
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "ACTIVE" ? "green" : "red";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className=" text-yellow-400"
            onClick={() => {
              handleEditProduct(record.id);
            }}
          >
            Edit
          </a>
          <a className=" text-red-400" onClick={() => handleDelete(record.id)}>
            Delete
          </a>
        </Space>
      ),
    },
  ];
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const beforeUpload = (file: RcFile) => {
    return false;
  };
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleEditProduct = async (id: number) => {
    setOpen(true);
    const product = dataProduct.find((product) => product.id === id);
    if (product) {
      form.setFieldsValue({
        name: product.productName,
        material: product.material,
        categoryId: product.categoryId,
        brandId: product.brandId,
        originalPrice: product.originalPrice,
        discountPrice: product.discountPrice,
      });
      setContentMarkdown(product.contentMarkdown!);
    }
    setProductId(id);
  };
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteProduct(id);
      fetchAllProduct();
      messageApi.success(res.message);
    } catch (error: any) {
      messageApi.error(error.response.data.message);
    }
  };
  const mdParser = new MarkdownIt();
  const [contentHTML, setContentHTML] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [dataProduct, setDataProduct] = useState<ProductType[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [valueOrder, setValueOrder] = useState<string>("asc");
  const [valueSearch, setValueSearch] = useState<string>("");
  const [valueBrand, setValueBrand] = useState<number>(0);
  const [valueCategory, setValueCategory] = useState<number>(0);
  useEffect(() => {
    fetchAllProduct();
  }, []);
  const fetchAllProduct = async () => {
    const res = await getAllProductByFilter({
      page: 1,
      limit: 2000,
      brandId: valueBrand,
      categoryId: valueCategory,
      name: valueSearch,
      sort: "name",
      order: valueOrder as "asc" | "desc",
    });
    const data: ProductType[] = res.data.map((product: any, index: number) => ({
      stt: index + 1,
      productName: product.name,
      categoryName: product.category.name,
      categoryId: product.category.id,
      brandName: product.brand.name,
      brandId: product.brand.id,
      material: product.material,
      view: product.view,
      status: product.status,
      id: product.id,
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      contentHTML: product.contentHTML,
      contentMarkdown: product.contentMarkdown,
    }));
    setDataProduct(data);
  };
  const data: ProductType[] = dataProduct.map((product, index) => ({
    ...product,
    stt: index + 1,
  }));
  const handleOk = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj as Blob);
    });
    formData.append("name", form.getFieldValue("name"));
    formData.append("material", form.getFieldValue("material"));
    formData.append("categoryId", form.getFieldValue("categoryId"));
    formData.append("brandId", form.getFieldValue("brandId"));
    formData.append("originalPrice", form.getFieldValue("originalPrice"));
    formData.append("discountPrice", form.getFieldValue("discountPrice"));
    formData.append("contentHTML", contentHTML);
    formData.append("contentMarkdown", contentMarkdown);
    const res = await editProduct(productId!, formData);
    fetchAllProduct();
    setOpen(false);
    messageApi.success(res.message);
  };
  const handleCancel = () => {
    // form.resetFields();
    setOpen(false);
  };
  const handleChangeBrand = (value: string) => {
    setValueBrand(parseInt(value));
  };
  const handleChangeCategory = (value: string) => {
    setValueCategory(parseInt(value));
  };
  const handleSearch = () => {
    fetchAllProduct();
  };
  return (
    <div>
      {contextHolder}
      <div className="text-4xl font-semibold mt-4 ">Quản lý sản phẩm</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <CiViewList />
          <span>Danh sách sản phẩm</span>
        </div>
        <div className="px-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center py-2">
              <Select
                className="w-1/4"
                showSearch
                placeholder="Chọn nhãn hàng"
                optionFilterProp="children"
                options={brands}
                onChange={handleChangeBrand}
              />
              <Select
                className="w-1/4"
                showSearch
                placeholder="Chọn loại sản phẩm"
                optionFilterProp="children"
                options={category}
                onChange={handleChangeCategory}
              />
              <Search
                placeholder="Tìm kiếm theo tên sản phẩm"
                style={{ width: 320 }}
                onClick={() => handleSearch()}
                onChange={(e) => setValueSearch(e.target.value)}
                onSearch={handleSearch}
              />
            </div>
            <button className="p-2 bg-green-700 rounded-md text-white">
              Xuất excel
            </button>
          </div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <Modal
        title="Cập nhật thông tin người dùng"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1200}
        footer={[
          <div className="flex gap-2 items-center justify-end">
            <div>
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                key="back"
                onClick={handleCancel}
              >
                Hủy
              </button>
            </div>
            ,
            <div>
              <AdminButton key="submit" onClick={handleOk}>
                Cập nhật
              </AdminButton>
            </div>
            ,
          </div>,
        ]}
      >
        <Form form={form}>
          <div className="flex gap-10">
            <div className="w-1/2">
              <label className="label" htmlFor="name">
                Tên sản phẩm
              </label>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
                hasFeedback
              >
                <Input
                  id="name"
                  size="large"
                  className="mb-[8px]"
                  placeholder="Tên sản phẩm"
                />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <label className="label" htmlFor="material">
                Chất liệu
              </label>
              <Form.Item
                name="material"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
                hasFeedback
              >
                <Input
                  className="mb-[8px]"
                  id="material"
                  size="large"
                  placeholder="Chất liệu sản phẩm"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="w-1/2">
              <label className="label" htmlFor="categoryId">
                Danh mục sản phẩm
              </label>
              <Form.Item
                name="categoryId"
                rules={[
                  { required: true, message: "Vui lòng chọn loại sản phẩm " },
                ]}
                hasFeedback
              >
                <Select
                  className="w-full"
                  showSearch
                  placeholder="Chọn loại sản phẩm"
                  optionFilterProp="children"
                  size="large"
                  options={category}
                />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <label className="label" htmlFor="brandId">
                Nhãn hàng
              </label>
              <Form.Item
                name="brandId"
                rules={[
                  { required: true, message: "Vui lòng chọn nhãn hàng " },
                ]}
                hasFeedback
              >
                <Select
                  className="w-full"
                  showSearch
                  placeholder="Chọn loại sản phẩm"
                  optionFilterProp="children"
                  size="large"
                  options={brands}
                />
              </Form.Item>
            </div>
          </div>
          <div className="w-full mb-4">
            <label className="label" htmlFor="content">
              Nội dung
            </label>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              value={contentMarkdown}
              onChange={({ text, html }) => {
                setContentHTML(html);
                setContentMarkdown(text);
              }}
            />
          </div>
          <div className="flex gap-10">
            <div className="w-1/2">
              <label className="label" htmlFor="name">
                Giá gốc
              </label>
              <Form.Item
                name="originalPrice"
                rules={[{ required: true, message: "Vui lòng nhập giá gốc" }]}
                hasFeedback
              >
                <Input
                  id="name"
                  size="large"
                  className="mb-[8px]"
                  placeholder="Giá gốc"
                />
              </Form.Item>
            </div>
            <div className="w-1/2">
              <label className="label" htmlFor="material">
                Giá khuyến mãi
              </label>
              <Form.Item
                name="discountPrice"
                rules={[
                  { required: true, message: "Vui lòng nhập giá khuyến mãi" },
                ]}
                hasFeedback
              >
                <Input
                  className="mb-[8px]"
                  id="material"
                  size="large"
                  placeholder="Giá khuyến mãi"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex gap-20 items-start">
            <div className="flex gap-20">
              <label className="label">Ảnh sản phẩm</label>
              <div>
                <Upload
                  beforeUpload={beforeUpload}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ListCategory;
