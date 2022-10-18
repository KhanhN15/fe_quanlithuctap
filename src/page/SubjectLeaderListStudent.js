import PopTooltip from "../components/PopTooltip";
import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage } from "../API/Config";
import { useHistory } from "react-router-dom";
import { useCSVReader } from "react-papaparse";

const SubjectLeaderListStudent = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const { CSVReader } = useCSVReader();

  const buttonRef = useRef(null);

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

  const redirectToHere = () => {
    history.push(`/home/list-student-has-enterprise`);
  };

  const showNameColumn = (string) => {
    let res = "";
    switch (string) {
      case "name":
        res = "Họ và Tên";
        break;
      case "msv":
        res = "MSV";
        break;
      case "password":
        res = "Mật Khẩu";
        break;
      case "birthday":
        res = "Ngày Sinh";
        break;
      case "address":
        res = "Địa Chỉ";
        break;
      case "role":
        res = "Quyền";
        break;
      case "idEnterprise":
        res = "ID Chỗ thực tập";
        break;
      case "lop":
        res = "Lớp";
        break;
      default:
        res = "NoName";
        break;
    }
    return res;
  };

  const addStudent = async () => {
    const a =
      (await rowData.length) > 0 &&
      rowData.map(async (item) => {
        const res = await axios.post(
          `${Config.API_URL}/create-account-student-hi`,
          {
            name: item.name,
            password: item.password,
            msv: item.msv,
            birthday: item.birthday,
            idDepartment: item.idDepartment,
            lop: item.lop,
            address: item.address,
            role: item.role,
            img: "https://png.pngtree.com/png-clipart/20200701/original/pngtree-black-default-avatar-png-image_5407174.jpg",
            isAccept: "wait",
            isTeacherAccept: "wait",
          }
        );

        return res;
      });

    if (a) {
      toast.success("Tạo tài khoản thành công");
      setRowData([]);
      setColumnData([]);
    }
  };

  console.log(rowData);
  return (
    <>
      <div className="main__enterprise">
        <div className="title__enterprise">
          <button
            className="btn btn-info button-if"
            style={{ margin: "0 10px" }}
            onClick={handleRedirect}
          >
            <i class="fa-solid fa-circle-info" style={{ margin: "0 5px" }}></i>
            Danh Sách
          </button>
          <button
            className="btn btn-success"
            style={{
              float: "right",
              margin: "0 10px",
            }}
            onClick={redirectToHere}
          >
            Danh Sách Các Học Sinh Đã Có Doanh Nghiệp
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
      <div className="main__enterprise">
        <div className="title__enterprise">
          <CSVReader
            onUploadAccepted={(results: any) => {
              const res = results.data;
              const columns = res[0].map((col, index) => {
                return {
                  Header: col,
                };
              });

              const rows = res.slice(1).map((row) => {
                return row.reduce((acc, cur, index) => {
                  acc[columns[index].Header] = cur;
                  return acc;
                }, {});
              });
              setColumnData(columns);
              setRowData(rows);
            }}
          >
            {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
              <>
                <div>
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{ margin: "10px 0" }}
                    {...getRootProps()}
                  >
                    Browse file
                  </button>
                  <div>{acceptedFile && acceptedFile.name}</div>
                </div>
                <table class="table w-80p">
                  <thead class="thead-dark">
                    <tr>
                      {columnData?.map((col) => (
                        <th scope="col">{showNameColumn(col.Header)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rowData.map((row) => (
                      <>
                        <tr key={row?.msv}>
                          <td>{row?.msv}</td>
                          <td>{row?.name}</td>
                          <td>{row?.password}</td>
                          <td>{row?.birthday}</td>
                          <td>{row?.lop}</td>
                          <td>{row?.address}</td>
                          <td>{row?.role}</td>
                          <td>{row?.idEnterprise}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                <button className="btn btn-success" onClick={addStudent}>
                  Thêm Vào Danh Sách
                </button>
              </>
            )}
          </CSVReader>
        </div>
      </div>
    </>
  );
};

export default SubjectLeaderListStudent;
