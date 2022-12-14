import PopTooltip from "../components/PopTooltip";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage } from "../API/Config";
import { useHistory } from "react-router-dom";

const FacutlyLeader = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [listDepartment, setListDepartment] = useState([]);
  const [department, setDepartment] = useState("");
  const [teacher, setTeacher] = useState("");
  const [search, setSearch] = useState("");

  const history = useHistory();

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/show-depart`);
      if (res) {
        setListDepartment(res.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  useEffect(async () => {
    if (search) {
      const res = await axios.get(`${Config.API_URL}/search-full/${search}`);
      if (res) {
        setListStudent(res.data.data);
      }
    }
  }, [search]);

  useEffect(async () => {
    if (department) {
      const res = await axios.get(
        `${Config.API_URL}/show-teacher-by-department/${department}`
      );
      if (res) {
        setListTeacher(res.data.data);
      }

      const resStudent = await axios.get(
        `${Config.API_URL}/list-student-has-manage-by-department/${department}`
      );
      if (resStudent) {
        setListStudent(resStudent.data.data);
      }
    }
  }, [department]);

  // useEffect(async () => {
  //   if (teacher) {
  //     const res = await axios.get(
  //       `${Config.API_URL}/show-teacher-department/${department}`,
  //       {
  //         teacher: teacher,
  //       }
  //     );
  //     if (res) {
  //       setListStudent(res.data.data);
  //     } else {
  //       setListStudent([]);
  //     }
  //   }
  // }, [teacher]);

  const handleChangeSelect = (i) => {
    setDepartment(i.target.value);
  };

  const handleSelectTeacher = async (i) => {
    setTeacher(i.target.value);
    const res = await axios.get(
      `${Config.API_URL}/show-teacher-here/${department}/${i.target.value}`,
      {
        teacher: i.target.value,
      }
    );
    if (res) {
      setListStudent(res.data.data);
    } else {
      setListStudent([]);
    }
  };

  const redirect = (id) => {
    history.push(`/home/detail-account/${id}`);
  };

  const showTimeStart = (dateNow) => {
    const today = new Date(dateNow);
    return today?.toLocaleDateString() || "";
  };

  const showTimeEnd = (dateNow) => {
    const today = new Date(dateNow);
    const nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 70
    );
    return nextweek?.toLocaleDateString() || "";
  };

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        {/* <button className="btn btn-info button-if">
          <i
            class="fa-sharp fa-solid fa-chart-simple"
            style={{ margin: "0 5px" }}
          ></i>
          Th???ng K??
        </button> */}
        <h2>Danh S??ch Gi???ng Vi??n ???? ???????c Ph??n C??ng</h2>
        <span className="attention-here">
          (Danh s??ch sinh vi??n thu???c c??c Chuy??n Ng??nh)
        </span>
      </div>
      <div className="list-action">
        <div className="form-selector">
          <label className="lb" htmlFor="">
            T??m Ki???m
          </label>
          <input
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginTop: "10px", padding: "3px", marginLeft: "10px" }}
            type="text"
          />
        </div>
        <div className="form-selector">
          <label className="lb" htmlFor="">
            T??n Chuy??n Ng??nh
          </label>
          <select onChange={(i) => handleChangeSelect(i)}>
            <option value="null">Vui L??ng Ch???n Chuy??n Ng??nh</option>
            {listDepartment?.map((item) => (
              <option value={item._id}>{item.nameDepartment}</option>
            ))}
          </select>
        </div>
        {department && (
          <div className="form-selector">
            <label className="lb" htmlFor="">
              T??n Gi???ng Vi??n
            </label>
            <select onChange={(i) => handleSelectTeacher(i)}>
              <option value="null">Vui L??ng Ch???n Gi??o Vi??n</option>
              {listTeacher?.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <table class="table w-80p">
        <thead class="thead-dark">
          <tr>
            <th scope="col">S??? Th??? T???</th>
            <th scope="col">M?? Sinh Vi??n</th>
            <th scope="col">???nh</th>
            <th scope="col">T??n Sinh Vi??n</th>
            <th scope="col">L???p</th>
            <th scope="col">Ng??y Sinh</th>
            <th scope="col">Chuy??n Ng??nh</th>
            <th scope="col">?????a Ch??? Th???c T???p</th>
            <th scope="col">Ng??y B???t ?????u Th???c T???p</th>
            <th scope="col">Ng??y K???t Th??c Th???c T???p</th>
          </tr>
        </thead>
        <tbody>
          {listStudent.map((e, index) => (
            <tr key={e._id}>
              <td>{index + 1}</td>
              <td>{e.msv?.toUpperCase()}</td>
              <td>
                <img src={e.img} className="avatar" alt="" />
              </td>
              <td className="text-decoration" onClick={() => redirect(e._id)}>
                {e.name}
              </td>
              <td>{e.lop}</td>
              <td>{e.birthday}</td>
              <td>{e.idDepartment?.nameDepartment}</td>
              <td>
                <PopTooltip description={e?.idEnterprise?.nameEnterprise}>
                  <span className="color-green">
                    {e?.idEnterprise?.nameEnterprise || (
                      <span className="color-red">
                        Ch??a ch???n c??ng ty th???c t???p
                      </span>
                    )}
                  </span>
                </PopTooltip>
              </td>
              <td>{showTimeStart(e.timeStart)}</td>
              <td>{showTimeEnd(e.timeStart)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacutlyLeader;
