import { IoIosBody, IoIosPaper, IoMdHome } from "react-icons/io";
import PopTooltip from "../components/PopTooltip";

const InfoEnterprise = () => {
  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>Thông tin đăng ký </h2>
      </div>
      <div className="main__info">
        <div className="info__user">
          <img
            className="img_enter"
            src="https://img.lovepik.com/photo/50057/1958.jpg_wh860.jpg"
            alt=""
          />
          <div className="info_name">
            <ul className="list_info">
              <li className="item_info">Họ và tên : </li>
              <li className="item_info">Lớp : </li>
              <li className="item_info">Khoa : </li>
              <li className="item_info">Địa chỉ : </li>
            </ul>
          </div>
        </div>
        <div className="info_center">
          <h1>VS</h1>
          <button disabled className="btn btn-warning no-select">
            Dang doi xac thuc
          </button>
        </div>
        <div className="info__enterprise">
          <img
            className="img_enter"
            src="https://img.lovepik.com/photo/50057/1958.jpg_wh860.jpg"
            alt=""
          />
          <div className="info_name">
            <ul className="list_info">
              <li className="item_info">Tên Doanh Nghiệp : </li>
            </ul>
          </div>
        </div>
      </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Đề Án</th>
            <th scope="col">GVHD</th>
            <th scope="col">Kết Quả</th>
            <th scope="col">Nhận Xét</th>
            <th scope="col"> Các mốc / Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Phiếu Đăng Ký Thực Tập</td>
            <td className="d-flex">
              <img
                className="img_teacher"
                src="https://img.lovepik.com/photo/50057/1958.jpg_wh860.jpg"
                alt=""
              />
              <div className="i">
                <div className="name_teacher">
                  <IoIosBody />
                  &nbsp; NguyenVanA
                </div>
                <div className="name_khoa">
                  <IoIosPaper />
                  &nbsp; Khoa Hoc May Tinh
                </div>
                <div className="name_khoa">
                  <IoMdHome />
                  &nbsp; Dia Chi
                </div>
              </div>
            </td>
            <td>
              <div className="show-alert">ok</div>
            </td>
            <td className="comment">
              <PopTooltip description={"ok chuwa nah"}>
                <span>quas ok</span>
              </PopTooltip>
            </td>
            <td>
              <ul>
                <li className="item-show-s">
                  - Đã được xác nhận :{" "}
                  <button className="btn btn-success no-select">
                    Thành Công
                  </button>{" "}
                </li>
                <li className="item-show-s">
                  - Ngày xác nhận :{" "}
                  <button className="btn btn-success no-select">20/4</button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      {/* review here */}
      <div className="title__enterprise">
        <h2>Tiến Độ Đồ Án</h2>
      </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Tiến độ tuần này</th>
            <th scope="col">Nộp Bài</th>
            <th scope="col">Điểm</th>
            <th scope="col">Nhận Xét</th>
            <th scope="col"> Các mốc / Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Phiếu Đăng Ký Thực Tập</td>
            <td className="w-350">
              <div className="attention-here">
                *(Vui lòng nộp bài tập bằng đường dẫn link drive. Mọi file khác
                đều không được chấp nhận)
              </div>
              <div className="form">
                <input type="text" />
                <button>Gửi</button>
              </div>
            </td>
            <td>
              <div className="show-alert">ok</div>
            </td>
            <td className="comment">
              <PopTooltip description={"ok chuwa nah"}>
                <span>quas ok</span>
              </PopTooltip>
            </td>
            <td>
              <ul>
                <li className="item-show-s">
                  - Đã được xác nhận :{" "}
                  <button className="btn btn-success no-select">
                    Thành Công
                  </button>{" "}
                </li>
                <li className="item-show-s">
                  - Ngày xác nhận :{" "}
                  <button className="btn btn-success no-select">20/4</button>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InfoEnterprise;
