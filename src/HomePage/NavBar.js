/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./NavBar.css";
import "boxicons";
import { AiOutlineHome } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosPersonAdd } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import routes from "../router";
import { Redirect } from "react-router";
import { getDataLocalStorage } from "../API/Config";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      role: "",
      name: "",
      img: "",
      lop: "",
      idEnterprise: "",
      openNav: false,
      chooseHome: true,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    };
  }

  componentDidMount() {
    const { role, lop, name, img, _id, idEnterprise } = getDataLocalStorage();
    this.setState({
      role: role,
      name: name,
      lop: lop,
      img: img,
      id: _id,
      idEnterprise: idEnterprise,
    });
  }

  open = () => {
    this.setState({
      openNav: !this.state.openNav,
    });
  };

  chooseHome = () => {
    this.setState({
      chooseHome: true,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseNoti = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: true,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseChat = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: true,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseList = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseList: true,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseChart = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: true,
      chooseInfoTeacher: false,
      chooseProfile: false,
    });
  };

  chooseProfile = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: false,
      chooseProfile: true,
    });
  };

  chooseLogout = () => {
    // this.setState({
    //   chooseHome: false,
    //   chooseNoti: false,
    //   chooseChat: false,
    //   chooseList: false,
    //   chooseChart: false,
    //   chooseInfoTeacher: false,
    //   chooseProfile: false,
    // });
    localStorage.removeItem("user");
  };

  chooseInfoTeacher = () => {
    this.setState({
      chooseHome: false,
      chooseNoti: false,
      chooseChat: false,
      chooseList: false,
      chooseChart: false,
      chooseInfoTeacher: true,
      chooseProfile: false,
    });
  };

  render() {
    if (localStorage.getItem("user") == null) {
      return <Redirect to="/login" />;
    }
    var {
      id,
      role,
      name,
      lop,
      img,
      openNav,
      chooseHome,
      chooseNoti,
      chooseChat,
      chooseList,
      chooseChart,
      chooseInfoTeacher,
      chooseProfile,
      idEnterprise,
    } = this.state;
    return (
      <Router>
        <section className="body">
          <div className={openNav ? "sidebar open" : "sidebar"}>
            <div className="logo-details">
              {/* cai 3 gach */}
              <div className="logo_name">MENU</div>
              <div id="btn" onClick={this.open}>
                <box-icon name="menu" color="#ffffff"></box-icon>
              </div>
            </div>
            <ul className="nav-list">
              <li
                className={chooseHome ? "home" : ""}
                onClick={this.chooseHome}
              >
                <Link to="/home">
                  <div className="icon">
                    <AiOutlineHome />
                  </div>
                  <span className="links_name">Trang chủ</span>
                </Link>
                <span className="tooltip">Trang chủ</span>
              </li>

              {role == "student" && (
                <li
                  className={chooseNoti ? "home" : ""}
                  onClick={this.chooseNoti}
                >
                  <Link to="/home/enterprise">
                    {/* thong bao */}
                    <div className="icon">
                      <IoIosPersonAdd />
                    </div>
                    <span className="links_name">Đăng Ký</span>
                  </Link>
                  <span className="tooltip">Đăng Ký Thực Tập Doanh Nghiệp</span>
                </li>
              )}
              {role == "student" && (
                <li
                  className={chooseChat ? "home" : ""}
                  onClick={this.chooseChat}
                >
                  <Link to={`/home/enterprise/booking/${id}`}>
                    <div className="icon">
                      <i class="fa-solid fa-building"></i>
                    </div>
                    <span className="links_name">Thông Tin</span>

                    <span className="tooltip">Xác Nhận Doanh Nghiệp</span>
                  </Link>
                </li>
              )}
              {role == "subjectLeader" && (
                <li
                  className={chooseNoti ? "home" : ""}
                  onClick={this.chooseNoti}
                >
                  <Link to="/home/subject-leader">
                    {/* thong bao */}
                    <div className="icon">
                      <i className="fa-solid fa-book"></i>
                    </div>
                    <span className="links_name">Quản Lí</span>
                  </Link>
                  <span className="tooltip">Quản Lí Bộ Môn</span>
                </li>
              )}
              {role == "facultyLeader" && (
                <li
                  className={chooseNoti ? "home" : ""}
                  onClick={this.chooseNoti}
                >
                  <Link to="/home/facutly-leader">
                    {/* thong bao */}
                    <div className="icon">
                      <i className="fa-solid fa-book"></i>
                    </div>
                    <span className="links_name">Quản Lí</span>
                  </Link>
                  <span className="tooltip">Quản Lí Khoa</span>
                </li>
              )}
              {role == "enterprise" && (
                <li
                  className={chooseNoti ? "home" : ""}
                  onClick={this.chooseNoti}
                >
                  <Link to="/home/list-doanh-nghiep">
                    {/* thong bao */}
                    <div className="icon">
                      <i className="fa-solid fa-book"></i>
                    </div>
                    <span className="links_name">Doanh Nghiệp</span>
                  </Link>
                  <span className="tooltip">Về Doanh Nghiệp</span>
                </li>
              )}
              {role == "teacher" && (
                <li
                  className={chooseNoti ? "home" : ""}
                  onClick={this.chooseNoti}
                >
                  <Link to="/home/list-student-manager">
                    {/* thong bao */}
                    <div className="icon">
                      <i className="fa-solid fa-book"></i>
                    </div>
                    <span className="links_name">Giảng Viên</span>
                  </Link>
                  <span className="tooltip">Danh Sách Giảng Viên Quản Lí</span>
                </li>
              )}
              {role == "admin" && (
                <li
                  className={chooseNoti ? "home" : ""}
                  onClick={this.chooseNoti}
                >
                  <Link to="/home/list-manager-account">
                    {/* thong bao */}
                    <div className="icon">
                      <i className="fa-solid fa-person"></i>
                    </div>
                    <span className="links_name">Quản Lí</span>
                  </Link>
                  <span className="tooltip">Quản Lí Người Dùng</span>
                </li>
              )}
              {role == "admin" && (
                <li
                  className={chooseChart ? "home" : ""}
                  onClick={this.chooseChart}
                >
                  <Link to="/home/list-all-enterprise">
                    {/* thong bao */}
                    <div className="icon">
                      <i className="fa-solid fa-building"></i>
                    </div>
                    <span className="links_name">Quản Lí</span>
                  </Link>
                  <span className="tooltip">Quản Lí Doanh Nghiệp</span>
                </li>
              )}
              <li className="logout" onClick={this.chooseLogout}>
                <a href="/">
                  {/* Log out */}
                  <div className="icon">
                    <BiLogOut />
                  </div>
                  <span className="links_name">Đăng Xuất</span>
                </a>
                <span className="tooltip">Đăng Xuất</span>
              </li>
            </ul>
          </div>
          <div className="navbar_top">
            <div className="navbar__top-user">
              <img className="navbar__top-img" src={img} alt="" />
              <span>{name}</span>-<span>{lop}</span>
            </div>
          </div>
          <div className={openNav ? "nav_open" : "nav_close"}>
            <div>{this.show(routes)}</div>
          </div>
        </section>
      </Router>
    );
  }

  show = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

export default NavBar;
