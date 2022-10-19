import { Button, Modal } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage, CONSTANT } from "../API/Config";
import { useHistory, useParams } from "react-router-dom";

const DetailStudentManager = () => {
  const [student, setStudent] = useState({});
  const [listProgress, setListProgress] = useState([]);
  const { id } = useParams();
  const [request, setRequest] = useState({
    nameDeadline: "",
    date: "",
  });
  const [statusProgress, setStatusProgress] = useState(false);
  const [statusReport, setStatusReport] = useState(false);
  const [row, setRow] = useState({});
  const [req, setReq] = useState({
    point: "",
    isXacNhan: "",
    comment: "",
  });

  const [isDelete, setIsDelete] = useState(false);
  const { role } = getDataLocalStorage();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/find-user/${id}`);
      if (res) {
        setStudent(res.data.data);
      }
      const resAss = await axios.get(`${Config.API_URL}/show-assign/${id}`);
      if (resAss) {
        setListProgress(resAss.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, [isDelete, statusReport, statusProgress]);

  const handleChangeProgress = () => {
    setStatusProgress(!statusProgress);
  };

  const handleChangeParams = (type, string) => {
    setRequest({
      ...request,
      [type]: string,
    });
  };

  const cleanForm = () => {
    setRequest({
      nameDeadline: "",
      date: "",
    });
  };

  const submitForm = async () => {
    try {
      if (request.nameDeadline == "" || request.date == "") {
        toast.error("Vui lòng Không Để Trống Tên Deadline or Date");
      }
      const res = await axios.post(`${Config.API_URL}/add-assignment`, {
        nameAss: request.nameDeadline,
        idStudent: student._id,
        date: request.date,
      });
      if (res) {
        toast.success("Tạo Tiến Độ Thành Công");
        cleanForm();
        setStatusProgress(false);
      }
    } catch (error) {
      console.log("====================================");
      console.log("error");
      console.log("====================================");
    }
  };

  const showReport = async (id) => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-assign-one/${id}`);
      if (res) {
        setRow(res.data.data);

        setStatusReport(!statusReport);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleChangeText = (type, string) => {
    setReq({
      ...req,
      [type]: string,
    });
  };

  const submitDL = async (id) => {
    const { point, comment, isXacNhan } = req;
    if ((!point, !comment, !isXacNhan)) {
      toast.error("Vui lòng không để trống các trường này");
    } else {
      const res = await axios.put(`${Config.API_URL}/review-assignment/${id}`, {
        isXacNhan: isXacNhan,
        point: point,
        comment: comment,
      });
      if (res) {
        toast.success("Cập Nhật Thành Công");
        setStatusReport(false);
        setReq({
          point: "",
          comment: "",
          isXacNhan: "",
        });
      }
    }
  };

  const removeAss = async (id) => {
    try {
      const res = await axios.delete(`${Config.API_URL}/delete-ass/${id}`);
      if (res) {
        setIsDelete(!isDelete);
        toast.success("Xóa Assignment Thành Công");
      }
    } catch (error) {
      console.log("====================================");
      console.log("error");
      console.log("====================================");
    }
  };

  console.log(role);

  return (
    <>
      <div className="main__enterprise">
        <div className="title__enterprise">
          <h2>Thông Tin Sinh Viên</h2>
        </div>
      </div>
      <div className="main_detail_st">
        <div className="main_detail_left">
          <img src={student.img} className="img_main_detail_st" alt="" />
          <h4 className="name-chinh">{student.name}</h4>
          <ul>
            <li>Lớp : {student.lop} </li>
            <li>MSV : {student.msv} </li>
            <li>Địa Chỉ: {student.address}</li>
            <li>
              Công Ty Đang Thực Tập : {student?.idEnterprise?.nameEnterprise}
            </li>
            <li className="text-italy attention-here">
              Sinh Viên Thuộc Quyền Quản Lí Của Bạn
            </li>
          </ul>
        </div>
        <div className="main_detail_right">
          <button
            className="btn btn-success"
            style={{ marginTop: "10px", marginLeft: "10px" }}
            onClick={handleChangeProgress}
          >
            <i class="fa-solid fa-plus"></i>
            Thêm Tiến Độ
          </button>
          <table class="table w-80p">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Số Thứ Tự</th>
                <th scope="col">Tên Deadline</th>
                <th scope="col">Hạn Nộp</th>
                <th scope="col text-center">Trạng Thái</th>
                <th scope="col">Tiến Độ Báo Cáo</th>
                <th scope="col">Xóa Tiến Độ</th>
              </tr>
            </thead>
            <tbody>
              {listProgress?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.nameAss}</td>
                  <td>{Config.converstDate(item.date)}</td>
                  <td>
                    {item.ok === CONSTANT.DONE ? (
                      <span>
                        <i class="fa-solid fa-check color-green"></i>
                      </span>
                    ) : (
                      <span className="color-red">Chưa Nộp</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => showReport(item._id)}
                    >
                      <i
                        class="fa-sharp fa-solid fa-circle-info"
                        style={{ margin: "0 10px" }}
                      ></i>
                      Xem Báo Cáo
                    </button>
                  </td>
                  <td>
                    <i
                      class="fa-solid fa-trash color-red"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeAss(item._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {statusProgress && (
          <div className="main_detail_left mg-b-20">
            <div className="form-input">
              <label htmlFor="">Tên Dealine</label>
              <input
                type="text"
                value={request.nameDeadline}
                onChange={(e) =>
                  handleChangeParams("nameDeadline", e.target.value)
                }
              />
            </div>
            <div className="form-input">
              <label htmlFor="">Hạn nộp</label>
              <input
                type="datetime-local"
                value={request.date}
                onChange={(e) => handleChangeParams("date", e.target.value)}
              />
            </div>
            <button className="btn btn-success" onClick={submitForm}>
              Submit
            </button>
          </div>
        )}
        {statusReport && (
          <div className="main_detail_right">
            <div className="title__enterprise">
              <h2>
                {student.name} -{student.lop} - {row.nameAss}
              </h2>
              <span className="color-green" style={{ marginRight: "10px" }}>
                Hạn nộp : {Config.converstDate(row.date)}
              </span>
              <span className="color-red">
                Thời Gian Nộp {Config.converstDate(row.updatedAt)}
              </span>
            </div>
            <div className="cmt">
              <div className="link-file">
                <a href={row.linkFile}>Đường Dẫn File</a>
              </div>
              <table class="table w-80p">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">Điểm</th>
                    <th scope="col">Đạt Yêu Cầu</th>
                    <th scope="col">Nhận Xét</th>
                    <th scope="col">Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        value={req.point}
                        onChange={(e) =>
                          handleChangeText("point", e.target.value)
                        }
                        placeholder={row.point}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={req.isXacNhan === "done" ? true : false}
                        onChange={(e) => handleChangeText("isXacNhan", "done")}
                      />
                    </td>
                    <td>
                      <textarea
                        value={req.comment}
                        onChange={(e) =>
                          handleChangeText("comment", e.target.value)
                        }
                        placeholder={row.comment}
                      ></textarea>
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => submitDL(row._id)}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailStudentManager;
