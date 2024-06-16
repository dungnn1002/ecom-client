import React, { useEffect } from "react";
import ".././index.scss";
import { Form, Input } from "antd";
import { LoginButton, HeaderLogin, Footer } from "../../../components";
import { BiLockAlt } from "react-icons/bi";
import { FaFacebook, FaRegUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoLogin } from "../components";
import { getMe, login } from "../../../redux/actions/auth.action";
import { useAppDispatch } from "../../../redux/store";
import { COMMON } from "../../../constants";
export interface LoginState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formLogin] = Form.useForm();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "string" } };
  const handleLogin = async (data: LoginState) => {
    try {
      await dispatch(login(data)).then((res) => {
        if (res.type.endsWith("fulfilled")) {
          if (res.payload.roleId === "USER") {
            navigate("/home");
          } else {
            navigate("/admin");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem(COMMON.ACCESS_TOKEN))
      dispatch(getMe()).then((res) => {
        if (res.type.includes("fulfilled")) {
          navigate(from);
        }
      });
  }, []);
  return (
    <>
      <HeaderLogin></HeaderLogin>
      <div className="login-container">
        <LogoLogin></LogoLogin>
        <div className="content-right">
          <Form form={formLogin} onFinish={handleLogin}>
            <h3 className="text-2xl text-center mb-8">Đăng nhập</h3>
            <label className="label" htmlFor="email">
              Địa chỉ email
            </label>
            <Form.Item<LoginState>
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email!" },
              ]}
              hasFeedback
            >
              <Input
                id="email"
                size="large"
                className="mb-[8px]"
                placeholder="Địa chỉ email"
                prefix={<FaRegUser />}
              />
            </Form.Item>
            <label className="label" htmlFor="password">
              Mật khẩu
            </label>
            <Form.Item<LoginState>
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
            <LoginButton type="submit">đăng nhập</LoginButton>
            <div className="split-line flex justify-center items-center mt-[24px]">
              <div className="sub-split-line"></div>
              <div className="or uppercase mx-3">hoặc</div>
              <div className="sub-split-line"></div>
            </div>
            <div className="soical flex justify-between gap-2 mt-[28px]">
              <div className="btn-facebook flex justify-center items-center gap-2">
                <div className="btn-icon-facebook">
                  <FaFacebook className="size-6" />
                </div>
                <div className="btn-text text-base">Facebook</div>
              </div>
              <div className="btn-facebook flex justify-center items-center gap-2">
                <div className="btn-icon">
                  <FcGoogle className="size-6" />
                </div>
                <div className="btn-text text-base">Facebook</div>
              </div>
            </div>
            <span className="text-footer">
              Bạn mới biết đến ShopEase?{" "}
              <a onClick={() => navigate("/register")}>Đăng ký</a>
            </span>
          </Form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default Login;
