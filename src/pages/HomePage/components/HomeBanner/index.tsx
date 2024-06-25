import "./index.scss";
import { NavLink } from "react-router-dom";
interface HomeBannerProps {
  image: string;
}
const HomeBanner: React.FC<HomeBannerProps> = (props) => {
  return (
    <section className="home_banner_area mb-10">
      {/* class home_banner_area trong file style.css chứa background banner  */}
      <div
        className="box-banner"
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundPosition: "center",
        }}
      >
        <div className="banner_inner flex items-center">
          <div className="container">
            <div className="banner_content">
              <div className="col-lg-12">
                {/* <p className="sub text-uppercase">{props.name}</p> */}
                <p className="uppercase text-white mb-2">t-shirt</p>
                <h3 className="text-5xl text-white mb-4 font-bold">
                  <span className="text-[#60b108]">Show</span> Your <br />
                  Personal <span className="text-[#60b108]">Style</span>
                </h3>
                <h4 className="text-white">Hãy đến với Shopease</h4>
                <div className="mt-10">
                  <NavLink className="text-white banner-button" to={"/shop"}>
                    Đến cửa hàng ngay
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeBanner;
