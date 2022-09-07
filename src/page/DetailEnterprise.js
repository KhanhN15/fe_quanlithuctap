import axios from "axios";
import { useState, useEffect } from "react";
import * as Config from "../API/Config";
import { useParams } from "react-router-dom";

const DetailEnterprise = () => {
  const [detailEnterprise, setDetailEnterprise] = useState({});
  const { id } = useParams();

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${Config.API_URL}/show-detail-enterprise/${id}`
      );
      if (res.data.success) {
        setDetailEnterprise(res.data.data);
      }
    } catch (error) {
      console.log("error server");
    }
  }, []);

  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h2>
          Thông tin chi tiết của công ty - {detailEnterprise.nameEnterprise}
        </h2>
      </div>
      <div className="detail__enterprise">
        <img
          className="detail__img_enterprise"
          src={detailEnterprise.imgEnterprise}
          alt=""
        />
        <div className="title__enterprise">
          <h2 className="text-title">Thông tin cơ bản</h2>
          <div className="my">
            <span>Ten cong ty : {detailEnterprise.nameEnterprise} </span>
          </div>
          <div className="my">
            <span>Thong Tin Co Ban : </span>
            <div className="">{detailEnterprise.descriptionEnterprise}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEnterprise;
