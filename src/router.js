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

const routes = [
  {
    path: "/home/notification",
    exact: true,
    main: () => <Notification />,
  },

  {
    path: "/home/chat",
    exact: true,
    main: () => <Chat />,
  },
  {
    path: "/home/list-students",
    exact: true,
    main: () => <ListStudent />,
  },
  {
    path: "/home/chart",
    exact: true,
    main: () => <Chart />,
  },
  {
    path: "/home/list-students/add",
    exact: true,
    main: () => <AddForm />,
  },
  {
    path: "/home/list-students/update/:id",
    exact: true,
    main: ({ match }) => <InfoStudent match={match} />,
  },
  {
    path: "/home/list-students/import-data",
    exact: true,
    main: () => <ImportData />,
  },
  {
    path: "/home/profile",
    exact: true,
    main: ({ match }) => <Profile match={match} />,
  },
  {
    path: "/home",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/home/change-password",
    exact: true,
    main: () => <ChangePassword />,
  },

  //////////
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
    path: "/home/list-manager-account",
    exact: true,
    main: () => <ListManagerAccount />,
  },
  {
    path: "/home/detail-account/:id",
    exact: true,
    main: () => <DetailAccount />,
  },
];

export default routes;
