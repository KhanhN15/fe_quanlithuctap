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
  const [statusHere, setStatusHere] = useState(false);

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
  }, [status, statusHere]);

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

  const changeStatusHere = async (id) => {
    try {
      const res = await axios.put(`${Config.API_URL}/pdf-status/${id}`, {
        status: "done",
      });
      if (res) {
        setStatusHere(!statusHere);
      }
    } catch (error) {
      console.log("loi");
    }
  };

  const showTimeStart = (dateNow) => {
    const today = new Date(dateNow);
    return today?.toLocaleDateString() || "";
  };

  const showTimeEnd = (dateNow) => {
    const today = new Date(dateNow);
    const nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 70
    );
    return nextweek?.toLocaleDateString() || "";
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
            <th scope="col">Địa Chỉ Thực Tập</th>
            <th scope="col">Ngày Bắt Đầu Thực Tập</th>
            <th scope="col">Ngày Kết Thúc Thực Tập</th>
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
              <td>{item?.idEnterprise?.nameEnterprise}</td>
              <td>{showTimeStart(item.timeStart)}</td>
              <td>{showTimeEnd(item.timeStart)}</td>
              {item.isReview === "done" ? (
                <>
                  <td>
                    {item.isTeacherAccept === Config.CONSTANT.DONE ? (
                      <>
                        <span>
                          <i class="fa-solid fa-check color-green"></i>
                        </span>
                        <span
                          className="cancel"
                          onClick={() =>
                            changeStatus(item._id, CONSTANT.CANCEL)
                          }
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
                </>
              ) : (
                <>
                  <td style={{ color: "red" }}>
                    {Config.checkStatus(item.isReview)}
                  </td>
                  <td style={{ color: "blue", cursor: "pointer" }}>
                    {item.file ? (
                      <button
                        onClick={() => dowloandFilePdf(item._id)}
                        className="btn btn-warning w-100"
                      >
                        Xem Báo Cáo
                      </button>
                    ) : (
                      <td style={{ color: "red" }}>Chưa có báo cáo</td>
                    )}
                    <button
                      className="btn btn-success"
                      onClick={() => changeStatusHere(item._id)}
                    >
                      Duyet
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStudentManager;
