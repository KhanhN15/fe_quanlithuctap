import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage, CONSTANT, permission } from "../API/Config";
import { useHistory } from "react-router-dom";
import PopTooltip from "../components/PopTooltip";

const ListManagerEnterprise = () => {
  const [student, setStudent] = useState([]);
  const [status, setStatus] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-all-enterprise`);
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
        `${Config.API_URL}/delete-account-enterprise/${id}`
      );
      if (res) {
        setStatus(true);
        toast.success("Xóa Doanh Nghiệp Thành Công");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleRedirectCreate = () => {
    history.push(`/home/create-account-enterprise`);
  };

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <button
          className="btn btn-success"
          style={{
            float: "right",
          }}
          onClick={handleRedirectCreate}
        >
          Thêm Người Dùng
        </button>
        <h2>Danh Sách Người Dùng</h2>
      </div>
      <table class="table w-80p">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Số Thứ Tự</th>
            <th scope="col">Tên Doanh Nghiệp</th>
            <th scope="col">Hình Ảnh</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {student?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.nameEnterprise}</td>
              <td style={{ color: "green" }}>
                <img
                  src={item.imgEnterprise}
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </td>
              <td>
                <PopTooltip description={item?.descriptionEnterprise}>
                  <div className="cut-text">{item.descriptionEnterprise}</div>
                </PopTooltip>
              </td>
              <td>
                <button
                  className="btn btn-red"
                  onClick={() => handleDelete(item._id)}
                >
                  <i
                    class="fa-sharp fa-solid fa-circle-info"
                    style={{ margin: "0 10px" }}
                  ></i>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListManagerEnterprise;
