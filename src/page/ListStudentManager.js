import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage, CONSTANT } from "../API/Config";
import { useHistory } from "react-router-dom";

const ListStudentManager = () => {
  const [listStudent, setListStudent] = useState([]);
  const [status, setStatus] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    const { _id } = getDataLocalStorage();
    try {
      const res = await axios.get(`${Config.API_URL}/search-by-teacher/${_id}`);
      if (res) {
        setListStudent(res.data.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log("error");
      console.log("====================================");
    }
  }, [status]);

  const changeStatus = async (id, sta) => {
    try {
      const res = await axios.put(`${Config.API_URL}/accept-teacher/${id}`, {
        isTeacherAccept: sta,
      });
      setStatus(!status);
      toast.success("Bạn đã thay đổi trạng thái thành công");
    } catch (error) {
      console.log("====================================");
      console.log("error");
      console.log("====================================");
    }
  };

  const redirectPost = (id) => {
    history.push(`/home/detail-student-manager/${id}`);
  };

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
            <th scope="col">MSV</th>
            <th scope="col">Lớp</th>
            <th scope="col">Ngày Sinh</th>
            <th scope="col">Địa Chỉ</th>
            <th scope="col text-center">Trạng Thái</th>
            <th scope="col">Tiến Độ Báo Cáo</th>
          </tr>
        </thead>
        <tbody>
          {listStudent?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.msv}</td>
              <td>{item.lop}</td>
              <td>{item.birthday}</td>
              <td>{item.address}</td>
              <td>
                {item.isTeacherAccept === Config.CONSTANT.DONE ? (
                  <>
                    <span>
                      <i class="fa-solid fa-check color-green"></i>
                    </span>
                    <span
                      className="cancel"
                      onClick={() => changeStatus(item._id, CONSTANT.CANCEL)}
                    >
                      Hủy
                    </span>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      onClick={() => changeStatus(item._id, CONSTANT.DONE)}
                    />
                  </>
                )}
              </td>
              <td>
                {item.isTeacherAccept === CONSTANT.DONE && (
                  <button
                    className="btn btn-warning"
                    onClick={() => redirectPost(item._id)}
                  >
                    <i
                      class="fa-sharp fa-solid fa-circle-info"
                      style={{ margin: "0 10px" }}
                    ></i>
                    Xem Tiến Độ
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudentManager;
