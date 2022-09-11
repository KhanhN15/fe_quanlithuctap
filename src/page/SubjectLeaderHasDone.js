import PopTooltip from "../components/PopTooltip";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage } from "../API/Config";
import { useHistory } from "react-router-dom";

const SubjectLeaderHasDone = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [teacher, setTeacher] = useState("");
  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-only-teacher`);
      if (res) {
        setListTeacher(res.data.data);
      }

      const resListStudent = await axios.get(
        `${Config.API_URL}/show-only-student-no-choose`
      );
      if (resListStudent) {
        setListStudent(resListStudent.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  const handleChangeSelect = async (i) => {
    try {
      const res = await axios.get(
        `${Config.API_URL}/search-by-teacher/${i.target.value}`
      );

      if (res) {
        setListStudent(res.data.data);
      }
    } catch (error) {
      console.log("error select");
    }
  };

  const redirectPage = (id) => {
    history.push(`/home/detail-student-manager/${id}`);
  };

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>Danh Sách Giảng Viên Đã Được Phân Công</h2>
        <span className="attention-here">
          *(Mỗi Giảng Viên Quản Lí Tối Đa 15 Sinh Viên)
        </span>
      </div>
      <div className="form-selector">
        <select onChange={(i) => handleChangeSelect(i)}>
          <option value="null">Vui Lòng Chọn Giáo Viên</option>
          {listTeacher?.map((item) => (
            <option value={item._id}>{item.name}</option>
          ))}
        </select>
      </div>
      <table class="table w-80p">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Số Thứ Tự</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên Sinh Viên</th>
            <th scope="col">Lớp</th>
            <th scope="col">Ngày Sinh</th>
            <th scope="col">Địa Chỉ</th>
          </tr>
        </thead>
        <tbody>
          {listStudent.length > 0 ? (
            listStudent.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={item.img} className="avatar" alt="" />
                </td>
                <td
                  className="text-decoration"
                  onClick={() => redirectPage(item._id)}
                >
                  {item.name}
                </td>
                <td>{item.lop}</td>
                <td>{item.birthday}</td>
                <td>
                  <PopTooltip description={item.address}>
                    <span>{item.address}</span>
                  </PopTooltip>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <span>Không Có Sinh Viên</span>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectLeaderHasDone;
