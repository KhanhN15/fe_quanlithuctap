import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";

const AdminManageAccountDN = () => {
  const [teacher, setTeacher] = useState([]);
  const [depart, setDepart] = useState([]);
  const [item, setItem] = useState({
    name: "",
    password: "",
    idEnterprise: "",
    address: "",
    role: "",
    img: "",
  });

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-all-enterprise`);
      if (res) {
        setTeacher(res.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  const changeInput = (type, string) => {
    setItem({
      ...item,
      [type]: string,
    });
  };

  const clean = () => {
    setItem({
      name: "",
      password: "",
      idEnterprise: "",
      address: "",
      role: "",
      img: "",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { name, password, idEnterprise, address, role, img } = item;
    try {
      const res = await axios.post(`${Config.API_URL}/create-account-dn`, {
        name,
        password,
        idEnterprise,
        address,
        role,
        img,
      });
      if (res) {
        toast.success("Tạo tài khoản thành công");
        clean();
      }
    } catch (error) {
      console.log("error form submit");
    }
  };

  return (
    <div className="addForm">
      <div className="back">
        <Link to="/home/list-manager-account" className="btn btn-danger">
          <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
        </Link>
      </div>
      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Thêm doanh nghiệp</h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label>Họ và tên: </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="name"
                  value={item.name}
                  onChange={(e) => changeInput("name", e.target.value)}
                />
                <label>Mật Khẩu: </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  name="msv"
                  value={item.password}
                  onChange={(e) => changeInput("password", e.target.value)}
                />
                <label>Chọn Doanh Nghiệp :</label>
                <select
                  className="form-control"
                  name="gender"
                  required
                  value={item.idEnterprise}
                  onChange={(e) => changeInput("idEnterprise", e.target.value)}
                >
                  <option>--Select--</option>
                  {teacher?.map((item, index) => (
                    <option value={item._id}>{item.nameEnterprise}</option>
                  ))}
                </select>
                <label>Địa chỉ: </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={item.address}
                  onChange={(e) => changeInput("address", e.target.value)}
                />
                <label>Quyền: </label>
                <select
                  className="form-control"
                  required
                  name="status"
                  value={item.role}
                  onChange={(e) => changeInput("role", e.target.value)}
                >
                  <option>--Select--</option>
                  <option value="enterprise">Doanh Nghiệp </option>
                </select>{" "}
                <label>Hình Ảnh:</label>
                <input
                  placeholder="vd: K64-CA-CLC-4"
                  type="text"
                  className="form-control"
                  required
                  name="lop"
                  value={item.img}
                  onChange={(e) => changeInput("img", e.target.value)}
                />
                <br />
                <div className="text_center">
                  <button
                    type="submit"
                    className="button submit btn btn-primary"
                    onClick={(e) => submitForm(e)}
                  >
                    <span className="fa fa-plus"></span> &nbsp;Lưu lại
                  </button>{" "}
                  &nbsp;
                  <div
                    onClick={clean}
                    className="button cancle btn btn-primary"
                  >
                    <span className="fa fa-close"></span> &nbsp;Hủy bỏ
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManageAccountDN;
