import PopTooltip from "../components/PopTooltip";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage } from "../API/Config";
import { useHistory } from "react-router-dom";

const SubjectLeaderListStudent = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [listStudent, setListStudent] = useState([]);

  const [listId, setListId] = useState([]);
  const [status, setStatus] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [department, setDepartment] = useState("");

  const { idDepartment } = getDataLocalStorage();
  const history = useHistory();

  useEffect(async () => {
    try {
      const resListTeacher = await axios.get(
        `${Config.API_URL}/show-only-teacher`
      );
      if (resListTeacher) {
        setListTeacher(resListTeacher.data.data);
      }

      const resListStudent = await axios.get(
        `${Config.API_URL}/show-only-student-no-choose`
      );
      if (resListStudent) {
        const listHasFilter = resListStudent.data.data.filter(
          (el) => !("idTeacher" in el)
        );
        setListStudent(listHasFilter);
      }

      const nameDp = await axios.get(
        `${Config.API_URL}/show-depart/${idDepartment}`
      );
      if (nameDp) {
        setDepartment(nameDp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangeSelect = (i) => {
    setTeacher(i.target.value);
  };

  const checkData = (item) => {
    const res = listId.find((id) => id === item);
    if (res) {
      const arr = listId.filter((i) => i !== res);
      setListId(arr);
    } else {
      const arr = [];
      arr.push(item);
      setListId([...arr, ...listId]);
    }
  };

  const checkFull = () => {
    setStatus(!status);
  };

  useEffect(() => {
    if (status) {
      let newA = [];
      listStudent.map((item) => {
        if (newA.length < 15) {
          newA.push(item._id);
        } else {
          toast.warning("Vui lòng tự chọn bằng tay");
          toast.warning("Số Sinh Viên Tối Thiểu Là 15");
        }
      });
      setListId(newA);
    } else {
      setListId([]);
    }
  }, [status]);

  const saveData = async () => {
    for (const element of listId) {
      try {
        const response = await axios.put(
          `${Config.API_URL}/add-department-manage/${element}`,
          {
            idDepartment: idDepartment,
            idTeacher: teacher,
          }
        );
      } catch (error) {
        console.log("Lỗi call Api");
      }
    }
  };

  const handleSubmit = async () => {
    if (listId.length < 1) {
      toast.error("Vui lòng chọn sinh viên");
    } else {
      if (!teacher) {
        toast.error("Vui lòng chọn giáo viên");
      } else {
        await saveData();
        toast.success("Thêm Sinh Viên Thành Công");
      }
    }
  };

  const handleRedirect = () => {
    history.push("/home/subject-leader-list");
  };

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <button className="btn btn-info button-if" onClick={handleRedirect}>
          <i class="fa-solid fa-circle-info" style={{ margin: "0 5px" }}></i>
          Danh Sách
        </button>
        <h2>
          Phân Công Giảng Viên - (thuộc Khoa : {department.nameDepartment})
        </h2>
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
            <th scope="col">
              <input type="checkbox" onClick={checkFull} />
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
          {listStudent.map((item, index) => (
            <tr key={item._id}>
              <td>
                <input
                  type="checkbox"
                  onClick={() => checkData(item._id)}
                  checked={status || listId.includes(item._id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>
                <img src={item.img} className="avatar" alt="" />
              </td>
              <td className="text-decoration">{item.name}</td>
              <td>{item.lop}</td>
              <td>{item.birthday}</td>
              <td>
                <PopTooltip description={item.address}>
                  <span>{item.address}</span>
                </PopTooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success mt-2" onClick={handleSubmit}>
        Xác Nhận
      </button>
    </div>
  );
};

export default SubjectLeaderListStudent;
