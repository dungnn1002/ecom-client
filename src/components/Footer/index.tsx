import React from "react";
import "./index.scss";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
const Footer: React.FC = () => {
  return (
    <div className="footer d-center">
      <div className="flex footer-container justify-between border-b-2 pb-1">
        <div>
          <div className="mb-5 font-bold text-xs">CHĂM SÓC KHÁCH HÀNG</div>
          <ul>
            <li className="footer-title">Trung Tâm Trợ Giúp</li>
            <li>Blog</li>
            <li>Mall</li>
            <li>Hướng Dẫn Mua Hàng</li>
          </ul>
        </div>
        <div>
          <div className="mb-5 font-bold text-xs">VỀ SHOPEASE</div>
          <ul>
            <li className="footer-title">Tuyển Dụng</li>
            <li>Điều Khoản Sopease</li>
            <li>Chính Sách Bảo Mật</li>
            <li>Hướng Dẫn Mua Hàng</li>
          </ul>
        </div>
        <div>
          <div className="mb-5 font-bold text-xs">SẢN PHẨM HÀNG ĐẦU</div>
          <ul>
            <li className="footer-title">Quần áo</li>
            <li>Giày thể thao</li>
          </ul>
        </div>
        <div>
          <div className="mb-5 font-bold text-xs">THEO DÕI CHÚNG TÔI TRÊN</div>
          <ul className="soical">
            <div className="flex gap-2">
              <FaFacebook className="size-5" />
              <li className="footer-title">Facebook</li>
            </div>
            <div className="flex gap-2">
              <AiFillInstagram className="size-5" />
              <li className="footer-title">Instagram</li>
            </div>
            <div className="flex gap-2">
              <FaFacebook className="size-5" />
              <li className="footer-title">LinkedIn</li>
            </div>
          </ul>
        </div>
      </div>
      <div className="flex justify-center  pt-4 signature">
        <span>Bản quyền © Nguyễn Ngọc Dũng - HUST</span>
      </div>
    </div>
  );
};

export default Footer;
