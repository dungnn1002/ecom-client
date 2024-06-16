import { TbPigMoney } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";
import { SlEarphones } from "react-icons/sl";
import { MdOutlinePrivacyTip } from "react-icons/md";
const HomeFeature: React.FC = () => {
  return (
    <div className="flex justify-between">
      <div className="p-10 border">
        <div className="flex justify-center mb-4">
          <TbPigMoney className="size-10" />
        </div>
        <div className="mb-2 uppercase font-medium">Mua nhiều giảm nhiều</div>
        <div className="flex justify-center">Giảm giá lên tận 50%</div>
      </div>
      <div className="p-10 border">
        <div className="flex justify-center mb-4">
          <FiTruck className="size-10" />
        </div>
        <div className="mb-2 uppercase font-medium flex justify-center">
          Miễn phí vận chuyển
        </div>
        <div className="flex justify-center">Phạm vi trong khoảng 3km</div>
      </div>
      <div className="p-10 border">
        <div className="flex justify-center mb-4">
          <SlEarphones className="size-10" />
        </div>
        <div className="mb-2 uppercase font-medium flex justify-center">
          Sẵn sàng hỗ trợ
        </div>
        <div className="flex justify-center">Hãy liên hệ với chúng tôi</div>
      </div>
      <div className="p-10 border">
        <div className="flex justify-center mb-4">
          <MdOutlinePrivacyTip className="size-10" />
        </div>
        <div className="mb-2 uppercase font-medium flex justify-center">
          An toàn thanh toán
        </div>
        <div className="flex justify-center">Các cổng thanh toán an toàn</div>
      </div>
    </div>
  );
};

export default HomeFeature;
