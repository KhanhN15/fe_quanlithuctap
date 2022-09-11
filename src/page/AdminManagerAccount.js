import React, { Component } from "react";
import { Link } from "react-router-dom";

const AdminManageAccount = () => {
  return (
    <div className="addForm">
      <div className="back">
        <Link to="/home/list-students" className="btn btn-danger">
          <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
        </Link>
      </div>
      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Thêm sinh viên</h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label>MSV: </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="msv"
                />
                <label>Họ và tên: </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="name"
                />
                <label>Ngày sinh: </label>
                <input
                  type="date"
                  className="form-control"
                  required
                  name="birthday"
                />
                <label>Giới tính:</label>
                <select className="form-control" name="gender" required>
                  <option>--Select--</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
                <label>Số điện thoại:</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="phone"
                />
                <label>Địa chỉ: </label>
                <input type="text" className="form-control" name="address" />
                <label>Tổng số tín chỉ: </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="sum_of_credits"
                />
                <label>GPA: </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="gpa"
                />
                <label>Trạng thái: </label>
                <select className="form-control" required name="status">
                  <option>--Select--</option>
                  <option value="Không">Không </option>
                  <option value="Nguy cơ nghỉ học">Nguy cơ nghỉ học</option>
                  <option value="Cảnh báo học vụ">Cảnh báo học vụ</option>
                  <option value="Thiếu tín chỉ">Thiếu tín chỉ</option>
                  <option value="Thiếu học phí">Thiếu học phí</option>
                  <option value="Khen thưởng">Khen thưởng</option>
                </select>{" "}
                <label>Lớp:</label>
                <input
                  placeholder="vd: K64-CA-CLC-4"
                  type="text"
                  className="form-control"
                  required
                  name="lop"
                />
                <br />
                <div className="text_center">
                  <button
                    type="submit"
                    className="button submit btn btn-primary"
                  >
                    <span className="fa fa-plus"></span> &nbsp;Lưu lại
                  </button>{" "}
                  &nbsp;
                  <Link
                    to="/home/list-students"
                    className="button cancle btn btn-primary"
                  >
                    <span className="fa fa-close"></span> &nbsp;Hủy bỏ
                  </Link>
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
