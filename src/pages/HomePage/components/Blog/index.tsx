import React from "react";
import "./index.scss";
import { HeaderContent, ItemBlog } from "../../../../components";

const Blog: React.FC = () => {
  return (
    <section>
      <div>
        <HeaderContent
          mainContent="Tin tức"
          infoContent="Các tin tức mới nhất về thời trang"
        />

        <div className="mt-10 mb-10 flex justify-between">
          <ItemBlog></ItemBlog>
          <ItemBlog></ItemBlog>
          <ItemBlog></ItemBlog>
        </div>
      </div>
    </section>
  );
};

export default Blog;
