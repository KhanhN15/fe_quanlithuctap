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
                <th scope="col">Xác Nhận Thực Tập</th>
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
