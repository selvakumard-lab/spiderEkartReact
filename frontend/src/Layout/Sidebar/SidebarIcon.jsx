import  {  useState } from "react";
import { Grid } from "react-feather";
import { Link } from 'react-router-dom';
import SidebarLogo from "./SidebarLogo";
const SidebarIcon = () => {

  const [sidebartoogle, setSidebartoogle] = useState(true);

  const userData = JSON.parse(localStorage.getItem("user"));
  const slug = userData?.project_slug;

  const dashboardLink = slug 
    ? `/${slug}/dashboard/default`
    : `/dashboard/default`;


  return (
    <>
      <div className="logo-wrapper ">
      <SidebarLogo sidebartoogle={sidebartoogle} setSidebartoogle={setSidebartoogle} />
      </div>
      <div className="logo-icon-wrapper">
        <Link to={dashboardLink} >
          <div className="icon-box-sidebar">
            <Grid />
          </div>
        </Link>
      </div>

    </>
  );
};

export default SidebarIcon;
