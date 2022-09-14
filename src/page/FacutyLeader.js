import PopTooltip from "../components/PopTooltip";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage } from "../API/Config";
import { useHistory } from "react-router-dom";

const FacutlyLeader = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState("");

  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-depart`);
      if (res) {
        setListDepartment(res.data.data);
      }

      const resListStudent = await axios.get(
        `${Config.API_URL}/show-only-teacher`
      );
      if (resListStudent) {
        setListTeacher(resListStudent.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  useEffect(async () => {
    if (department) {
      const res = await axios.get(
        `${Config.API_URL}/show-teacher-by-department/${department}`
      );
      if (res) {
        setListTeacher(res.data.data);
      }

      const resStudent = await axios.get(
        `${Config.API_URL}/list-student-has-manage-by-department/${department}`
      );
      if (resStudent) {
        setListStudent(resStudent.data.data);
      }
    }
  }, [department]);

  useEffect(async () => {
    if (teacher) {
      const res = await axios.get(
        `${Config.API_URL}/show-teacher-by-department/${department}`,
        {
          teacher: teacher,
        }
      );
      if (res) {
        setListStudent(res.data.data);
      }
    }
  }, [teacher]);

  const handleChangeSelect = (i) => {
    setDepartment(i.target.value);
  };

  const handleSelectTeacher = (i) => {
    setTeacher(i.target.value);
  };

  const redirect = (id) => {
    history.push(`/home/detail-account/${id}`);
  };

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
          <select onChange={(i) => handleChangeSelect(i)}>
            <option value="null">Vui Lòng Chọn Khoa</option>
            {listDepartment?.map((item) => (
              <option value={item._id}>{item.nameDepartment}</option>
            ))}
          </select>
        </div>
        {department && (
          <div className="form-selector">
            <label className="lb" htmlFor="">
              Tên Giảng Viên
            </label>
            <select onChange={(i) => handleSelectTeacher(i)}>
              <option value="null">Vui Lòng Chọn Giáo Viên</option>
              {listTeacher?.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <table class="table w-80p">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Số Thứ Tự</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên Sinh Viên</th>
            <th scope="col">Lớp</th>
            <th scope="col">Ngày Sinh</th>
            <th scope="col">Địa Chỉ Thực Tập</th>
          </tr>
        </thead>
        <tbody>
          {listStudent.map((e, index) => (
            <tr key={e._id}>
              <td>{index + 1}</td>
              <td>
                <img src={e.img} className="avatar" alt="" />
              </td>
              <td className="text-decoration" onClick={() => redirect(e._id)}>
                {e.name}
              </td>
              <td>{e.lop}</td>
              <td>{e.birthday}</td>
              <td>
                <PopTooltip description={e?.idEnterprise?.nameEnterprise}>
                  <span className="color-green">
                    {e?.idEnterprise?.nameEnterprise || (
                      <span className="color-red">
                        Chưa chọn công ty thực tập
                      </span>
                    )}
                  </span>
                </PopTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacutlyLeader;
