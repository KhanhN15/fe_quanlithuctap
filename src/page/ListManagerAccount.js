import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage, CONSTANT } from "../API/Config";
import { useHistory } from "react-router-dom";

const ListManagerAccount = () => {
  const [student, setStudent] = useState([]);
  const [status, setStatus] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-list-student`);
      if (res) {
        setStudent(res.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, [status]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${Config.API_URL}/delete-account-student/${id}`
      );
      if (res) {
        setStatus(true);
        toast.success("Xóa Tài Khoản Thành Công");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const redirectPage = (id) => {
    history.push(`/home/detail-account/${id}`);
  };

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>Danh Sách Sinh Viên</h2>
      </div>
      <table class="table w-80p">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Số Thứ Tự</th>
            <th scope="col">Tên Sinh Viên</th>
            <th scope="col">Lớp</th>
            <th scope="col">Ngày Sinh</th>
            <th scope="col">Địa Chỉ</th>
            <th scope="col">Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {student?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.lop}</td>
              <td>{item.birthday}</td>
              <td>{item.address}</td>
              <td>
                <button
                  className="btn btn-warning"
                  style={{ marginRight: "10px" }}
                  onClick={() => redirectPage(item._id)}
                >
                  <i
                    class="fa-sharp fa-solid fa-circle-info"
                    style={{ margin: "0 10px" }}
                  ></i>
                  Xem Chi Tiết
                </button>
                <button
                  className="btn btn-red"
                  onClick={() => handleDelete(item._id)}
                >
                  <i
                    class="fa-sharp fa-solid fa-circle-info"
                    style={{ margin: "0 10px" }}
                  ></i>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListManagerAccount;
