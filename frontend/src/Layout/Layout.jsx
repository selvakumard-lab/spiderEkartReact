import { Fragment, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer/index";
import TapTop from "./TapTop/index";
import Header from "./Header";
import SideBar from "./Sidebar/Sidebar";
import Themecustomizer from "./ThemeCustomizer";
import CheckContext from "../Helper/Customizer";
import ProductContext from "../Helper/product";
import ConfigDB from "../Config/ThemeConfig";
import Loader from "./Loader";

const Layout = () => {
  const navigate = useNavigate();
  const { setDefaultClass, setTogglSidebar, sidebar_types } = useContext(CheckContext);
  const { setIsVertical } = useContext(ProductContext);
  const location = useLocation();
  const queryData = location?.search?.split("=")[1]?.toString();

  let sidebar_types1 = queryData === "compact-wrapper" || queryData === "horizontal-wrapper" ? queryData : ConfigDB.settings.sidebar.type || sidebar_types;

  const sideBarReload = () => {
    if (sidebar_types1 === "horizontal-wrapper") {
      if (window.innerWidth <= 1200) {
        navigate({ search: `?sidebar=compact-wrapper` });
        setDefaultClass(true);
        sidebar_types1 = "compact-wrapper";
      } else {
        navigate({ search: `?sidebar=horizontal-wrapper` });
        setDefaultClass(false);
      }
    }
  };

  useEffect(() => {
    sideBarReload();
    setDefaultClass(true);
    window.addEventListener("resize", () => {
      sideBarReload();
      if (window.innerWidth - 440 <= 759) {
        setTogglSidebar(true);
      } else {
        setTogglSidebar(false);
      }
      if (window.innerWidth <= 1200) {
        setIsVertical(true);
      } else {
        setIsVertical(false);
      }
    });

    return () => {
      window.removeEventListener("resize", sideBarReload);
    };
  }, []);

  return (
    <Fragment>
      <Loader />
      <TapTop />
      <div className={`page-wrapper ${sidebar_types1} `} id="pageWrapper">
        <Header />
        <div className="page-body-wrapper">
          <SideBar />
          <div className="page-body">
            <div>
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <Themecustomizer />
      <ToastContainer />
    </Fragment>
  );
};

export default Layout;
