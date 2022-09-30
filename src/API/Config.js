import moment from "moment";

export const API_URL = "http://localhost:5000";

export const getDataLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const checkStatus = (keyStatus) => {
  let string = "";
  switch (keyStatus) {
    case "wait":
      string = "Đang Chờ Xét Duyệt";
      break;
    case "cancel":
      string = "Đã Bị Hủy";
      break;
    case "done":
      string = "Thành Công";
      break;
    default:
      string = "Đang Chờ Xét Duyệt";
      break;
  }
  return string;
};

export const CONSTANT = {
  DONE: "done",
  WAIT: "wait",
  CANCEL: "cancel",
};

export const converstDate = (date) => {
  const newD = new Date(date);
  return newD.toUTCString();
};

export const permission = (role) => {
  let string = "";
  switch (role) {
    case "student":
      string = "Sinh Viên";
      break;
    case "teacher":
      string = "Giảng Viên";
      break;
    case "subjectLeader":
      string = "Quản Lí Bộ Môn";
      break;
    case "facultyLeader":
      string = "Quản Lí Khoa";
      break;
    case "enterprise":
      string = "Doanh Nghiệp";
      break;
    case "admin":
      string = "Quản Trị Viên";
      break;
    default:
      string = "Sinh Viên";
      break;
  }
  return string;
};
