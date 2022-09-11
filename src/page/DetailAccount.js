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

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/find-user/${id}`);
      if (res) {
        setStudent(res.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, []);
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
              <p style={{ marginTop: "10px" }}>Họ và tên: </p>
              <input
                style={{ width: "90%" }}
                type="text"
                name="name"
                value={student.name}
              />
              <p style={{ marginTop: "10px" }}>Ngày sinh:</p>
              <input
                style={{ width: "90%" }}
                type="text"
                name="birthday"
                value={student.birthday}
              />
            </Left_div>
            <Right_div>
              <p>Lớp: </p>
              <label> {student.lop} </label>
              <p style={{ marginTop: "10px" }}>Địa chỉ: </p>
              <textarea
                style={{
                  width: "90%",
                  resize: "none",
                  minHeight: "9rem",
                }}
                value={student.address}
                name="address"
              />
            </Right_div>
          </Infor>
        </Infor_site>
        <Gpa_site>
          <Title_gpa>Địa Điểm thực tập</Title_gpa>
          <p>{student?.idEnterprise?.nameEnterprise}</p>
          <br />
          <progress min="0" max="158" value="ewq"></progress>
          <p style={{ marginTop: "30px" }}>Điểm trung bình : </p>
          <label>{"dsds"}</label>
          <p>Trạng thái: </p>
          {/* <label
            className={
              status === "Khen thưởng" || status === "Không"
                ? "change_status_green"
                : "change_status_red"
            }
          >
            {status}
          </label> */}
        </Gpa_site>
      </Site>
      <Btn_site>
        {/* <Link
            to='/home/list-students'
            className='goback btn btn-danger'
            style={{ marginRight: "20px" }}>
            <span className='fa fa-arrow-left'></span> &nbsp; Quay lại
          </Link> */}
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginRight: "20px" }}
        >
          <span className="fa fa-save"></span> &nbsp; Ghi nhận
        </button>
        <Link
          to="/home/change-password"
          className="btn btn-primary"
          style={{ marginRight: "20px" }}
        >
          <span className="fa fa-key"></span> &nbsp; Đổi mật khẩu
        </Link>
      </Btn_site>
    </div>
  );
};

export default DetailAccount;
