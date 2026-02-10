// import React, { Suspense, useEffect, useState } from "react";
// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import Signin from "../Auth/Signin";
// import Loader from "../Layout/Loader";
// import LayoutRoutes from "../Route/LayoutRoutes";
// import { authRoutes } from "./AuthRoutes";
// import PrivateRoute from "./PrivateRoute";

// const Routers = () => {
//   const [authenticated, setAuthenticated] = useState(localStorage.getItem("login"));

//   useEffect(() => {
//     setAuthenticated(JSON.parse(localStorage.getItem("login")));
//   }, []);

//   return (
//     <BrowserRouter basename={"/"}>
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           <Route path={"/"} element={<PrivateRoute />}>
//             {authenticated ? (
//               <>
//                 <Route exact path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />} />
//                 <Route exact path={`/`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />} />
//               </>
//             ) : (
//               ""
//             )}
//             <Route path={`/*`} element={<LayoutRoutes />} />
//           </Route>
//           <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Signin />} />
//           {authRoutes.map(({ path, Components }, i) => (
//             <Route path={path} element={Components} key={i} />
//           ))}
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };

// export default Routers;


import React, { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signin from "../Auth/Signin";
import TenantLogin from "../Auth/TenantLogin";
import Loader from "../Layout/Loader";
import LayoutRoutes from "../Route/LayoutRoutes";
import { authRoutes } from "./AuthRoutes";
import PrivateRoute from "./PrivateRoute";

const Routers = () => {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<Loader />}>
        <Routes>

          {/* FIRST OPEN → LOGIN */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* PUBLIC LOGIN */}
          <Route path="/login" element={<Signin />} />

          <Route path="/:tenantSlug/login" element={<TenantLogin />} />

          {/* PROTECTED APP */}
          <Route element={<PrivateRoute />}>
            <Route path="/*" element={<LayoutRoutes />} />
          </Route>

          {/* OTHER AUTH ROUTES */}
          {authRoutes.map(({ path, Components }, i) => (
            <Route path={path} element={Components} key={i} />
          ))}

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;