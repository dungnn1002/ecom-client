import React from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
const ItemBlog: React.FC = () => {
  return (
    <div className="item-blog">
      <div className="single-blog">
        <div className="">
          <img
            style={{
              width: "350px",
              height: "243px",
              objectFit: "cover",
              cursor: "pointer",
            }}
            // src={props.data.image}
            src="https://cdn.shortpixel.ai/spai2/w_981+q_lossless+ret_img+to_webp/https://zofal.vn/wp-content/uploads/2024/04/Flower-1.png"
          />
        </div>
        <div className="short_details mt-4">
          <div className="flex items-center">
            <div className="mr-8">
              {/* {props.data.userData.firstName +
                " " +
                props.data.userData.lastName} */}
              Nguyễn Ngọc Dũng
            </div>
            <FaRegComment className="mr-1" />
            <a>{/* {props.data.commentData.length}  */}4 Bình luận</a>
          </div>
          {/* <NavLink to={`/blog-detail/${props.data.id}`}> */}
          <NavLink to="/blog-detail">
            {/* <h4>{props.data.title}</h4> */}
            <h4 className="font-bold blog-title">
              Váy đầm dành cho các cô nàng công sở
            </h4>
          </NavLink>
          <div className="flex gap-2 items-center mt-1 cursor-pointer extend-blog">
            <a className="uppercase font-semibold">Xem thêm</a>
            <GoArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemBlog;
