import React from "react";
import Home from "./HomePage/Component/Home";
import Notification from "./HomePage/Component/Notification";
import { Chat } from "./Chat/Chat";
import ListStudent from "./ListStudent/ListStudent";
import Chart from "./Chart/Chart";
import AddForm from "./ListStudent/Components/AddForm";
import InfoStudent from "./ListStudent/Components/InfoStudent";
import ImportData from "./ListStudent/Components/ImportData";
import Profile from "./Profile/Profile";
import ChangePassword from "./Profile/ChangePassword";

import Enterprise from "./page/Enterprise";
import DetailEnterprise from "./page/DetailEnterprise";
import InfoEnterprise from "./page/InfoBookEnterprise";
import ListStudentManager from "./page/ListStudentManager";
import DetailStudentManager from "./page/DetailStudentManager";
import SubjectLeaderListStudent from "./page/SubjectLeaderListStudent";
import SubjectLeaderHasDone from "./page/SubjectLeaderHasDone";
import FacutlyLeader from "./page/FacutyLeader";
import DoanhNghiep from "./page/DoanhNghiep";
import AdminManageAccount from "./page/AdminManagerAccount";
import ListManagerAccount from "./page/ListManagerAccount";
import DetailAccount from "./page/DetailAccount";
import ListManagerEnterprise from "./page/ListManagerEnterprise";
import CreateEnterprise from "./page/CreateEnterprise";
import ListStudentHasEnterprise from "./page/ListStudentHasEnterprise";
import AdminManageAccountDN from "./page/AdminManageAccountDN";
import StudentAnother from "./page/StudentAnother";
import ListStudentNoEnterprise from "./page/ListStudentNoEnterprise";

const routes = [
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/home/enterprise",
    exact: true,
    main: () => <Enterprise />,
  },
  {
    path: "/home/enterprise/:id",
    exact: true,
    main: () => <DetailEnterprise />,
  },
  {
    path: "/home/enterprise/booking/:id",
    exact: true,
    main: () => <InfoEnterprise />,
  },
  // role teacher
  {
    path: "/home/list-student-manager",
    exact: true,
    main: () => <ListStudentManager />,
  },
  {
    path: "/home/detail-student-manager/:id",
    exact: true,
    main: () => <DetailStudentManager />,
  },
  {
    path: "/home/subject-leader",
    exact: true,
    main: () => <SubjectLeaderListStudent />,
  },
  {
    path: "/home/subject-leader-list",
    exact: true,
    main: () => <SubjectLeaderHasDone />,
  },
  {
    path: "/home/facutly-leader",
    exact: true,
    main: () => <FacutlyLeader />,
  },
  {
    path: "/home/list-doanh-nghiep",
    exact: true,
    main: () => <DoanhNghiep />,
  },
  {
    path: "/home/admin-manager-account",
    exact: true,
    main: () => <AdminManageAccount />,
  },
  {
    path: "/home/admin-manager-account-dn",
    exact: true,
    main: () => <AdminManageAccountDN />,
  },
  {
    path: "/home/list-manager-account",
    exact: true,
    main: () => <ListManagerAccount />,
  },
  {
    path: "/home/detail-account/:id",
    exact: true,
    main: () => <DetailAccount />,
  },
  {
    path: "/home/list-all-enterprise",
    exact: true,
    main: () => <ListManagerEnterprise />,
  },
  {
    path: "/home/create-account-enterprise",
    exact: true,
    main: () => <CreateEnterprise />,
  },
  {
    path: "/home/list-student-has-enterprise",
    exact: true,
    main: () => <ListStudentHasEnterprise />,
  },
  {
    path: "/home/list-student-no-enterprise",
    exact: true,
    main: () => <ListStudentNoEnterprise />,
  },
  {
    path: "/home/list-student-another",
    exact: true,
    main: () => <StudentAnother />,
  },
];

export default routes;
