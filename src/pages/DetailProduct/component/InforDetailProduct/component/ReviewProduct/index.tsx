import React, { useState } from "react";
import "./index.scss";
import { FaStar } from "react-icons/fa";
import { Input, Upload, Image, GetProp, UploadProps, Avatar, List } from "antd";
import { FaCamera } from "react-icons/fa6";
import { RcFile, UploadFile } from "antd/es/upload";
import { ButtonShop } from "../../../../../../components";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const { TextArea } = Input;

const ReviewProduct: React.FC = () => {
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
    console.log(number);
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
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  return (
    <div className="container ml-8 mr-8">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#f6f6f6] rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <h5 className="text-gray-600 text-2xl font-medium mb-2">
              Sao trung bình
            </h5>
            <h4 className="text-4xl font-bold text-yellow-500 mb-1">3.7</h4>
            <h6 className="text-gray-500 text-sm">(3 lượt đánh giá)</h6>
          </div>
          <div className="rating_list">
            <h3 className="text-lg font-semibold mb-2 text-gray-600">
              10 lượt đánh giá
            </h3>
            <ul className="list space-y-2">
              <li className="flex items-center text-lg font-normal text-gray-700 gap-1">
                <span className="text-gray-800">5</span>
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">có lượt đánh giá</div>
              </li>

              <li className="flex items-center text-lg font-medium text-gray-700 gap-1">
                <span className="text-gray-800">4</span>
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">có lượt đánh giá</div>
              </li>

              <li className="flex items-center text-lg font-medium text-gray-700 gap-1">
                <span className="text-gray-800">3</span>
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">có lượt đánh giá</div>
              </li>

              <li className="flex items-center text-lg font-medium text-gray-700 gap-1">
                <span className="text-gray-800">2</span>
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">có lượt đánh giá</div>
              </li>

              <li className="flex items-center text-lg font-medium text-gray-700 gap-1">
                <span className="text-gray-800">1</span>
                <FaStar className="text-yellow-400" />
                <div className="ml-2 text-gray-600">có lượt đánh giá</div>
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
                  <ButtonShop>Đánh giá</ButtonShop>
                </div>
              </div>
            </div>
            <div>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                        />
                      }
                      title={
                        <div className="flex flex-col">
                          <a href="https://ant.design">{item.title}</a>
                          <div className="flex">
                            {[...Array(5)].map((_, index) => (
                              <FaStar
                                key={index}
                                className="text-yellow-400 text-lg"
                              />
                            ))}
                          </div>
                        </div>
                      }
                      description={
                        <div>
                          <p>
                            Ant Design, a design language for background
                            applications, is refined by Ant UED Team
                          </p>
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
