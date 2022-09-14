import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";

const AdminManageAccount = () => {
  const [teacher, setTeacher] = useState([]);
  const [depart, setDepart] = useState([]);
  const [item, setItem] = useState({
    name: "",
    password: "",
    birthday: "",
    idDepartment: "",
    lop: "",
    address: "",
    role: "",
    img: "",
    isAccept: "wait",
    isTeacherAccept: "wait",
  });

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-only-teacher`);
      if (res) {
        setTeacher(res.data.data);
      }

      const resA = await axios.get(`${Config.API_URL}/show-depart`);
      if (resA) {
        setDepart(resA.data.data);
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
      birthday: "",
      idDepartment: "",
      idTeacher: "",
      lop: "",
      address: "",
      role: "",
      img: "",
      isAccept: "wait",
      isTeacherAccept: "wait",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const {
      name,
      password,
      birthday,
      idDepartment,
      idTeacher,
      lop,
      address,
      role,
      img,
      isAccept,
      isTeacherAccept,
    } = item;
    try {
      const res = await axios.post(`${Config.API_URL}/create-account-student`, {
        name,
        password,
        birthday,
        idDepartment,
        idTeacher,
        lop,
        address,
        role,
        img,
        isAccept,
        isTeacherAccept,
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
            <h3 className="panel-title">Thêm người dùng</h3>
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
                <label>Ngày sinh: </label>
                <input
                  type="date"
                  className="form-control"
                  required
                  name="birthday"
                  value={item.birthday}
                  onChange={(e) => changeInput("birthday", e.target.value)}
                />
                <label>Khoa:</label>
                <select
                  className="form-control"
                  name="gender"
                  required
                  value={item.idDepartment}
                  onChange={(e) => changeInput("idDepartment", e.target.value)}
                >
                  <option>--Select--</option>
                  {depart?.map((item, index) => (
                    <option value={item._id}>{item.nameDepartment}</option>
                  ))}
                </select>
                <label>Giáo Viên Hướng Dẫn:</label>
                <select
                  className="form-control"
                  name="gender"
                  required
                  value={item.idTeacher}
                  onChange={(e) => changeInput("idTeacher", e.target.value)}
                >
                  <option>--Select--</option>
                  {teacher?.map((item, index) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </select>
                <label>Lớp:</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="phone"
                  value={item.lop}
                  onChange={(e) => changeInput("lop", e.target.value)}
                />
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
                  <option value="student">Sinh Viên </option>
                  <option value="teacher">Giảng Viên</option>
                  <option value="subjectLeader">Quản Lí Bộ Môn</option>
                  <option value="facultyLeader">Quản Lí Khoa</option>
                  <option value="admin">Giảng Viên</option>
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

export default AdminManageAccount;
