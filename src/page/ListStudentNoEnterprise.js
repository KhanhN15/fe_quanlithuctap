import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage, CONSTANT, permission } from "../API/Config";
import { useHistory } from "react-router-dom";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

const ListStudentNoEnterprise = () => {
  const [student, setStudent] = useState([]);
  const [status, setStatus] = useState(false);
  const history = useHistory();

  const redirectPage = (id) => {
    history.push(`/home/detail-account/${id}`);
  };

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${Config.API_URL}/get-student-no-enterprise`
      );
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

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>Danh Sách Người Dùng</h2>
      </div>
      <table class="table w-80p" id="student">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Số Thứ Tự</th>
            <th scope="col">Tên Sinh Viên</th>
            <th scope="col">Quyền</th>
            <th scope="col">Lớp</th>
            <th scope="col">MSV</th>
            <th scope="col">Ngày Sinh</th>
            <th scope="col">Địa Chỉ</th>
            <th scope="col">Khoa</th>
            <th scope="col">Giảng Viên Hỗ Trợ</th>
            <th scope="col">Tên Doanh Nghiệp</th>
          </tr>
        </thead>
        <tbody>
          {student?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td style={{ color: "green" }}>{permission(item.role)}</td>
              <td>{item.lop}</td>
              <td>{item.msv}</td>
              <td>{item.birthday}</td>
              <td>{item.address}</td>
              <td>{item?.idDepartment?.nameDepartment}</td>
              <td>{item?.idTeacher?.name}</td>
              <td>{item?.idEnterprise?.nameEnterprise}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="list-button">
        <ReactHtmlTableToExcel
          className="btn btn-success"
          style={{
            margin: "0 auto",
          }}
          table="student"
          filename="Danh Sách Sinh Viên Đã Có Doanh Nghiệp"
          sheet="Sheet"
          buttonText="Export To Excel"
        />
      </div>
    </div>
  );
};

export default ListStudentNoEnterprise;
