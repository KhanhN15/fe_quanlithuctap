export const API_URL = "http://localhost:5000";

export const getDataLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};
