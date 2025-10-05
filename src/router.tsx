import { createBrowserRouter } from "react-router-dom";

import {PetRecords}  from "./pages/PetRecords";
import { Dashboard } from "./pages/Dashboard";    
import { BehaviorLogs } from "./pages/BehaviorLogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/petrecord",
    element: <PetRecords />,
  },
   {
    path: "/logs",
    element: <BehaviorLogs />,
  },
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  //   children: [
  //     { index: true, element: <DashboardHome /> },
  //     { path: "settings", element: <DashboardSettings /> },
  //   ],
  // },
]);

export default router;
