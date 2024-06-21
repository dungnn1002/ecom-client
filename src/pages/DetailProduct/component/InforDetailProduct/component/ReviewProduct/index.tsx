import React, { useEffect, useState } from "react";
import "./index.scss";
import { FaStar } from "react-icons/fa";
import {
  Input,
  Upload,
  Image,
  GetProp,
  UploadProps,
  Avatar,
  List,
  message,
} from "antd";
import { FaCamera } from "react-icons/fa6";
import { RcFile, UploadFile } from "antd/es/upload";
import { ButtonShop } from "../../../../../../components";
import {
  getAllCommentByProduct,
  addComment,
} from "../../../../../../services/product";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const { TextArea } = Input;

type Props = {
  productId: number;
  userId: number;
};
const ReviewProduct: React.FC<Props> = (props: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [listComment, setListComment] = useState<any>([]);
  const [content, setContent] = useState<string>("");
  const [star, setStar] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCommentByProduct(props.productId);
        setListComment(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleAddComment = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj as Blob);
    });
    formData.append("content", content);
    formData.append("star", star.toString());
    formData.append("userId", props.userId.toString());
    formData.append("productId", props.productId.toString());
    addComment(formData)
      .then(async () => {
        const data = await getAllCommentByProduct(props.productId);
        setListComment(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setContent("");
    setStar(0);
    setFileList([]);
    messageApi.open({
      type: "success",
      content: "Đánh giá thành công!",
    });
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const beforeUpload = (file: RcFile) => {
    return false;
  };
  // State to keep track of the selected number of stars
  const [selectedStars, setSelectedStars] = useState<number>(0);

  // Function to handle star selection
  const handleChooseStart = (number: number) => {
    setSelectedStars(number); // Update the state with the selected number of stars
    setStar(number);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadButton = (
    <button style={{ border: 0, background: "none", width: "10px" }}>
      <FaCamera />
    </button>
  );
  return (
    <div className="container ml-8 mr-8">
      {contextHolder}
      <div className="wrap">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#f6f6f6] rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <h5 className="text-gray-600 text-2xl font-medium mb-2">
              Sao trung bình
            </h5>
            <h4 className="text-4xl font-bold text-yellow-500 mb-1">
              {listComment.length > 0
                ? (
                    listComment.reduce(
                      (acc: number, item: any) => acc + item.star,
                      0
                    ) / listComment.length
                  ).toFixed(1)
                : 0}
            </h4>
            <h6 className="text-gray-500 text-sm">
              ({listComment.length} lượt đánh giá)
            </h6>
          </div>
          <div className="rating_list">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">
              {listComment.length} lượt đánh giá
            </h3>
            <ul className="list space-y-2">
              <li className="flex items-center text-lg font-normal text-gray-700 gap-1">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">
                  có
                  <span className="px-1">
                    {listComment.filter((item: any) => item.star === 5).length}
                  </span>
                  lượt đánh giá
                </div>
              </li>

              <li className="flex items-center text-lg font-medium text-gray-700 gap-1">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">
                  có
                  <span className="px-1">
                    {listComment.filter((item: any) => item.star === 4).length}
                  </span>
                  lượt đánh giá
                </div>
              </li>

              <li className="flex items-center text-lg font-medium text-gray-700 gap-1">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">
                  có
                  <span className="px-1">
                    {listComment.filter((item: any) => item.star === 3).length}
                  </span>
                  lượt đánh giá
                </div>
              </li>

              <li className="flex items-center text-lg font-medium text-gray-700 gap-1">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">
                  có
                  <span className="px-1">
                    {listComment.filter((item: any) => item.star === 2).length}
                  </span>
                  lượt đánh giá
                </div>
              </li>

              <li className="flex items-center text-lg font-medium text-gray-700 gap-1">
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">
                  có
                  <span className="px-1">
                    {listComment.filter((item: any) => item.star === 1).length}
                  </span>
                  lượt đánh giá
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="review-list mt-8">
          <div className="review_item">
            <div className="form-group">
              <label
                style={{ color: "#333", fontSize: "16px", fontWeight: "600" }}
              >
                Viết đánh giá của bạn
              </label>
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-2"
                placeholder="Đánh giá của bạn"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </div>
            <div className="choose-start mt-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  {[5, 4, 3, 2, 1].map((num) => (
                    <div
                      key={num}
                      onClick={() => handleChooseStart(num)}
                      className={`flex items-center gap-1 p-2 border-2 rounded-md shadow-md ${
                        selectedStars === num
                          ? "border-yellow-500"
                          : "border-gray-400"
                      } cursor-pointer hover:shadow-lg`}
                    >
                      {[...Array(num)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={` ${
                            selectedStars === num
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                  <div className="mt-2">
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
                <div className="">
                  <ButtonShop onClick={handleAddComment}>Đánh giá</ButtonShop>
                </div>
              </div>
            </div>
            <div>
              <List
                itemLayout="horizontal"
                dataSource={listComment}
                renderItem={(item: any, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.user.image} />}
                      title={
                        <div className="flex flex-col">
                          <span>
                            {item.user.firstName + " " + item.user.lastName}
                          </span>
                          <div className="flex">
                            {[...Array(item.star)].map((_, index) => (
                              <FaStar
                                key={index}
                                className="text-yellow-400 text-lg"
                              />
                            ))}
                          </div>
                        </div>
                      }
                      description={
                        <div className="flex-col">
                          <div className="text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                          <p>{item.content}</p>
                          <div className="flex gap-4">
                            {item.CommentImage.map(
                              (image: any, index: number) => (
                                <div
                                  className="w-[72px] h-[72px] overflow-hidden rounded-lg flex items-center justify-center bg-gray-100"
                                  key={index}
                                >
                                  <Image
                                    className="object-cover w-full h-full"
                                    src={image.image_url}
                                    alt={`Review image ${index}`}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewProduct;
