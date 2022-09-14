import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";

const CreateEnterprise = () => {
  const [item, setItem] = useState({
    nameEnterprise: "",
    descriptionEnterprise: "",
    imgEnterprise: "",
  });

  const changeInput = (type, string) => {
    setItem({
      ...item,
      [type]: string,
    });
  };

  const clean = () => {
    setItem({
      nameEnterprise: "",
      descriptionEnterprise: "",
      imgEnterprise: "",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { nameEnterprise, descriptionEnterprise, imgEnterprise } = item;
    try {
      const res = await axios.post(
        `${Config.API_URL}/create-account-enterprise`,
        {
          nameEnterprise,
          descriptionEnterprise,
          imgEnterprise,
        }
      );
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
        <Link to="/home/list-all-enterprise" className="btn btn-danger">
          <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
        </Link>
      </div>
      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">Thêm Tài Khoản Doanh Nghiệp</h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label>Tên Doanh Nghiệp: </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  name="name"
                  value={item.nameEnterprise}
                  onChange={(e) =>
                    changeInput("nameEnterprise", e.target.value)
                  }
                />
                <label>Mô tả Doanh Nghiệp: </label>
                <textarea
                  className="form-control"
                  value={item.descriptionEnterprise}
                  onChange={(e) =>
                    changeInput("descriptionEnterprise", e.target.value)
                  }
                />
                <label>Hình Ảnh:</label>
                <input
                  placeholder="vd: Link ảnh"
                  type="text"
                  className="form-control"
                  required
                  name="lop"
                  value={item.imgEnterprise}
                  onChange={(e) => changeInput("imgEnterprise", e.target.value)}
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
export default CreateEnterprise;
