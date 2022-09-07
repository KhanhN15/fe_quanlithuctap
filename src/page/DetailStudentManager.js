import { Button, Modal } from "antd";

const DetailStudentManager = () => {
  return (
    <>
      <div className="main__enterprise">
        <div className="title__enterprise">
          <h2>Thông Tin Sinh Viên</h2>
        </div>
      </div>
      <div className="main_detail_st">
        <div className="main_detail_left">
          <img
            src="https://www.dungplus.com/wp-content/uploads/2019/12/girl-xinh-1-480x600.jpg"
            className="img_main_detail_st"
            alt=""
          />
          <h4 className="name-chinh">Khanh</h4>
          <ul>
            <li>Lớp : 20SE3 </li>
            <li>Địa Chỉ: </li>
            <li>Công Ty Đang Thực Tập : </li>
            <li className="text-italy attention-here">
              Sinh Viên Thuộc Quyền Quản Lí Của Bạn
            </li>
          </ul>
        </div>
        <div className="main_detail_right">
          <table class="table w-80p">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Số Thứ Tự</th>
                <th scope="col">Tên Sinh Viên</th>
                <th scope="col">Lớp</th>
                <th scope="col">Khoa</th>
                <th scope="col text-center">Trạng Thái</th>
                <th scope="col">Tiến Độ Báo Cáo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Khanh</td>
                <td>Khanh</td>
                <td>Khanh</td>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <button className="btn btn-warning">
                    <i
                      class="fa-sharp fa-solid fa-circle-info"
                      style={{ margin: "0 10px" }}
                    ></i>
                    Xem Báo Cáo
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="main_detail_left mg-b-20">
          <div className="form-input">
            <label htmlFor="">Tên Dealine</label>
            <input type="text" />
          </div>
          <div className="form-input">
            <label htmlFor="">Hạn nộp</label>
            <input type="date" />
          </div>
          <button className="btn btn-success">Submit</button>
        </div>
        <div className="main_detail_right">
          <div className="title__enterprise">
            <h2>Nguyen Quoc Khanh -se3</h2>
            <span className="color-green">Hạn nộp : </span>
            <span className="color-red">Thời Gian Nộp</span>
          </div>
          <div className="cmt">
            <div className="link-file">
              <a href="">Đường Dẫn File</a>
            </div>
            <table class="table w-80p">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Điểm</th>
                  <th scope="col">Đạt Yêu Cầu</th>
                  <th scope="col">Nhận Xét</th>
                  <th scope="col">Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <textarea></textarea>
                  </td>
                  <td>
                    <button className="btn btn-success">Submit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailStudentManager;
