import "./Enterprise.css";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Config from "../API/Config";
import { useHistory } from "react-router-dom";
import { getDataLocalStorage } from "../API/Config";
import { toast } from "react-toastify";

const Enterprise = () => {
  const [listEnterprise, setListEnterprise] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-all-enterprise`);
      if (res.data.success) {
        setListEnterprise(res.data.data);
      }
    } catch (error) {
      console.log("error server");
    }
  }, []);

  useEffect(() => {
    const { idEnterprise } = getDataLocalStorage();
    if (idEnterprise) {
      setIsCheck(true);
    }
  }, []);

  const redirectPage = (id) => {
    history.push(`/home/enterprise/${id}`);
  };

  const handleBookingEnterprise = async (id) => {
    const idS = getDataLocalStorage();
    try {
      const req = {
        isAccept: "wait",
        idEnterprise: id + "",
      };
      const res = await axios.put(
        `${Config.API_URL}/add-enterprise/${idS._id}`,
        req
      );
      if (res.status === 200) {
        toast.success("Đăng Ký Thành Công Vui Lòng Đợi Xác Nhận");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>Danh sách các công ty tuyển thực tập</h2>
      </div>
      <div className="show-alert">
        Sinh viên <span className="attention-alert">chưa có chỗ thực tập</span>{" "}
        cần tiến hành đăng ký thực tập trong thời gian sớm nhất
      </div>
      <div className="list-card">
        {listEnterprise?.map((item) => (
          <div className="card" key={item._id}>
            <img
              className="card-img"
              src={item.imgEnterprise}
              alt={item.nameEnterprise}
            />
            <div className="card-des">
              <div className="card-name">{item.nameEnterprise}</div>
              <div className="list-button">
                <button
                  className={isCheck ? "cancel-click" : ""}
                  onClick={() => handleBookingEnterprise(item._id)}
                >
                  Đăng Ký
                </button>
                <button onClick={() => redirectPage(item._id)}>
                  Thông Tin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Enterprise;
