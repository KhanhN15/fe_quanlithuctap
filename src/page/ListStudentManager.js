const ListStudentManager = () => {
  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>Danh Sách Sinh Viên Được Mình Quản Lí</h2>
        <span className="attention-here">
          *(Mỗi Giảng Viên Quản Lí Tối Đa 15 Sinh Viên)
        </span>
      </div>
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
                Cập Nhật Báo Cáo
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListStudentManager;
