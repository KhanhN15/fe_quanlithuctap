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
  const [listDepartment, setListDepartment] = useState([]);
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState("");
  const [status, setStatus] = useState(false);

  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-depart`);
      if (res) {
        setListDepartment(res.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, [status]);

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
  }, [department, status]);

  const redirectPage = (id) => {
    history.push(`/home/detail-student-manager/${id}`);
  };

  const handleChangeSelect = (i) => {
    setDepartment(i.target.value);
  };

  const handleSelectTeacher = async (i) => {
    setTeacher(i.target.value);
    const res = await axios.get(
      `${Config.API_URL}/show-teacher-here/${department}/${i.target.value}`,
      {
        teacher: i.target.value,
      }
    );
    if (res) {
      setListStudent(res.data.data);
    } else {
      setListStudent([]);
    }
  };

  const changeStatus = async (id) => {
    try {
      const res = await axios.put(`${Config.API_URL}/pdf-status/${id}`, {
        status: "done",
      });
      if (res) {
        setStatus(!status);
      }
    } catch (error) {
      console.log("loi");
    }
  };

  const redirect = (id) => {
    history.push(`/home/detail-account/${id}`);
  };

  const dowloandFilePdf = async (id) => {
    const res = await axios.get(`${Config.API_URL}/show-all-pdf-course/${id}`);
    if (res.data?.data?.file) {
      const linkSource = res.data.data.file;
      const downloadLink = document.createElement("a");
      const fileName = res.data.data.name;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>Danh Sách Giảng Viên Đã Được Phân Công</h2>
        <span className="attention-here">
          (Danh sách sinh viên thuộc các Chuyên Ngành)
        </span>
      </div>
      <div className="list-action">
        <div className="form-selector">
          <label className="lb" htmlFor="">
            Tên Chuyên Ngành
          </label>
          <select onChange={(i) => handleChangeSelect(i)}>
            <option value="null">Vui Lòng Chọn Chuyên Ngành</option>
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
            <th scope="col">Mã Sinh Viên</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên Sinh Viên</th>
            <th scope="col">Lớp</th>
            <th scope="col">Ngày Sinh</th>
            <th scope="col">Chuyên Ngành</th>
            <th scope="col">Địa Chỉ Thực Tập</th>
            <th scope="col">Xem Đề Cương</th>
            <th scope="col">Trạng Thái</th>
            <th scope="col">Duyệt Đề Cương</th>
          </tr>
        </thead>
        <tbody>
          {listStudent.map((e, index) => (
            <tr key={e._id}>
              <td>{index + 1}</td>
              <td>{e.msv?.toUpperCase()}</td>
              <td>
                <img src={e.img} className="avatar" alt="" />
              </td>
              <td
                className="text-decoration"
                onClick={() => redirectPage(e._id)}
              >
                {e.name}
              </td>
              <td>{e.lop}</td>
              <td>{e.birthday}</td>
              <td>{e.idDepartment?.nameDepartment}</td>
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
              {e.file ? (
                <td
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => dowloandFilePdf(e._id)}
                >
                  xem
                </td>
              ) : (
                <td style={{ color: "blue", cursor: "pointer" }}>
                  Chưa Có Đề Cương
                </td>
              )}
              {e.isReview === "done" ? (
                <td style={{ color: "green" }}>
                  {Config.checkStatus(e.isReview)}
                </td>
              ) : (
                <td style={{ color: "red" }}>
                  {Config.checkStatus(e.isReview)}
                </td>
              )}
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => changeStatus(e._id)}
                >
                  Duyet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectLeaderHasDone;
