import { getDataLocalStorage, CONSTANT } from "../API/Config";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";

const DoanhNghiep = () => {
  const [enterprise, setEnterprise] = useState("");
  const [listEnterprise, setListEnterprise] = useState([]);
  const { idEnterprise } = getDataLocalStorage();
  const [status, setStatus] = useState(false);
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(0);

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${Config.API_URL}/find-enterprise-by-id/${idEnterprise}`
      );
      if (res) {
        setEnterprise(res.data.data);
      }

      const resA = await axios.get(
        `${Config.API_URL}/show-list-student-from-enterprise/${idEnterprise}`
      );
      if (resA) {
        setListEnterprise(resA.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, [status]);

  const handleConfirm = async (id) => {
    try {
      const res = await axios.put(`${Config.API_URL}/add-enterprise/${id}`, {
        isAccept: "done",
        idEnterprise: enterprise._id,
      });
      if (res) {
        setStatus(!status);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const removeAss = async (id) => {
    try {
      const res = await axios.delete(`${Config.API_URL}/delete-acc/${id}`);
      if (res) {
        setStatus(!status);
        toast.success("Xóa Assignment Thành Công");
      }
    } catch (error) {
      console.log("====================================");
      console.log("error");
      console.log("====================================");
    }
  };

  const submitComment = async (id) => {
    try {
      const res = await axios.put(`${Config.API_URL}/add-comment/${id}`, {
        comment: comment,
      });
      if (res) {
        toast.success("Đánh Giá Sinh Viên Thành Công");
        setComment("");
        setStatus(!status);
      }
    } catch (error) {
      console.log("error");
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
    <>
      <div className="main__enterprise">
        <div className="title__enterprise">
          <h2>Doanh Nghiệp</h2>
        </div>
      </div>
      <div className="main_detail_st">
        <div className="main_detail_left">
          <img
            src={enterprise.imgEnterprise}
            className="img_main_detail_st"
            alt=""
          />
          <h4 className="name-chinh">{enterprise.nameEnterprise}</h4>
        </div>
        <div className="main_detail_right">
          <table class="table w-80p">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Số Thứ Tự</th>
                <th scope="col">Hình Ảnh</th>
                <th scope="col">Tên Sinh Viên</th>
                <th scope="col">Ngày Sinh</th>
                <th scope="col">Ngày Bắt Đầu Thực Tập</th>
                <th scope="col">Ngày Kết Thúc Thực Tập</th>
                <th scope="col">Xác Nhận Thực Tập</th>
                <th scope="col">Nhận xét</th>
                <th scope="col">Xóa Tiến Độ</th>
              </tr>
            </thead>
            <tbody>
              {listEnterprise?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.img}
                      className={"img_main_detail_st"}
                      alt=""
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.birthday}</td>
                  <td>{showTimeStart(item.timeStart)}</td>
                  <td>{showTimeEnd(item.timeStart)}</td>
                  <td>
                    {item.isAccept === CONSTANT.DONE ? (
                      <span>
                        <i class="fa-solid fa-check color-green"></i>
                      </span>
                    ) : (
                      <input
                        type="checkbox"
                        onClick={() => handleConfirm(item._id)}
                      />
                    )}
                  </td>
                  {/* <td>
                    
                  </td> */}
                  <td>
                    {openComment === index ? (
                      <>
                        {item.comment ? (
                          <p style={{ color: "green" }}>Đã Nhận Xét</p>
                        ) : (
                          <div className="form-group d-flex">
                            <label htmlFor=""></label>
                            <input
                              type="text"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <button onClick={() => submitComment(item._id)}>
                              Submit
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => setOpenComment(index)}
                      >
                        Mở Đánh Giá
                      </button>
                    )}
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
      </div>
    </>
  );
};
export default DoanhNghiep;
