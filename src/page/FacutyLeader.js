import PopTooltip from "../components/PopTooltip";

const FacutlyLeader = () => {
  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <button className="btn btn-info button-if">
          <i
            class="fa-sharp fa-solid fa-chart-simple"
            style={{ margin: "0 5px" }}
          ></i>
          Thống Kê
        </button>
        <h2>Danh Sách Giảng Viên Đã Được Phân Công</h2>
        <span className="attention-here">
          (Danh sách sinh viên thuộc các Khoa)
        </span>
      </div>
      <div className="list-action">
        <div className="form-selector">
          <label className="lb" htmlFor="">
            Tên Khoa
          </label>
          <select>
            <option value="1">1</option>
          </select>
        </div>
        <div className="form-selector">
          <label className="lb" htmlFor="">
            Tên Khoa
          </label>
          <select>
            <option value="1">1</option>
          </select>
        </div>
      </div>
      <table class="table w-80p">
        <thead class="thead-dark">
          <tr>
            <th scope="col">
              <input type="checkbox" />
            </th>
            <th scope="col">Số Thứ Tự</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên Sinh Viên</th>
            <th scope="col">Lớp</th>
            <th scope="col">Ngày Sinh</th>
            <th scope="col">Địa Chỉ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>1</td>
            <td>
              <img
                src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"
                className="avatar"
                alt=""
              />
            </td>
            <td className="text-decoration">Khanh</td>
            <td>Khanh</td>
            <td>12/2/2</td>
            <td>
              <PopTooltip description="ss">
                <span>a</span>
              </PopTooltip>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FacutlyLeader;
