import styled from "styled-components";
import "../index.css";
import avatar from "../Profile/avatar.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getDataLocalStorage, CONSTANT } from "../API/Config";
import { useHistory } from "react-router-dom";
import * as Config from "../API/Config";
import { checkStatus } from "../API/Config";
import { toast } from "react-toastify";

const Title = styled.h2`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 5%;
  color: #0b5592;
`;
const Infor_site = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  background-color: whitesmoke;
`;
const Infor = styled.div`
  display: flex;
`;
const Left_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`;
const Right_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
`;
const Image_div = styled.div`
  padding-top: 30px;
`;
const Title_infor = styled.p`
  font-size: 2.5rem;
  width: 60%;
  margin: auto;
  padding-bottom: 20px;
  text-align: center;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
`;
const Title_gpa = styled.p`
  font-size: 2.5rem;
  // width: 50%;
  // margin: auto;
  padding-bottom: 20px;
  font-weight: bold;
  //text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
    0px -4px 10px rgba(255, 255, 255, 0.3);
`;
const Gpa_site = styled.div`
  // border: 1px solid black;
  background-color: whitesmoke;
  border-radius: 10px;
  width: 30%;
  padding: 2rem 3rem;
  margin-left: 5%;
  height: 50vh;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
`;
const Site = styled.div`
  display: flex;
  margin-top: 10%;
`;
const Btn_site = styled.div`
  position: static;
  margin-top: 5vh;
  text-align: center;
`;

const DetailAccount = () => {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [assign, setAssign] = useState([]);
  const [status, setStatus] = useState(false);

  const { role } = getDataLocalStorage();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/find-user/${id}`);
      if (res) {
        setStudent(res.data.data);
      }
      const resA = await axios.get(
        `${Config.API_URL}/show-detail-assign-by-student/${id}`
      );
      if (resA) {
        console.log("====================================");
        console.log(resA);
        console.log("====================================");
        setAssign(resA.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, [status]);

  const setPoint = (arra) => {
    let point = 0;
    for (let index = 0; index < arra.length; index++) {
      const element = arra[index].point;
      const p = +element;
      point += p;
    }
    return point;
  };

  const handleChange = (tag, e) => {
    setStudent({
      ...student,
      [tag]: e,
    });
  };

  const handleSubmit = async () => {
    if (
      !student.name ||
      !student.birthday ||
      !student.address ||
      !student.lop
    ) {
      toast.error("Vui lòng không để trống các trường");
    } else {
      try {
        const res = await axios.put(`${Config.API_URL}/edit-account/${id}`, {
          name: student.name,
          birthday: student.birthday,
          address: student.address,
          lop: student.lop,
        });
        if (res) {
          setStatus(!status);
          toast.success("Cập nhật thành công");
        }
      } catch (error) {
        console.log("====================================");
        console.log("error submit");
        console.log("====================================");
      }
    }
  };

  return (
    <div className="container">
      <Title>Thông tin cá nhân</Title>
      <Site>
        <Infor_site>
          <Title_infor>Thông tin cá nhân</Title_infor>
          <Infor>
            <Image_div>
              <img
                className="avatar"
                src={student.img}
                width="150px"
                height="150px"
              />
            </Image_div>
            <Left_div>
              <p style={{ marginTop: "10px" }}>MSV: </p>
              <input
                style={{ width: "90%" }}
                type="text"
                disabled
                value={student.msv?.toUpperCase()}
              />
              <p style={{ marginTop: "10px" }}>Họ và tên: </p>
              <input
                style={{ width: "90%" }}
                type="text"
                name="name"
                onChange={(e) => handleChange("name", e.target.value)}
                value={student.name}
              />
              <p style={{ marginTop: "10px" }}>Ngày sinh:</p>
              <input
                style={{ width: "90%" }}
                type="text"
                name="birthday"
                onChange={(e) => handleChange("birthday", e.target.value)}
                value={student.birthday}
              />
            </Left_div>
            <Right_div>
              <p>Lớp: </p>
              <input
                style={{ width: "90%" }}
                type="text"
                name="lop"
                onChange={(e) => handleChange("lop", e.target.value)}
                value={student.lop}
              />
              <p style={{ marginTop: "10px" }}>Địa chỉ: </p>
              <textarea
                style={{
                  width: "90%",
                  resize: "none",
                  minHeight: "9rem",
                }}
                onChange={(e) => handleChange("address", e.target.value)}
                value={student.address}
                name="address"
              />
            </Right_div>
          </Infor>
        </Infor_site>
        {student.role === "student" && (
          <Gpa_site>
            <Title_gpa>Địa Điểm thực tập</Title_gpa>
            <p>{student?.idEnterprise?.nameEnterprise}</p>
            <br />
            <progress min="0" max="10" value={setPoint(assign)}></progress>
            <p style={{ marginTop: "30px" }}>Điểm trung bình : </p>
            <label>{setPoint(assign)}</label>
            <p>Trạng thái: </p>
            <label htmlFor="">{checkStatus(student.isAccept)}</label>
          </Gpa_site>
        )}
      </Site>

      {role === "admin" && (
        <Btn_site>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginRight: "20px" }}
            onClick={handleSubmit}
          >
            <span className="fa fa-save"></span> &nbsp; Ghi nhận
          </button>
          <Link
            to="/home/list-manager-account"
            className="btn btn-warning"
            style={{ marginRight: "20px" }}
          >
            <span className="fa fa-key"></span> &nbsp; Quay Lại
          </Link>
        </Btn_site>
      )}
    </div>
  );
};

export default DetailAccount;
