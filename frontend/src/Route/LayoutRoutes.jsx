// import React, { Fragment } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { routes } from './Routes';
// import AppLayout from '../Layout/Layout';

// const LayoutRoutes = () => {

//   return (
//     <>
//       <Routes>
//         {routes.map(({ path, Component }, i) => (
//           <Fragment key={i}>
//           <Route element={<AppLayout />} key={i}>
//             <Route path={path} element={Component} />
//           </Route>
//           </Fragment>
//         ))}
//       </Routes>
//     </>
//   );
// };

// export default LayoutRoutes;



import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./Routes";
import AppLayout from "../Layout/Layout";

const LayoutRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {routes.map(({ path, Component }, i) => (
          <Route key={i} path={path} element={Component} />
        ))}
      </Route>
    </Routes>
  );
};

export default LayoutRoutes;
