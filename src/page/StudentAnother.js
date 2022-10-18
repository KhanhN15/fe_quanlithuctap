import PopTooltip from "../components/PopTooltip";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Config from "../API/Config";
import { toast } from "react-toastify";
import { getDataLocalStorage } from "../API/Config";
import { useHistory } from "react-router-dom";

const StudentAnother = () => {
  return (
    <div className="main__enterprise">
      <div className="title__enterprise">
        <h1>Khanh ne</h1>
      </div>
    </div>
  );
};

export default StudentAnother;
