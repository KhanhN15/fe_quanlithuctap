import { IoIosBody, IoIosPaper, IoMdHome } from "react-icons/io";
import PopTooltip from "../components/PopTooltip";
import axios from "axios";
import { useState, useEffect } from "react";
import * as Config from "../API/Config";
import { useParams } from "react-router-dom";
import { checkStatus, CONSTANT } from "../API/Config";
import moment from "moment";

const InfoEnterprise = () => {
  const [infoEnterprise, setInfoEnterprise] = useState({});
  const [listAssign, setListAssign] = useState([]);
  const [linkFile, setLinkFile] = useState("");
  const { id } = useParams();
  const [status, setStatus] = useState(false);

  useEffect(async () => {
    try {
      const res = await axios.get(`${Config.API_URL}/find-user/${id}`);
      if (res.status === 200) {
        setInfoEnterprise(res.data.data);
      }
      const resA = await axios.get(`${Config.API_URL}/show-assign/${id}`);
      if (resA) {
        setListAssign(resA.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [status]);

  const submitActionForm = async (idd) => {
    try {
      const res = await axios.put(`${Config.API_URL}/submit-homework/${idd}`, {
        ok: "done",
        linkFile: linkFile,
      });
      if (res) {
        setStatus(!status);
        console.log(res);
      }
    } catch (error) {
      console.log("loi");
    }
  };

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>Thông tin đăng ký </h2>
      </div>
      <div className="main__info">
        <div className="info__user">
          <img className="img_enter" src={infoEnterprise.img} alt="" />
          <div className="info_name">
            <ul className="list_info">
              <li className="item_info">Họ và tên : {infoEnterprise.name}</li>
              <li className="item_info">Lớp : {infoEnterprise.lop}</li>
              <li className="item_info">
                Khoa : {infoEnterprise?.idDepartment?.nameDepartment}{" "}
              </li>
              <li className="item_info">Địa chỉ : {infoEnterprise.address}</li>
            </ul>
          </div>
        </div>
        <div className="info_center">
          <h1>VS</h1>
          {infoEnterprise.isAccept === CONSTANT.DONE ? (
            <button disabled className="btn btn-success no-select">
              {checkStatus(infoEnterprise.isAccept)}
            </button>
          ) : (
            <button disabled className="btn btn-warning no-select">
              {checkStatus(infoEnterprise.isAccept)}
            </button>
          )}
        </div>
        <div className="info__enterprise">
          <img
            className="img_enter"
            src={infoEnterprise?.idEnterprise?.imgEnterprise}
            alt=""
          />
          <div className="info_name">
            <ul className="list_info">
              <li className="item_info">
                Tên Doanh Nghiệp :{" "}
                {infoEnterprise?.idEnterprise?.nameEnterprise}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Đề Án</th>
            <th scope="col">GVHD</th>
            <th scope="col"> Các mốc / Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {infoEnterprise?.idTeacher ? (
            <tr>
              <td>Phiếu Đăng Ký Thực Tập</td>
              <td className="d-flex">
                <img
                  className="img_teacher"
                  src={infoEnterprise?.idTeacher?.img}
                  alt=""
                />
                <div className="i">
                  <div className="name_teacher">
                    <IoIosBody />
                    &nbsp; {infoEnterprise?.idTeacher?.name}
                  </div>
                  <div className="name_khoa">
                    <IoIosPaper />
                    &nbsp; KHOA CNTT
                  </div>
                  <div className="name_khoa">
                    <IoMdHome />
                    &nbsp; {infoEnterprise?.idTeacher?.address}
                  </div>
                </div>
              </td>
              <td>
                <ul>
                  <li className="item-show-s">
                    - Đã được xác nhận :{" "}
                    <button className="btn btn-success no-select">
                      {checkStatus(infoEnterprise.isTeacherAccept)}
                    </button>{" "}
                  </li>
                  <li className="item-show-s">
                    - Ngày xác nhận :{" "}
                    <button className="btn btn-success no-select">
                      {moment().format("YYYY/MM/D")}
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          ) : (
            <tr className="mg-auto">
              <div className="alert text-center">
                Chưa có Giáo Viên Hướng Dẫn
              </div>
            </tr>
          )}
        </tbody>
      </table>

      {/* review here */}
      <div className="title__enterprise">
        <h2>Tiến Độ Đồ Án</h2>
      </div>
      {infoEnterprise?.isAccept === CONSTANT.DONE &&
        infoEnterprise?.isTeacherAccept === CONSTANT.DONE && (
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Tiến độ tuần này</th>
                <th scope="col">Nộp Bài</th>
                <th scope="col">Điểm</th>
                <th scope="col">Nhận Xét</th>
                <th scope="col"> Các mốc / Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {listAssign?.map((item, index) => (
                <tr key={item._id}>
                  <td>{item.nameAss}</td>
                  <td className="w-350">
                    {item.linkFile ? (
                      <div className="show-alert">Đã Nộp Bài</div>
                    ) : (
                      <>
                        <div className="attention-here">
                          *(Vui lòng nộp bài tập bằng đường dẫn link drive. Mọi
                          file khác đều không được chấp nhận)
                        </div>
                        <div className="form">
                          <input
                            type="text"
                            value={linkFile}
                            onChange={(e) => setLinkFile(e.target.value)}
                          />
                          <button onClick={() => submitActionForm(item._id)}>
                            Gửi
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                  <td>
                    {item.point && (
                      <div className="show-alert">{item.point}</div>
                    )}
                  </td>
                  <td className="comment">
                    {item.comment && (
                      <PopTooltip description={item.comment}>
                        <span>{item.comment}</span>
                      </PopTooltip>
                    )}
                  </td>
                  <td>
                    <ul>
                      <li className="item-show-s">
                        - Đã Nộp Bài :{" "}
                        {item.ok === CONSTANT.DONE ? (
                          <button className="btn btn-success no-select">
                            {checkStatus(item.ok)}
                          </button>
                        ) : (
                          <button className="btn btn-warning no-select">
                            {checkStatus(item.ok)}
                          </button>
                        )}
                      </li>
                      <li className="item-show-s">
                        - Đã được Giáo Viên xác nhận :{" "}
                        {item.isXacNhan === CONSTANT.DONE ? (
                          <button className="btn btn-success no-select">
                            {checkStatus(item.isXacNhan)}
                          </button>
                        ) : (
                          <button className="btn btn-warning no-select">
                            {checkStatus(item.isXacNhan)}
                          </button>
                        )}
                      </li>
                      <li className="item-show-s">
                        - Ngày xác nhận :{" "}
                        <button className="btn btn-success no-select">
                          {Config.converstDate(item.date)}
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
};

export default InfoEnterprise;
