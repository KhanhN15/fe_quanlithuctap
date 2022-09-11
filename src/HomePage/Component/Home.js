/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { BsClipboardData } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import logo from "./logo1.png";
import home from "./home.png";
import "../NavBar.css";
export default class Home extends Component {
  render() {
    return (
      <div id="main">
        <div className="homepage">
          <p className="elements" id="title">
            Classe<span id="student">369</span>
          </p>
          <hr className="elements" id="homehr" />
          <div className="introduction">
            <h1 className="manage">
              Mọi thứ
              <div id="_manage">cần thiết cho việc</div> đăng ký thực tập doanh
              nghiệp
            </h1>
            <div className="manage_1">
              <img
                src={logo}
                width="300rem"
                height="200rem"
                style={{ marginTop: "-8rem", marginRight: "7rem" }}
              />
            </div>
            <p id="_intro1">
              Classe369 là 1 phần mềm tiện ích giúp sinh viên quản lí thực tập
              một cách ngắn gọn và đầy đủ nhất thông qua những thống kê xác thực
              nhất và nhanh nhất
            </p>
            <img className="homewallpaper" src={home} />
            <div className="footer1">
              <br />
              <p id="_footer2">
                Hệ thống sở hữu hàng ngàn người dùng với sự tin tưởng và độ bảo
                mật cao giúp mọi người dễ dàng sử dụng
              </p>
            </div>

            {/* FOOTER CHUC NANG */}

            {/* <div className="footer2">
              <hr className="elements" id="homehr" />
              <h1 id="_footer1">Các tính năng của Classe369</h1>

              <div className="footer_icons">
                <span className="fa fa-comment-dots"></span>
              </div>
              <div className="footer_icons">
                <span className="fa fa-chart-bar"></span>
              </div>
              <div className="footer_icons">
                <BsClipboardData />
              </div>
              <div className="footer_icons">
                <IoMdNotificationsOutline />
              </div>
              <br />

              <div className="footer_fn" id="footer_fn1">
                Chat
              </div>
              <div className="footer_fn" id="footer_fn2">
                Biểu đồ điểm
              </div>
              <div className="footer_fn" id="footer_fn3">
                Danh sách sinh viên
              </div>
              <div className="footer_fn" id="footer_fn4">
                Thông báo
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
