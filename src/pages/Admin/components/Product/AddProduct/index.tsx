import { RiProductHuntLine } from "react-icons/ri";
import { AdminButton } from "../../../../../components";
import { Button, Form, Input, Select, Space } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { RcFile } from "antd/es/upload";
import { fetchAndProcessBrands } from "../../../../../constants/brand";
import { fetchAndProcessCategory } from "../../../../../constants/category";
import { ListType } from "../../../../../constants/type";
import { Size } from "../../../../../constants/size";
import { addProduct } from "../../../../../services/product";
import { message } from "antd";
export interface ProductState {
  name: string;
  material: string;
  categoryId: string;
  brandId: string;
  contentHTML: string;
  contentMarkdown: string;
  originalPrice: number;
  discountPrice: number;
  sizes: SizeType[];
}
export type SizeType = {
  size: string;
  quantity: number;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AddProduct: React.FC = () => {
  const [form] = Form.useForm<ProductState>();
  const [brands, setBrands] = useState<ListType[]>([]);
  const [category, setCategory] = useState<ListType[]>([]);
  useEffect(() => {
    const fetchBrands = async () => {
      const processedBrands = await fetchAndProcessBrands();
      setBrands(processedBrands);
    };
    const fetchCategory = async () => {
      const processedCategory = await fetchAndProcessCategory();
      setCategory(processedCategory);
    };
    fetchBrands();
    fetchCategory();
  }, []);
  const mdParser = new MarkdownIt();

  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (value: ProductState) => {
    const formData = new FormData();
    value.contentHTML = contentHTML;
    value.contentMarkdown = contentMarkdown;
    value.sizes = value.sizes.map((size) => ({
      size: size.size,
      quantity: +size.quantity,
    }));
    formData.append("name", value.name);
    formData.append("material", value.material);
    formData.append("categoryId", value.categoryId);
    formData.append("brandId", value.brandId);
    formData.append("contentHTML", value.contentHTML);
    formData.append("contentMarkdown", value.contentMarkdown);
    formData.append("originalPrice", value.originalPrice.toString());
    formData.append("discountPrice", value.discountPrice.toString());
    value.sizes.forEach((size, index) => {
      formData.append(`sizes[${index}][size]`, size.size);
      formData.append(`sizes[${index}][quantity]`, size.quantity.toString());
    });
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj as Blob);
    });
    try {
      const res = await addProduct(formData);
      const message = res.data.message.message;
      messageApi.open({
        type: "success",
        content: message,
      });
    } catch (error: any) {
      message.error(error.response.data.message);
    }
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [contentHTML, setContentHTML] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");

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
    console.log(file);

    return false;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div>
      {contextHolder}
      <div className="text-4xl font-semibold mt-4 ">Quản lý sản phẩm</div>
      <div className="border-2 mt-4">
        <div className="border-b-2 flex items-center gap-2 pl-4 py-2 bg-slate-200">
          <RiProductHuntLine />
          <span>Thêm sản phẩm</span>
        </div>
        <div className="px-4 py-2">
          <Form form={form} onFinish={handleSubmit}>
            <div className="flex gap-10">
              <div className="w-1/4">
                <label className="label" htmlFor="name">
                  Tên sản phẩm
                </label>
                <Form.Item<ProductState>
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
              <div className="w-1/4">
                <label className="label" htmlFor="material">
                  Chất liệu
                </label>
                <Form.Item<ProductState>
                  name="material"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
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
              <div className="w-1/4">
                <label className="label" htmlFor="categoryId">
                  Danh mục sản phẩm
                </label>
                <Form.Item<ProductState>
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
              <div className="w-1/4">
                <label className="label" htmlFor="brandId">
                  Nhãn hàng
                </label>
                <Form.Item<ProductState>
                  name="brandId"
                  rules={[
                    { required: true, message: "Vui lòng chọn nhãn hàng " },
                  ]}
                  hasFeedback
                >
                  <Select
                    className="w-full"
                    showSearch
                    placeholder="Chọn nhãn hàng"
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
                <Form.Item<ProductState>
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
                <Form.Item<ProductState>
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
              <div className="w-1/3">
                <label className="label" htmlFor="size">
                  Kích thước
                </label>
                <Form.List name="sizes">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ marginRight: 8, display: "flex" }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "size"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing first name",
                              },
                            ]}
                          >
                            <Select
                              className="w-full"
                              showSearch
                              placeholder="Chọn size"
                              optionFilterProp="children"
                              size="large"
                              options={Size}
                            />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "quantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập số lượng",
                              },
                            ]}
                          >
                            <Input
                              className="mb-[8px]"
                              size="large"
                              placeholder="Số lượng"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>
            </div>

            <div className="my-3">
              <AdminButton type="submit">Lưu thông tin</AdminButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
