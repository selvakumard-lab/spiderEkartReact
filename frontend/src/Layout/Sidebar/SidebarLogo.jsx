import React, { useContext } from "react";
import { Grid } from "react-feather";
import { Link } from "react-router-dom";
import CustomizerContext from "../../Helper/Customizer";
import cubaimg from "../../assets/images/logo/logo.png";
import { Image } from "../../AbstractElements";
const SidebarLogo = () => {
  const { togglSidebar, setTogglSidebar } = useContext(CustomizerContext)

  const userData = JSON.parse(localStorage.getItem("user"));
  const slug = userData?.project_slug;

  const baseURL = "http://localhost:5000/";

  const logoImage =
    slug && userData?.TenantMaster?.project_image
      ? `${baseURL}${userData.TenantMaster.project_image}`
      : cubaimg;

  const dashboardLink = slug 
    ? `/${slug}/dashboard/default`
    : `/dashboard/default`;

  return (
<>
      <Link to={dashboardLink}>
        {slug ? (
          <h4 className="logo-text">
            {slug.replace(/[-_]/g, " ").toUpperCase()}
          </h4>
        ) : (
          <Image
            attrImage={{
              className: "img-fluid for-light",
              src: cubaimg,
              alt: "logo",
            }}
          />
        )}
      </Link>
      <div className="back-btn" onClick={() => setTogglSidebar(!togglSidebar)}>
        <Grid />
      </div>
      <div className="toggle-sidebar"  onClick={() => setTogglSidebar(!togglSidebar)}>
        <Grid className="status_toggle middle sidebar-toggle" />
      </div>
</>
  );
};

export default SidebarLogo;
