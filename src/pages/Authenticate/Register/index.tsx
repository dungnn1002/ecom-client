import React, { useState } from "react";
import ".././index.scss";
import "./index.scss";
import { Form, Input } from "antd";
import { LoginButton, HeaderLogin, Footer } from "../../../components";
import { BiLockAlt, BiPhone, BiHighlight } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LogoLogin } from "../components";
import { RegisterUser } from "../../../services/auth";
export interface RegisterState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formRegister] = Form.useForm();
  const handleRegister = (values: RegisterState) => {
    RegisterUser(values).then((res) => {
      if (res.status === 201) {
        navigate("/login");
      }
    });
  };
  return (
    <>
      <HeaderLogin></HeaderLogin>
      <div className="login-container">
        <LogoLogin></LogoLogin>
        <div className="content-right">
          <Form
            form={formRegister}
            onFinish={handleRegister}
            // className="hidden"
          >
            <h3 className="text-2xl text-center mb-1">Đăng ký</h3>
            <div className="infor flex gap-4">
              <div>
                <label className="label" htmlFor="firstName">
                  Họ và tên đệm
                </label>
                <Form.Item<RegisterState>
                  name="firstName"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ của bạn!" },
                  ]}
                  hasFeedback
                >
                  <Input
                    id="firstName"
                    size="large"
                    className="mb-[8px]"
                    placeholder="Họ và tên đệm"
                    prefix={<BiHighlight />}
                  />
                </Form.Item>
              </div>
              <div>
                <label className="label" htmlFor="lastName">
                  Tên
                </label>
                <Form.Item<RegisterState>
                  name="lastName"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên của bạn!" },
                  ]}
                  hasFeedback
                >
                  <Input
                    id="lastName"
                    size="large"
                    className="mb-[8px]"
                    placeholder="Tên"
                    prefix={<BiHighlight />}
                  />
                </Form.Item>
              </div>
            </div>

            <label className="label" htmlFor="email">
              Địa chỉ email
            </label>
            <Form.Item<RegisterState>
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
              hasFeedback
            >
              <Input
                id="email"
                size="large"
                className="mb-[8px]"
                placeholder="Email"
                prefix={<FaRegUser />}
              />
            </Form.Item>
            <label className="label" htmlFor="phone">
              Số điện thoại
            </label>
            <Form.Item<RegisterState>
              name="phoneNumber"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
              hasFeedback
            >
              <Input
                id="phoneNumber"
                size="large"
                className="mb-[8px]"
                placeholder="Số điện thoại"
                prefix={<BiPhone />}
              />
            </Form.Item>
            <label className="label" htmlFor="password">
              Mật khẩu
            </label>
            <Form.Item<RegisterState>
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
                { max: 32, message: "Mật khẩu không được quá 32 ký tự" },
              ]}
              hasFeedback
            >
              <Input.Password
                className="mb-[8px]"
                id="password"
                size="large"
                placeholder="Mật khẩu"
                prefix={<BiLockAlt />}
              />
            </Form.Item>
            <label className="label" htmlFor="confirmPassword">
              Xác nhận mật khẩu
            </label>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu không trùng khớp!")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                id="confirmPassword"
                size="large"
                placeholder="Xác nhận mật khẩu"
                prefix={<BiLockAlt />}
              />
            </Form.Item>
            <LoginButton type="submit">đăng ký</LoginButton>
            <span className="text-footer">
              Bạn đã có tài khoản?{" "}
              <a onClick={() => navigate("/login")}>Đăng nhập</a>
            </span>
          </Form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default Register;
